import { useEffect, useRef, useState } from "react";

/**
 * Global cursor effects:
 *  - A soft glow that follows the pointer (disabled on touch / reduced-motion).
 *  - Sets --mx / --my CSS vars on `.spotlight` elements so cards can render
 *    a mouse-tracked radial highlight.
 *  - Reveals elements with the `.reveal` class as they enter the viewport.
 */
export function CursorFx() {
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;

      // spotlight cards
      const cards = document.querySelectorAll<HTMLElement>(".spotlight");
      cards.forEach((card) => {
        const r = card.getBoundingClientRect();
        const mx = e.clientX - r.left;
        const my = e.clientY - r.top;
        if (mx >= -40 && my >= -40 && mx <= r.width + 40 && my <= r.height + 40) {
          card.style.setProperty("--mx", `${mx}px`);
          card.style.setProperty("--my", `${my}px`);
        }
      });
    };

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.15;
      current.current.y += (target.current.y - current.current.y) * 0.15;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    // reveal on scroll
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      io.disconnect();
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[200px] w-[200px] rounded-full opacity-100 mix-blend-screen blur-lg"
      style={{
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--primary) 70%, transparent) 0%, color-mix(in oklab, var(--primary) 30%, transparent) 40%, transparent 65%)",
        willChange: "transform",
      }}
    />
  );
}
