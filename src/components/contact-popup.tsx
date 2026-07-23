import { useState } from "react";
import { Mail, Send, CheckCircle } from "lucide-react";
import { Popup } from "./popup";

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  lang: "en" | "nl";
}

const COPY = {
  en: {
    nameLabel: "Your name",
    emailLabel: "Your email",
    messageLabel: "Tell us about your project",
    submit: "Send message",
    sending: "Opening email...",
    successTitle: "Ready to send",
    successMessage: "Your email app should open now. If it doesn't, you can reach us directly at info@buildeleven.com.",
    namePlaceholder: "John Doe",
    emailPlaceholder: "john@company.com",
    messagePlaceholder: "I'm looking for help with...",
  },
  nl: {
    nameLabel: "Je naam",
    emailLabel: "Je e-mail",
    messageLabel: "Vertel ons over je project",
    submit: "Verstuur bericht",
    sending: "E-mail openen...",
    successTitle: "Klaar om te versturen",
    successMessage: "Je e-mailapp zou nu moeten openen. Zo niet, mail ons dan direct op info@buildeleven.com.",
    namePlaceholder: "Jan Jansen",
    emailPlaceholder: "jan@bedrijf.nl",
    messagePlaceholder: "Ik zoek hulp met...",
  },
};

const CONTACT_EMAIL = "info@buildeleven.com";

export function ContactPopup({ isOpen, onClose, title, lang }: ContactPopupProps) {
  const t = COPY[lang];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project inquiry from ${name || "website"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const handleClose = () => {
    setName("");
    setEmail("");
    setMessage("");
    setSubmitted(false);
    onClose();
  };

  return (
    <Popup isOpen={isOpen} onClose={handleClose} title={title}>
      {submitted ? (
        <div className="flex flex-col items-center py-8 text-center">
          <CheckCircle className="mb-4 h-12 w-12 text-primary" aria-hidden="true" />
          <h4 className="text-xl font-semibold text-foreground">{t.successTitle}</h4>
          <p className="mt-2 max-w-sm text-muted-foreground">{t.successMessage}</p>
          <button
            type="button"
            onClick={handleClose}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-foreground">
              {t.nameLabel}
            </label>
            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.namePlaceholder}
              required
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-foreground outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-foreground">
              {t.emailLabel}
            </label>
            <input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              required
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-foreground outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-foreground">
              {t.messageLabel}
            </label>
            <textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t.messagePlaceholder}
              required
              rows={4}
              className="w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-foreground outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {t.submit}
          </button>
        </form>
      )}
    </Popup>
  );
}
