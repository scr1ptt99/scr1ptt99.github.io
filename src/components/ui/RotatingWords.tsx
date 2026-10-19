import { useEffect, useState } from "react";
import { cn } from "../../lib/cn";

/** Слова змінюються по колу з вертикальним «барабаном». */
export default function RotatingWords({
  words,
  interval = 2200,
  className,
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span className={cn("relative inline-grid overflow-hidden align-bottom", className)}>
      <span className="invisible col-start-1 row-start-1" aria-hidden>
        {longest}
      </span>
      {words.map((w, idx) => {
        const state = idx === i ? "in" : idx === (i - 1 + words.length) % words.length ? "out" : "wait";
        return (
          <span
            key={w}
            aria-hidden={idx !== i}
            className="col-start-1 row-start-1 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
            style={{
              transform:
                state === "in" ? "translateY(0) rotateX(0)" : state === "out" ? "translateY(-100%) rotateX(60deg)" : "translateY(100%) rotateX(-60deg)",
              opacity: state === "in" ? 1 : 0,
              filter: state === "in" ? "blur(0)" : "blur(6px)",
            }}
          >
            {w}
          </span>
        );
      })}
    </span>
  );
}
