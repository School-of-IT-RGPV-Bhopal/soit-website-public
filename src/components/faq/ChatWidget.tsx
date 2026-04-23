"use client";

import { useEffect, useRef, useState } from "react";

import ChatMessage, { type ChatMessageData } from "@components/faq/ChatMessage";

const INITIAL_MESSAGE: ChatMessageData = {
  role: "bot",
  type: "text",
  content:
    "Hi! I can answer questions about SoIT RGPV. What would you like to know?",
};

const LOADING_MESSAGE: ChatMessageData = {
  role: "bot",
  type: "text",
  content: "Thinking...",
};

const ERROR_MESSAGE: ChatMessageData = {
  role: "bot",
  type: "text",
  content:
    "I couldn't reach the assistant right now. Please try again in a moment.",
};

const NEW_CHAT_WARNING_MESSAGE =
  "Start a new chat? Your current conversation will be cleared.";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
  const chatSessionRef = useRef(0);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([INITIAL_MESSAGE]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  function resetChat() {
    chatSessionRef.current += 1;
    setMessages([INITIAL_MESSAGE]);
    setInput("");
    setIsLoading(false);
  }

  function handleStartNewChat() {
    const shouldStartNewChat = window.confirm(NEW_CHAT_WARNING_MESSAGE);

    if (!shouldStartNewChat) {
      return;
    }

    resetChat();
  }

  function handleCloseChat() {
    chatSessionRef.current += 1;
    setIsOpen(false);
    setMessages([]);
    setInput("");
    setIsLoading(false);
  }

  async function handleSend() {
    const trimmedInput = input.trim();

    if (!trimmedInput || isLoading) {
      return;
    }

    const requestSessionId = chatSessionRef.current;

    const history = messages.slice(-6).map(({ role, content }) => ({
      role,
      content,
    }));
    const userMessage: ChatMessageData = {
      role: "user",
      type: "text",
      content: trimmedInput,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/faq-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedInput,
          history,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `Request failed with status ${response.status}`;

        if (errorText) {
          try {
            const parsedError = JSON.parse(errorText) as {
              error?: string;
              details?: string;
            };

            errorMessage =
              parsedError.details ?? parsedError.error ?? errorMessage;
          } catch {
            errorMessage = errorText;
          }
        }

        throw new Error(errorMessage);
      }

      if (!response.body) {
        throw new Error("Assistant response stream was empty.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          accumulatedText += decoder.decode();
          break;
        }

        accumulatedText += decoder.decode(value, { stream: true });
      }

      const botMessage: ChatMessageData = accumulatedText.includes(
        'action":"redirect',
      )
        ? {
            role: "bot",
            type: "fallback",
            content: "",
          }
        : {
            role: "bot",
            type: "text",
            content: accumulatedText.trim() || ERROR_MESSAGE.content,
          };

      if (requestSessionId !== chatSessionRef.current) {
        return;
      }

      setMessages((currentMessages) => [...currentMessages, botMessage]);
    } catch (error) {
      if (requestSessionId !== chatSessionRef.current) {
        return;
      }

      console.error("/api/faq-chat failed:", error);
      setMessages((currentMessages) => [...currentMessages, ERROR_MESSAGE]);
    } finally {
      if (requestSessionId === chatSessionRef.current) {
        setIsLoading(false);
      }
    }
  }

  return (
    <>
      {isOpen ? (
        <section
          className="fixed right-4 bottom-24 z-50 flex w-[min(360px,calc(100vw-2rem))] max-h-[min(520px,calc(100dvh-7rem))] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.45)] sm:right-6 sm:bottom-24"
          aria-label="SOIT Assistant chat"
        >
          <div className="flex items-center justify-between bg-[#005F73] px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">SOIT Assistant</p>
              <p className="text-xs text-white/75">Ask about SoIT RGPV FAQs</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleStartNewChat}
                disabled={isLoading}
                className="inline-flex h-9 items-center justify-center rounded-full border border-white/25 px-3 text-xs font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Start new chat"
              >
                New Chat
              </button>
              <button
                type="button"
                onClick={handleCloseChat}
                className="inline-flex size-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                aria-label="Close chat"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
            {messages.map((message, index) => (
              <ChatMessage
                key={`${message.role}-${message.type}-${index}`}
                role={message.role}
                content={message.content}
                type={message.type}
              />
            ))}

            {isLoading ? (
              <ChatMessage
                role={LOADING_MESSAGE.role}
                content={LOADING_MESSAGE.content}
                type={LOADING_MESSAGE.type}
              />
            ) : null}

            <div ref={endOfMessagesRef} />
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              void handleSend();
            }}
            className="border-t border-slate-200 bg-white p-3"
          >
            <div className="flex items-end gap-2">
              <input
                type="text"
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                }}
                placeholder="Ask a question..."
                disabled={isLoading}
                className="min-h-12 flex-1 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#005F73] focus:ring-2 focus:ring-[#005F73]/20 disabled:cursor-not-allowed disabled:bg-slate-100"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="inline-flex h-12 min-w-12 items-center justify-center rounded-2xl bg-[#005F73] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#0b7285] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005F73]/30 disabled:cursor-not-allowed disabled:bg-slate-300"
                aria-label="Send message"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 2 11 13" />
                  <path d="m22 2-7 20-4-9-9-4Z" />
                </svg>
              </button>
            </div>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => {
          setIsOpen((currentValue) => !currentValue);
        }}
        className="fixed right-4 bottom-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#005F73] text-white shadow-[0_18px_40px_-20px_rgba(0,95,115,0.85)] transition-transform hover:scale-105 hover:bg-[#0b7285] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005F73]/30 sm:right-6 sm:bottom-6"
        aria-label={isOpen ? "Close SOIT Assistant" : "Open SOIT Assistant"}
      >
        {isOpen ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 10h10" />
            <path d="M7 14h6" />
            <path d="M12 3C6.477 3 2 6.806 2 11.5c0 2.445 1.214 4.649 3.172 6.202.13.103.206.261.19.425L5 21l3.165-1.055a.825.825 0 0 1 .49.006c1.049.31 2.169.479 3.345.479 5.523 0 10-3.806 10-8.5S17.523 3 12 3Z" />
          </svg>
        )}
      </button>
    </>
  );
}
