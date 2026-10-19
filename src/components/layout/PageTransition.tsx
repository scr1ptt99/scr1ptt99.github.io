import { ReactNode, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Перехід між сторінками: «шторка» з назвою центру проїжджає екраном,
 * нова сторінка проявляється знизу. Прокрутка скидається вгору.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const first = useRef(true);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setKey((k) => k + 1);
    const t = setTimeout(() => window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }), 420);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <>
      {key > 0 && (
        <div key={`c${key}`} className="curtain pointer-events-none fixed inset-0 z-[150] flex items-center justify-center bg-accent">
          <span className="font-heading text-5xl italic text-black md:text-7xl">Ерудит Плюс</span>
        </div>
      )}
      <div key={pathname} className={key > 0 ? "page-in" : ""}>
        {children}
      </div>
    </>
  );
}
