import { useEffect, useRef } from "react";
import { isFinePointer } from "../../hooks/useReducedMotion";

/** Кастомний курсор: точка + інерційне кільце, що збільшується над посиланнями. */
export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isFinePointer()) return;
    document.documentElement.classList.add("has-custom-cursor");
    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const ringPos = { ...pos };
    let hover = false;
    let down = false;
    let visible = false;
    let raf = 0;

    const move = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visible) {
        visible = true;
        ringPos.x = pos.x;
        ringPos.y = pos.y;
        dot.current?.style.setProperty("opacity", "1");
        ring.current?.style.setProperty("opacity", "1");
      }
      const t = e.target as HTMLElement | null;
      hover = !!t?.closest?.("a, button, [data-cursor='hover'], input, textarea, select, label");
    };
    const onDown = () => (down = true);
    const onUp = () => (down = false);
    const onLeave = () => {
      visible = false;
      dot.current?.style.setProperty("opacity", "0");
      ring.current?.style.setProperty("opacity", "0");
    };

    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${hover ? 0 : 1})`;
      if (ring.current) {
        const s = (hover ? 2.2 : 1) * (down ? 0.8 : 1);
        ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${s})`;
        ring.current.style.backgroundColor = hover ? "rgba(200,245,96,0.15)" : "transparent";
        ring.current.style.borderColor = hover ? "rgba(200,245,96,0.8)" : "rgba(255,255,255,0.5)";
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-9 w-9 rounded-full border opacity-0 transition-[background-color,border-color,opacity] duration-300 [@media(hover:hover)_and_(pointer:fine)]:block"
        style={{ mixBlendMode: "difference" }}
      />
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-1.5 w-1.5 rounded-full bg-white opacity-0 transition-opacity [@media(hover:hover)_and_(pointer:fine)]:block"
      />
    </>
  );
}
