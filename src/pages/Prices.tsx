import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check, Minus, Plus } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import TiltCard from "../components/ui/TiltCard";
import MagneticButton from "../components/ui/MagneticButton";
import FaqSection from "../components/sections/FaqSection";
import { PLANS, DISCOUNTS, NMT_COURSE, formatUAH } from "../data/prices";
import { SUBJECTS } from "../data/subjects";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { cn } from "../lib/cn";

function AnimatedNumber({ value }: { value: number }) {
  return (
    <span key={Math.round(value)} className="inline-block animate-[pageIn_.5s_cubic-bezier(.16,1,.3,1)]">
      {formatUAH(value)}
    </span>
  );
}

export default function Prices() {
  useDocumentTitle("Ціни");
  const [planId, setPlanId] = useState(PLANS[1].id);
  const [lessons, setLessons] = useState(8);
  const [subjects, setSubjects] = useState<string[]>([SUBJECTS[0].slug]);

  const plan = PLANS.find((p) => p.id === planId)!;
  const calc = useMemo(() => {
    const base = plan.pricePerLesson * lessons * subjects.length;
    let disc = 0;
    if (lessons >= 16) disc += DISCOUNTS[1].value;
    else if (lessons >= 8) disc += DISCOUNTS[0].value;
    const secondSubjectDisc = subjects.length > 1 ? plan.pricePerLesson * lessons * (subjects.length - 1) * DISCOUNTS[2].value : 0;
    const total = base * (1 - disc) - secondSubjectDisc;
    return { base, total, saved: base - total };
  }, [plan, lessons, subjects]);

  const toggle = (slug: string) =>
    setSubjects((s) => (s.includes(slug) ? (s.length > 1 ? s.filter((x) => x !== slug) : s) : [...s, slug]));

  return (
    <>
      <PageHero
        eyebrow="Ціни"
        title={"Прозора вартість\nбез сюрпризів"}
        highlight={["сюрпризів"]}
        text="Оберіть формат, кількість занять і предмети — калькулятор одразу покаже вартість на місяць з урахуванням знижок."
        crumbs={[{ label: "Ціни" }]}
      />

      <section className="pb-24">
        <div className="container-x">
          <div className="grid gap-4 lg:grid-cols-3">
            {PLANS.map((p, i) => (
              <Reveal key={p.id} delay={i * 120}>
                <TiltCard max={5} className="h-full rounded-[2rem]">
                  <div
                    className={cn(
                      "relative flex h-full flex-col overflow-hidden rounded-[2rem] p-8 md:p-10",
                      p.highlight ? "bg-white text-black" : "liquid-glass",
                    )}
                  >
                    {p.highlight && (
                      <span className="absolute right-6 top-6 rounded-full bg-black px-3 py-1 font-body text-[10px] uppercase tracking-widest text-accent">
                        Найпопулярніше
                      </span>
                    )}
                    <h3 className="font-heading text-4xl italic">{p.name}</h3>
                    <p className={cn("mt-1 font-body text-sm", p.highlight ? "text-black/50" : "text-white/50")}>{p.note}</p>
                    <p className="mt-10 font-heading text-7xl italic leading-none">
                      {p.pricePerLesson}
                      <span className="font-body text-base not-italic opacity-50"> грн / {p.duration}</span>
                    </p>
                    <ul className="mt-10 flex-1 space-y-3">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 font-body text-sm">
                          <Check className={cn("h-4 w-4", p.highlight ? "text-black" : "text-accent")} /> {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => {
                        setPlanId(p.id);
                        document.getElementById("calc")?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className={cn(
                        "mt-10 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-body text-sm font-medium transition-all",
                        p.highlight ? "bg-black text-white hover:bg-black/80" : "bg-white/[0.08] hover:bg-white hover:text-black",
                      )}
                    >
                      Розрахувати <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-6 text-center font-body text-xs text-white/35">
              Ціни вказані орієнтовно. Точну вартість уточнюйте за телефоном — вона залежить від предмета, класу та розкладу.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="calc" className="scroll-mt-28 py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Калькулятор" title="Порахуйте свою вартість" highlight={["свою"]} />
          <Reveal>
            <div className="liquid-glass-strong grid gap-10 rounded-[2.5rem] bg-white/[0.02] p-6 md:p-12 lg:grid-cols-[1.4fr_1fr]">
              <div className="space-y-10">
                <div>
                  <p className="mb-4 font-body text-xs uppercase tracking-[0.25em] text-white/40">1. Формат</p>
                  <div className="flex flex-wrap gap-2">
                    {PLANS.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPlanId(p.id)}
                        className={cn(
                          "rounded-full px-5 py-2.5 font-body text-sm transition-all duration-300",
                          planId === p.id ? "bg-accent text-black" : "bg-white/[0.06] text-white/70 hover:bg-white/[0.12]",
                        )}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-4 font-body text-xs uppercase tracking-[0.25em] text-white/40">2. Занять на місяць</p>
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => setLessons((l) => Math.max(4, l - 1))}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.06] transition hover:bg-white hover:text-black"
                      aria-label="Менше"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-20 text-center font-heading text-6xl italic tabular-nums">{lessons}</span>
                    <button
                      onClick={() => setLessons((l) => Math.min(24, l + 1))}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.06] transition hover:bg-white hover:text-black"
                      aria-label="Більше"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <input
                    type="range"
                    min={4}
                    max={24}
                    value={lessons}
                    onChange={(e) => setLessons(+e.target.value)}
                    className="mt-6 w-full accent-[#c8f560]"
                    aria-label="Кількість занять"
                  />
                </div>
                <div>
                  <p className="mb-4 font-body text-xs uppercase tracking-[0.25em] text-white/40">3. Предмети</p>
                  <div className="flex flex-wrap gap-2">
                    {SUBJECTS.map((s) => {
                      const on = subjects.includes(s.slug);
                      return (
                        <button
                          key={s.slug}
                          onClick={() => toggle(s.slug)}
                          className={cn(
                            "inline-flex items-center gap-2 rounded-full px-4 py-2 font-body text-sm transition-all duration-300",
                            on ? "bg-white text-black" : "bg-white/[0.06] text-white/60 hover:text-white",
                          )}
                        >
                          <span className="font-heading italic" style={{ color: on ? "#000" : s.hue }}>
                            {s.glyph}
                          </span>
                          {s.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-[2rem] bg-black/60 p-8 ring-1 ring-white/10">
                <div>
                  <p className="font-body text-xs uppercase tracking-[0.25em] text-white/40">Разом на місяць</p>
                  <p className="mt-4 font-heading text-6xl italic leading-none text-accent md:text-7xl">
                    <AnimatedNumber value={calc.total} />
                  </p>
                  {calc.saved > 0 && (
                    <p className="mt-3 font-body text-sm text-white/60">
                      <span className="text-white/30 line-through">{formatUAH(calc.base)}</span> · економія {formatUAH(calc.saved)}
                    </p>
                  )}
                  <ul className="mt-8 space-y-2 font-body text-sm text-white/50">
                    {DISCOUNTS.map((d) => (
                      <li key={d.label}>
                        −{Math.round(d.value * 100)}% · {d.label}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10">
                  <MagneticButton to="/kontakty" variant="accent" className="w-full justify-center">
                    Записатися
                  </MagneticButton>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <Link
              to="/nmt"
              className="group mt-6 flex items-center justify-between gap-6 rounded-[2rem] p-8 ring-1 ring-white/10 transition-colors hover:bg-white/[0.03]"
            >
              <span>
                <span className="block font-body text-xs uppercase tracking-[0.25em] text-white/40">Окремо</span>
                <span className="mt-2 block font-heading text-4xl italic">{NMT_COURSE.name}</span>
              </span>
              <span className="flex items-center gap-4 font-heading text-4xl italic text-accent">
                {formatUAH(NMT_COURSE.pricePerMonth)}
                <ArrowUpRight className="h-6 w-6 transition-transform group-hover:rotate-45" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <FaqSection />
    </>
  );
}
