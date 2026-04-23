import FallbackCard from "@components/faq/FallbackCard";

export type ChatMessageType = "text" | "fallback";
export type ChatMessageRole = "user" | "bot";

export type ChatMessageData = {
  role: ChatMessageRole;
  content: string;
  type: ChatMessageType;
};

export default function ChatMessage({
  role,
  content,
  type,
}: ChatMessageData) {
  if (type === "fallback") {
    return (
      <div className="flex justify-start">
        <FallbackCard />
      </div>
    );
  }

  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
          isUser
            ? "rounded-br-md bg-[#005F73] text-white"
            : "rounded-bl-md border border-slate-200 bg-white text-slate-700"
        }`}
      >
        <p className="whitespace-pre-wrap wrap-break-word">{content}</p>
      </div>
    </div>
  );
}
