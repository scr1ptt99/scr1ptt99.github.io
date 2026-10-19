import { Link } from "react-router-dom";
import { SUBJECTS } from "../../data/subjects";

/**
 * Обертова «планетарна система» предметів: кільця з гліфами,
 * кожен гліф — посилання на сторінку предмета.
 */
export default function GlyphOrbit({ size = 520 }: { size?: number }) {
  const inner = SUBJECTS.slice(0, 4);
  const outer = SUBJECTS.slice(4);
  const ring = (items: typeof SUBJECTS, radius: number, duration: number, reverse = false) => (
    <div
      className="absolute left-1/2 top-1/2 rounded-full border border-white/10"
      style={{
        width: radius * 2,
        height: radius * 2,
        marginLeft: -radius,
        marginTop: -radius,
        animation: `spin-slow ${duration}s linear infinite ${reverse ? "reverse" : ""}`,
      }}
    >
      {items.map((s, i) => {
        const a = (i / items.length) * Math.PI * 2;
        const x = radius + Math.cos(a) * radius;
        const y = radius + Math.sin(a) * radius;
        return (
          <Link
            key={s.slug}
            to={`/predmety/${s.slug}`}
            title={s.title}
            data-cursor="hover"
            className="group absolute -ml-8 -mt-8 flex h-16 w-16 items-center justify-center"
            style={{ left: x, top: y, animation: `spin-slow ${duration}s linear infinite ${reverse ? "" : "reverse"}` }}
          >
            <span
              className="liquid-glass flex h-16 w-16 items-center justify-center rounded-2xl font-heading text-2xl italic text-white transition-all duration-500 group-hover:scale-125"
              style={{ boxShadow: `0 0 40px -12px ${s.hue}` }}
            >
              {s.glyph}
            </span>
            <span className="pointer-events-none absolute top-full mt-2 whitespace-nowrap rounded-full bg-white px-3 py-1 font-body text-[11px] font-medium text-black opacity-0 transition-opacity group-hover:opacity-100">
              {s.title}
            </span>
          </Link>
        );
      })}
    </div>
  );

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <style>{`@keyframes spin-slow{to{transform:rotate(360deg)}}`}</style>
      {/* glow core */}
      <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/30 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full">
        <span className="absolute inset-0 animate-pulse-ring rounded-full ring-1 ring-accent/60" />
        <span className="absolute inset-0 animate-pulse-ring rounded-full ring-1 ring-accent/40 [animation-delay:1.2s]" />
        <span className="liquid-glass-strong flex h-28 w-28 items-center justify-center rounded-full font-heading text-5xl italic">
          E<span className="text-accent">+</span>
        </span>
      </div>
      {ring(inner, size * 0.27, 40)}
      {ring(outer, size * 0.45, 60, true)}
    </div>
  );
}
