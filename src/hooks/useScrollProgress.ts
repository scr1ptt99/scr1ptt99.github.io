import { RefObject, useEffect, useState } from "react";

/** Прогрес прокрутки сторінки (0..1). */
export function usePageScroll() {
  const [state, setState] = useState({ progress: 0, y: 0, dir: 0 as -1 | 0 | 1 });
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setState({ progress: max > 0 ? y / max : 0, y, dir: y > last ? 1 : y < last ? -1 : 0 });
        last = y;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return state;
}

/** Прогрес проходження елемента через екран: 0 — верх елемента внизу екрана, 1 — низ елемента вгорі. */
export function useElementProgress(ref: RefObject<HTMLElement>, mode: "through" | "sticky" = "through") {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const calc = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let v: number;
      if (mode === "sticky") {
        const total = r.height - vh;
        v = total > 0 ? -r.top / total : 0;
      } else {
        v = (vh - r.top) / (vh + r.height);
      }
      setP(Math.min(1, Math.max(0, v)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, mode]);
  return p;
}
