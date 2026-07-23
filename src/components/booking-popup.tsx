import { Popup } from "./popup";

interface BookingPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const CALENDLY_URL = "https://calendly.com/buildeleven/demo?month=2026-07";

export function BookingPopup({ isOpen, onClose, title }: BookingPopupProps) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} title={title}>
      <div className="w-full">
        <div className="relative w-full overflow-hidden rounded-xl border border-border bg-background" style={{ minHeight: "650px" }}>
          <iframe
            src={CALENDLY_URL}
            title="Book a call with Build Eleven"
            className="absolute inset-0 h-full w-full"
            frameBorder="0"
            scrolling="no"
            allow="camera; microphone; autoplay; encrypted-media; fullscreen"
          />
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Powered by Calendly
        </p>
      </div>
    </Popup>
  );
}
