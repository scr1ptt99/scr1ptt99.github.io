import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { NMT_SUBJECTS } from "../../data/subjects";
import Reveal from "../ui/Reveal";
import SplitText from "../ui/SplitText";
import MagneticButton from "../ui/MagneticButton";
import { useInView } from "../../hooks/useInView";
import { cn } from "../../lib/cn";

/** Блок НМТ: анімована «траєкторія» підготовки, що малюється при прокрутці. */
export default function NmtTeaser() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const path = "M20 260 C 140 250, 160 160, 280 170 S 420 90, 540 100 S 700 20, 780 30";
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <div className="container-x">
        <div className="liquid-glass-strong relative overflow-hidden rounded-[2.5rem] bg-white/[0.02] p-8 md:p-16">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />
          <div className="relative grid gap-12 lg:grid-cols-2">
            <div>
              <Reveal>
                <span className="eyebrow mb-6">Підготовка до НМТ</span>
              </Reveal>
              <SplitText
                text={"Тест, до якого\nви будете готові"}
                highlight={["готові"]}
                className="font-heading text-5xl italic leading-[0.9] tracking-tight md:text-7xl"
              />
              <Reveal delay={200}>
                <p className="mt-6 max-w-md font-body text-lg font-light text-white/60">
                  Курси з історії, математики, української та англійської: діагностика, банк завдань у форматі НМТ, пробні
                  тести і стратегія розподілу часу.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <div className="mt-8 flex flex-wrap gap-3">
                  {NMT_SUBJECTS.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/predmety/${s.slug}`}
                      className="group inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-5 py-2.5 font-body text-sm text-white/80 transition-all hover:bg-white hover:text-black"
                    >
                      <span style={{ color: s.hue }} className="font-heading italic group-hover:text-black">
                        {s.glyph}
                      </span>
                      {s.title}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-50" />
                    </Link>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={400}>
                <div className="mt-10">
                  <MagneticButton to="/nmt" variant="accent">
                    Програма підготовки
                  </MagneticButton>
                </div>
              </Reveal>
            </div>

            <div ref={ref} className={cn("relative self-center", inView && "is-in")}>
              <svg viewBox="0 0 800 300" className="w-full overflow-visible">
                {[60, 120, 180, 240].map((y) => (
                  <line key={y} x1="0" x2="800" y1={y} y2={y} stroke="rgba(255,255,255,.06)" />
                ))}
                <path d={`${path} L780 300 L20 300 Z`} fill="url(#nmtFill)" opacity={inView ? 1 : 0} style={{ transition: "opacity 2s 1s" }} />
                <path d={path} fill="none" stroke="#c8f560" strokeWidth="3" strokeLinecap="round" className="draw-path" style={{ ["--len" as string]: 1000 }} />
                {[
                  { x: 20, y: 260, t: "Діагностика" },
                  { x: 280, y: 170, t: "Теорія" },
                  { x: 540, y: 100, t: "Формат НМТ" },
                  { x: 780, y: 30, t: "Готовність" },
                ].map((pt, i) => (
                  <g
                    key={pt.t}
                    style={{
                      opacity: inView ? 1 : 0,
                      transform: inView ? "none" : "translateY(10px)",
                      transition: `all .8s ${0.4 + i * 0.5}s cubic-bezier(.16,1,.3,1)`,
                    }}
                  >
                    <circle cx={pt.x} cy={pt.y} r="18" fill="#c8f560" opacity=".15">
                      <animate attributeName="r" values="10;22;10" dur="2.4s" repeatCount="indefinite" />
                    </circle>
                    <circle cx={pt.x} cy={pt.y} r="7" fill="#000" stroke="#c8f560" strokeWidth="3" />
                    <text
                      x={pt.x}
                      y={pt.y - 26}
                      textAnchor={i === 0 ? "start" : i === 3 ? "end" : "middle"}
                      fill="#fff"
                      fontFamily="Barlow"
                      fontSize="18"
                    >
                      {pt.t}
                    </text>
                  </g>
                ))}
                <defs>
                  <linearGradient id="nmtFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#c8f560" stopOpacity=".25" />
                    <stop offset="1" stopColor="#c8f560" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
