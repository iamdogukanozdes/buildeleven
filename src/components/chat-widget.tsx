import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { MessageCircle, Send, X } from "lucide-react";
import { sendChatMessage } from "@/lib/chat.functions";

type Msg = { role: "user" | "assistant"; content: string };

const COPY = {
  en: {
    title: "Scorpio from Build Eleven",
    subtitle: "Ask about AI, web, or booking a call.",
    greeting: "Hi! I'm Scorpio, your Build Eleven assistant. Looking for a new website, interested in AI, or just want to chat about an idea? Let's talk.",
    placeholder: "Type your message...",
    send: "Send",
    open: "Open chat",
    close: "Close chat",
    error: "Something went wrong. Please try again.",
  },
  nl: {
    title: "Scorpio van Build Eleven",
    subtitle: "Vraag over AI, web of een gesprek plannen.",
    greeting: "Hoi! Ik ben Scorpio, je Build Eleven-assistent. Op zoek naar een nieuwe website, benieuwd naar AI, of gewoon zin om te sparren over een idee? Laten we praten.",
    placeholder: "Typ je bericht...",
    send: "Verstuur",
    open: "Open chat",
    close: "Sluit chat",
    error: "Er ging iets mis. Probeer het opnieuw.",
  },
};

export function ChatWidget({ lang }: { lang: "en" | "nl" }) {
  const [open, setOpen] = useState(false);
  const [hasPopped, setHasPopped] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const send = useServerFn(sendChatMessage);

  const t = COPY[lang];

  // Auto-pop after 12s (only once per session)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("chat_popped") === "1") {
      setHasPopped(true);
      return;
    }
    const timer = setTimeout(() => {
      setOpen(true);
      setHasPopped(true);
      sessionStorage.setItem("chat_popped", "1");
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    setError(null);
    const nextMessages: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    try {
      const result = await send({ data: { messages: nextMessages, lang } });
      setMessages((prev) => [...prev, { role: "assistant", content: result.reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => {
          setOpen((o) => !o);
          setHasPopped(true);
        }}
        aria-label={open ? t.close : t.open}
        className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/40 sm:bottom-6 sm:right-6"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!open && !hasPopped && (
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-accent">
            <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-75" />
          </span>
        )}
      </button>

      {/* Chat panel */}
      <div
        className={`
          fixed bottom-24 right-3 z-40 flex w-[calc(100vw-1.5rem)] max-w-sm
          flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl
          transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          sm:right-6 sm:w-96
          ${open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-6 scale-90 opacity-0"
          }
        `}
        aria-hidden={!open}
      >
        <div className="border-b border-border bg-surface px-4 py-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold text-foreground">{t.title}</h3>
              <p className="text-xs text-muted-foreground">{t.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.close}
              className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex h-96 flex-col gap-3 overflow-y-auto px-4 py-4"
        >
          <div className="max-w-[85%] self-start rounded-2xl rounded-tl-sm bg-muted px-3.5 py-2.5 text-sm text-foreground">
            {t.greeting}
          </div>
          {messages.map((m, i) => (
            <div
              key={i}
              className={
                m.role === "user"
                  ? "max-w-[85%] self-end rounded-2xl rounded-tr-sm bg-primary px-3.5 py-2.5 text-sm text-primary-foreground whitespace-pre-wrap"
                  : "max-w-[85%] self-start rounded-2xl rounded-tl-sm bg-muted px-3.5 py-2.5 text-sm text-foreground whitespace-pre-wrap"
              }
            >
              {m.content}
            </div>
          ))}
          {loading && (
            <div className="max-w-[85%] self-start rounded-2xl rounded-tl-sm bg-muted px-3.5 py-2.5 text-sm text-muted-foreground">
              <span className="inline-flex gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
              </span>
            </div>
          )}
          {error && (
            <div className="max-w-[85%] self-start rounded-2xl bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive">
              {error}
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-border bg-surface px-3 py-3"
        >
          <input
            ref={inputRef}
            type="text"
            aria-label={t.placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.placeholder}
            disabled={loading}
            className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label={t.send}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:bg-primary/90 disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </>
  );
}
