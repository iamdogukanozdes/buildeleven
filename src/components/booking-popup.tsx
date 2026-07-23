import { ExternalLink } from "lucide-react";

import { Popup } from "./popup";

interface BookingPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  ready: string;
  text: string;
  openLabel: string;
  powered: string;
}

const CALENDLY_URL = "https://calendly.com/buildeleven/demo";

export function BookingPopup({
  isOpen,
  onClose,
  title,
  ready,
  text,
  openLabel,
  powered,
}: BookingPopupProps) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col items-center justify-center gap-6 py-8 text-center sm:py-12">
        <div className="rounded-full bg-primary/10 p-4">
          <ExternalLink className="h-8 w-8 text-primary" aria-hidden="true" />
        </div>
        <div className="max-w-sm space-y-2">
          <p className="text-lg font-medium text-foreground">{ready}</p>
          <p className="text-muted-foreground">{text}</p>
        </div>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20"
        >
          {openLabel}
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
        <p className="text-sm text-muted-foreground">{powered}</p>
      </div>
    </Popup>
  );
}
