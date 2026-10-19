import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { usePageScroll } from "../../hooks/useScrollProgress";
import { cn } from "../../lib/cn";

/** Тонка лінія прогресу зверху + кругла кнопка «вгору» з кільцем прогресу. */
export default function ScrollProgress() {
  const { progress, y } = usePageScroll();
  const [show, setShow] = useState(false);
  useEffect(() => setShow(y > 700), [y]);
  const C = 2 * Math.PI * 20;
  return (
    <>
      <div className="fixed left-0 top-0 z-[70] h-[2px] w-full origin-left bg-accent" style={{ transform: `scaleX(${progress})` }} />
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Нагору"
        className={cn(
          "liquid-glass-strong fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-black/40 transition-all duration-500",
          show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
        )}
        data-cursor="hover"
      >
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56">
          <circle cx="28" cy="28" r="20" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="2" />
          <circle
            cx="28"
            cy="28"
            r="20"
            fill="none"
            stroke="#c8f560"
            strokeWidth="2"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - progress)}
            strokeLinecap="round"
          />
        </svg>
        <ArrowUp className="h-4 w-4" />
      </button>
    </>
  );
}
