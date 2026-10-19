import { useEffect, useState } from "react";
import { cn } from "../../lib/cn";

const WORDS = ["Знання", "Впевненість", "Результат"];

/** Інтро-заставка: лічильник 0→100, слова, що змінюються, і «шторка» вгору. Показується раз за сесію. */
export default function Preloader() {
  const [show, setShow] = useState(() => {
    try {
      return !sessionStorage.getItem("ep-intro");
    } catch {
      return true;
    }
  });
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!show) return;
    document.documentElement.style.overflow = "hidden";
    const t0 = performance.now();
    const dur = 2000;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / dur);
      setCount(Math.round(100 * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setLeaving(true);
        setTimeout(() => {
          setShow(false);
          document.documentElement.style.overflow = "";
          try {
            sessionStorage.setItem("ep-intro", "1");
          } catch {
            /* ignore */
          }
        }, 1000);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;
  const wordIdx = Math.min(WORDS.length - 1, Math.floor(count / 34));

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] flex flex-col justify-between bg-black p-6 transition-transform duration-1000 ease-[cubic-bezier(.76,0,.24,1)] md:p-12",
        leaving && "-translate-y-full",
      )}
      style={{ borderBottomLeftRadius: leaving ? "50% 12%" : 0, borderBottomRightRadius: leaving ? "50% 12%" : 0 }}
    >
      <div className="flex items-center justify-between font-body text-xs uppercase tracking-[0.3em] text-white/40">
        <span>Ерудит Плюс</span>
        <span>Київ · Осокорки</span>
      </div>
      <div className="relative h-[1.1em] overflow-hidden text-center font-heading text-6xl italic md:text-8xl">
        {WORDS.map((w, i) => (
          <span
            key={w}
            className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
            style={{
              transform: i === wordIdx ? "translateY(0)" : i < wordIdx ? "translateY(-110%)" : "translateY(110%)",
              opacity: i === wordIdx ? 1 : 0,
            }}
          >
            {w}
            <span className="text-accent">.</span>
          </span>
        ))}
      </div>
      <div className="flex items-end justify-between">
        <div className="h-px w-1/2 bg-white/10">
          <div className="h-px bg-accent transition-[width] duration-100" style={{ width: `${count}%` }} />
        </div>
        <span className="font-heading text-7xl italic tabular-nums leading-none md:text-9xl">
          {count}
          <span className="text-3xl text-white/40">%</span>
        </span>
      </div>
    </div>
  );
}
