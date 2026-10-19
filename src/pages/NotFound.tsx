import { useEffect, useState } from "react";
import ParticleField from "../components/visuals/ParticleField";
import MagneticButton from "../components/ui/MagneticButton";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function NotFound() {
  useDocumentTitle("Сторінку не знайдено");
  const [m, setM] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const on = (e: PointerEvent) => setM({ x: e.clientX / innerWidth - 0.5, y: e.clientY / innerHeight - 0.5 });
    window.addEventListener("pointermove", on);
    return () => window.removeEventListener("pointermove", on);
  }, []);
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">
      <ParticleField />
      <div className="relative">
        <p
          className="font-heading text-[40vw] italic leading-none text-white/[0.06] md:text-[22rem]"
          style={{ transform: `translate(${m.x * 40}px, ${m.y * 40}px)` }}
        >
          404
        </p>
        <div className="-mt-[18vw] md:-mt-48">
          <h1 className="font-heading text-5xl italic md:text-7xl">
            Цієї теми немає <span className="text-accent">в програмі</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md font-body font-light text-white/55">
            Сторінку не знайдено. Але ми точно знаємо, куди рухатися далі.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <MagneticButton to="/" variant="accent">На головну</MagneticButton>
            <MagneticButton to="/predmety" variant="glass">Предмети</MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
