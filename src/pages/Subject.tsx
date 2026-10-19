import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { SUBJECTS, getSubject } from "../data/subjects";
import { PLANS, formatUAH } from "../data/prices";
import PageHero from "../components/ui/PageHero";
import SubjectVisual from "../components/visuals/SubjectVisual";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import MagneticButton from "../components/ui/MagneticButton";
import Marquee from "../components/ui/Marquee";
import TiltCard from "../components/ui/TiltCard";
import FaqSection from "../components/sections/FaqSection";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function Subject() {
  const { slug } = useParams();
  const s = getSubject(slug);
  useDocumentTitle(s?.title);
  if (!s) return <Navigate to="/404" replace />;

  const idx = SUBJECTS.indexOf(s);
  const prev = SUBJECTS[(idx - 1 + SUBJECTS.length) % SUBJECTS.length];
  const next = SUBJECTS[(idx + 1) % SUBJECTS.length];
  const minPrice = Math.min(...PLANS.map((p) => p.pricePerLesson));

  return (
    <>
      <PageHero
        eyebrow={s.nmt ? "Предмет · НМТ" : "Предмет"}
        title={s.title}
        text={s.lead}
        hue={s.hue}
        crumbs={[{ label: "Предмети", to: "/predmety" }, { label: s.title }]}
        aside={<SubjectVisual kind={s.visual} hue={s.hue} className="mx-auto max-w-[460px]" />}
      >
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton to="/kontakty" variant="accent">
            Записатися на заняття
          </MagneticButton>
          <MagneticButton to="/tsiny" variant="glass">
            від {formatUAH(minPrice)}
          </MagneticButton>
        </div>
        <div className="mt-10 lg:hidden">
          <SubjectVisual kind={s.visual} hue={s.hue} className="mx-auto max-w-[320px]" />
        </div>
      </PageHero>

      <section className="py-8">
        <Marquee speed={35}>
          {s.topics.map((t) => (
            <span key={t} className="flex items-center gap-6 whitespace-nowrap px-6 font-heading text-4xl italic text-white/25 md:text-5xl">
              {t}
              <span style={{ color: s.hue }}>{s.glyph}</span>
            </span>
          ))}
        </Marquee>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="eyebrow mb-6">Про курс</span>
            </Reveal>
            <Reveal delay={100}>
              <p className="font-heading text-3xl italic leading-snug text-white md:text-4xl">{s.description}</p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-10 flex flex-wrap gap-2">
                {s.formats.map((f) => (
                  <span key={f} className="rounded-full px-4 py-2 font-body text-sm ring-1 ring-white/15">
                    {f}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
          <div>
            <Reveal>
              <span className="eyebrow mb-6">Що розбираємо</span>
            </Reveal>
            <ol className="divide-y divide-white/10 border-y border-white/10">
              {s.topics.map((t, i) => (
                <Reveal as="li" key={t} delay={i * 60} variant="left">
                  <div className="group flex items-center gap-6 py-5 transition-colors hover:text-white">
                    <span className="font-body text-xs tabular-nums text-white/30">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1 font-body text-lg text-white/75 transition-all duration-500 group-hover:translate-x-2 group-hover:text-white">
                      {t}
                    </span>
                    <span className="h-2 w-2 rounded-full opacity-0 transition-opacity group-hover:opacity-100" style={{ background: s.hue }} />
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Результат" title="З чим учень виходить з курсу" highlight={["виходить"]} />
          <div className="grid gap-4 md:grid-cols-3">
            {s.outcomes.map((o, i) => (
              <Reveal key={o} delay={i * 120}>
                <TiltCard className="h-full rounded-[2rem]">
                  <div className="liquid-glass h-full rounded-[2rem] p-8">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: s.hue, color: "#000" }}>
                      <Check className="h-5 w-5" />
                    </span>
                    <p className="mt-10 font-heading text-3xl italic leading-tight">{o}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FaqSection />

      <section className="pb-24">
        <div className="container-x grid gap-4 md:grid-cols-2">
          {[
            { s: prev, dir: "prev" as const },
            { s: next, dir: "next" as const },
          ].map(({ s: o, dir }) => (
            <Reveal key={dir} delay={dir === "next" ? 100 : 0}>
              <Link
                to={`/predmety/${o.slug}`}
                data-cursor="hover"
                className={`liquid-glass group flex items-center justify-between gap-6 overflow-hidden rounded-[2rem] p-8 ${dir === "next" ? "flex-row-reverse text-right" : ""}`}
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/[0.06] transition-all duration-500 group-hover:bg-white group-hover:text-black">
                  {dir === "prev" ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
                </span>
                <span className="flex-1">
                  <span className="block font-body text-xs uppercase tracking-[0.25em] text-white/40">
                    {dir === "prev" ? "Попередній предмет" : "Наступний предмет"}
                  </span>
                  <span className="mt-2 block font-heading text-4xl italic transition-colors group-hover:text-accent">{o.title}</span>
                </span>
                <span className="hidden font-heading text-6xl italic sm:block" style={{ color: o.hue }}>
                  {o.glyph}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
