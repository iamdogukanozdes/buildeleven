import { useEffect, useRef } from "react";

import { Popup } from "./popup";

interface BookingPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const CALENDLY_URL = "https://calendly.com/buildeleven/demo";

export function BookingPopup({ isOpen, onClose, title }: BookingPopupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!isOpen || initializedRef.current) return;

    const existingScript = document.getElementById("calendly-widget-script") as HTMLScriptElement | null;

    const initCalendly = () => {
      if (containerRef.current && (window as unknown as { Calendly?: { initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void } }).Calendly) {
        (window as unknown as { Calendly: { initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void } }).Calendly.initInlineWidget({
          url: CALENDLY_URL,
          parentElement: containerRef.current,
        });
        initializedRef.current = true;
      }
    };

    if (existingScript && existingScript.dataset.loaded === "true") {
      initCalendly();
      return;
    }

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "calendly-widget-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => {
        script.dataset.loaded = "true";
        initCalendly();
      };
      document.body.appendChild(script);
    } else {
      existingScript.addEventListener("load", initCalendly, { once: true });
    }
  }, [isOpen]);

  return (
    <Popup isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex h-full w-full flex-col">
        <div
          ref={containerRef}
          className="calendly-inline-widget relative w-full flex-1 overflow-hidden rounded-xl border border-border bg-background"
          style={{ minHeight: "650px" }}
          data-url={CALENDLY_URL}
        />
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Powered by Calendly
        </p>
      </div>
    </Popup>
  );
}
