import { GoogleGenAI, type Content } from "@google/genai";
import { NextResponse } from "next/server";

import { faqIndex } from "@/data/faq";
import { buildSystemPrompt } from "@/lib/faq/buildSystemPrompt";

type ChatHistoryItem = {
  role: "user" | "bot";
  content: string;
};

type ChatRequestBody = {
  message: string;
  history?: ChatHistoryItem[];
};

const METHOD_NOT_ALLOWED_STATUS = 405;
const BAD_REQUEST_STATUS = 400;
const SERVICE_UNAVAILABLE_STATUS = 503;
const HISTORY_LIMIT = 6;
const MODEL_NAME = process.env.GEMINI_AGENT_MODEL ?? "gemini-1.5-flash";

function methodNotAllowed() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: METHOD_NOT_ALLOWED_STATUS },
  );
}

function toGeminiHistory(history: ChatHistoryItem[]): Content[] {
  return history.slice(-HISTORY_LIMIT).map(({ role, content }) => ({
    role: role === "bot" ? "model" : "user",
    parts: [{ text: content }],
  }));
}

function isValidHistoryItem(value: unknown): value is ChatHistoryItem {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Partial<ChatHistoryItem>;

  return (
    (candidate.role === "user" || candidate.role === "bot") &&
    typeof candidate.content === "string"
  );
}

export async function POST(request: Request) {
  let body: ChatRequestBody;

  try {
    body = (await request.json()) as ChatRequestBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: BAD_REQUEST_STATUS },
    );
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!message) {
    return NextResponse.json(
      { error: "Message is required" },
      { status: BAD_REQUEST_STATUS },
    );
  }

  const history = Array.isArray(body.history)
    ? body.history.filter(isValidHistoryItem)
    : [];

  try {
    const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const chat = genAI.chats.create({
      model: MODEL_NAME,
      config: {
        systemInstruction: buildSystemPrompt(faqIndex),
      },
      history: toGeminiHistory(history),
    });

    const response = await chat.sendMessageStream({ message });
    const encoder = new TextEncoder();

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const text = chunk.text;

            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }

          controller.close();
        } catch {
          controller.error(new Error("Stream failed"));
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Service unavailable" },
      { status: SERVICE_UNAVAILABLE_STATUS },
    );
  }
}

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
export const HEAD = methodNotAllowed;
export const OPTIONS = methodNotAllowed;
