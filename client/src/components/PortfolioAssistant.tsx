import { Bot, Loader2, Send, Sparkles, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const ASSISTANT_API_URL = (
  import.meta.env.VITE_ASSISTANT_API_URL || "https://suyash-portfolio-backend.onrender.com"
).replace(/\/$/, "");

const starterMessage: ChatMessage = {
  role: "assistant",
  content:
    "Hi — I’m Suyash’s AI assistant. I can help with his AI engineering background, selected work, technical focus, or the best way to start a conversation.",
};

const suggestedPrompts = [
  "What AI engineering work does Suyash do?",
  "Tell me about his experience with RAG systems.",
  "How can I contact Suyash about an opportunity?",
];

export function PortfolioAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([starterMessage]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      messageListRef.current?.scrollTo({ top: messageListRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, open]);

  const sendMessage = async (content: string) => {
    const message = content.trim();
    if (!message || isSending) return;

    const nextMessages = [...messages, { role: "user" as const, content: message }];
    setMessages(nextMessages);
    setInput("");
    setIsSending(true);

    try {
      const response = await fetch(`${ASSISTANT_API_URL}/api/assistant/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-8) }),
      });
      const payload = (await response.json()) as { message?: string; detail?: string };

      if (!response.ok || !payload.message) {
        throw new Error(payload.detail || "The assistant is temporarily unavailable.");
      }

      setMessages(current => [...current, { role: "assistant", content: payload.message! }]);
    } catch {
      setMessages(current => [
        ...current,
        {
          role: "assistant",
          content:
            "I’m temporarily unavailable. For opportunities or project conversations, please email Suyash at zinjurke77h@gmail.com.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input);
  };

  return (
    <aside className="portfolio-assistant" aria-label="Suyash's AI portfolio assistant">
      {open && (
        <section className="assistant-panel" aria-live="polite">
          <div className="assistant-panel-header">
            <div className="assistant-identity">
              <span className="assistant-orb"><Bot size={17} /></span>
              <span>
                <strong>Suyash’s assistant</strong>
                <small><i /> online for portfolio questions</small>
              </span>
            </div>
            <button className="assistant-close" type="button" onClick={() => setOpen(false)} aria-label="Close assistant">
              <X size={17} />
            </button>
          </div>

          <div className="assistant-messages" ref={messageListRef}>
            {messages.map((message, index) => (
              <div className={`assistant-message ${message.role === "user" ? "is-user" : "is-assistant"}`} key={`${message.role}-${index}`}>
                {message.role === "assistant" && <Sparkles size={13} aria-hidden="true" />}
                <div className="assistant-message-content">{message.content}</div>
              </div>
            ))}
            {isSending && (
              <div className="assistant-message is-assistant is-loading"><Loader2 size={15} className="animate-spin" /> <span>Checking Suyash’s portfolio context…</span></div>
            )}
          </div>

          {messages.length === 1 && (
            <div className="assistant-prompts" aria-label="Suggested questions">
              {suggestedPrompts.map(prompt => (
                <button type="button" key={prompt} onClick={() => void sendMessage(prompt)} disabled={isSending}>{prompt}</button>
              ))}
            </div>
          )}

          <form className="assistant-input" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="portfolio-assistant-message">Ask about Suyash’s work</label>
            <input
              id="portfolio-assistant-message"
              value={input}
              onChange={event => setInput(event.target.value)}
              placeholder="Ask about Suyash’s work…"
              maxLength={1400}
              disabled={isSending}
            />
            <button type="submit" disabled={!input.trim() || isSending} aria-label="Send question"><Send size={16} /></button>
          </form>
          <p className="assistant-disclaimer">Portfolio information only — Suyash reviews opportunities directly.</p>
        </section>
      )}

      <button className="assistant-trigger" type="button" onClick={() => setOpen(current => !current)} aria-expanded={open}>
        <span className="assistant-trigger-icon">{open ? <X size={19} /> : <Bot size={19} />}</span>
        <span>{open ? "Close assistant" : "Ask Suyash’s AI"}</span>
      </button>
    </aside>
  );
}
