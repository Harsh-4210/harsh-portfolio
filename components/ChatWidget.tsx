"use client";
import { useEffect, useRef, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const defaultSuggestions = ["ML Systems", "FastAPI", "Projects", "Contact"];


export default function ChatWidget({
  suggestions = defaultSuggestions,
}: {
  suggestions?: string[];
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Harsh's AI assistant. Ask me about his projects, ML systems, or how to get in touch.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading]);

  const handleSend = async (message: string) => {
    const text = message.trim();
    if (!text || isLoading) return;
    setError(null);

    const history = messages.map((item) => ({ role: item.role, content: item.content }));
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });
      const data = await response.json();
      const reply =
        data?.reply ||
        "I am having trouble responding right now. Please email harshjain0621@gmail.com.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I am having trouble connecting right now. Please email harshjain0621@gmail.com.",
        },
      ]);
      setError("Connection issue. Try again in a moment.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", minHeight: "350px", justifyContent: "space-between" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxHeight: "260px",
          overflowY: "auto",
          padding: "8px 6px",
          marginBottom: "16px",
          flexGrow: 1,
        }}
      >
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={message.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"}
            style={{ alignSelf: message.role === "user" ? "flex-end" : "flex-start" }}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="chat-bubble-ai" style={{ alignSelf: "flex-start" }}>
            Thinking...
          </div>
        )}
        {error && (
          <div
            className="font-code-label text-code-label"
            style={{ color: "var(--warn-color)", alignSelf: "center", marginTop: "8px" }}
          >
            {error}
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div>
        <div
          className="flex flex-wrap justify-center"
          style={{ gap: "8px", marginBottom: "16px" }}
        >
          {suggestions.map((chip) => (
            <button
              key={chip}
              type="button"
              className="glass-tag font-code-label text-code-label text-on-surface-variant"
              style={{
                padding: "6px 16px",
                borderRadius: "999px",
                cursor: "pointer",
                transition: "all 0.2s",
                background: "var(--tag-bg)",
              }}
              onClick={() => handleSend(chip)}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "var(--primary)";
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(210,187,255,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "var(--on-surface-variant)";
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "var(--tag-border)";
              }}
            >
              {chip}
            </button>
          ))}
        </div>

        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "520px",
            margin: "0 auto",
          }}
        >
          <input
            type="text"
            placeholder="Ask anything about Harsh..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend(input);
            }}
            style={{
              width: "100%",
              background: "var(--input-bg)",
              border: "1px solid var(--input-border)",
              borderRadius: "999px",
              padding: "16px 48px 16px 48px",
              color: "var(--on-surface)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              outline: "none",
              backdropFilter: "blur(12px)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--primary)";
              e.currentTarget.style.boxShadow = "0 0 0 1px var(--primary)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--input-border)";
              e.currentTarget.style.boxShadow = "none";
            }}
            aria-label="Ask Harsh a question"
          />
          <span
            className="material-symbols-outlined text-on-surface-variant"
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "20px",
            }}
          >
            search
          </span>
          <button
            type="button"
            onClick={() => handleSend(input)}
            disabled={isLoading || !input.trim()}
            style={{
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "none",
              background: isLoading || !input.trim() ? "var(--glass-bg)" : "var(--primary-container)",
              color: isLoading || !input.trim() ? "var(--on-surface-variant)" : "var(--on-primary-container)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: isLoading || !input.trim() ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
            aria-label="Send message"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              send
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
