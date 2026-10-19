import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import TiltCard from "../components/ui/TiltCard";
import MagneticButton from "../components/ui/MagneticButton";
import SubjectVisual from "../components/visuals/SubjectVisual";
import NmtTeaser from "../components/sections/NmtTeaser";
import FaqSection from "../components/sections/FaqSection";
import { NMT_SUBJECTS } from "../data/subjects";
import { NMT_COURSE, formatUAH } from "../data/prices";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const STAGES = [
  { t: "Вхідна діагностика", d: "Пробний тест у форматі НМТ, щоб побачити стартову точку." },
  { t: "Карта прогалин", d: "Розбираємо помилки і складаємо список тем для опрацювання." },
  { t: "Теоретичний блок", d: "Системне повторення програми з акцентом на «слабкі» теми." },
  { t: "Тренування формату", d: "Банк завдань НМТ, робота на час, типові пастки тестів." },
  { t: "Пробні тестування", d: "Регулярні пробні НМТ з детальним розбором кожної відповіді." },
  { t: "Фінальна стратегія", d: "Розподіл часу, порядок завдань, психологічна готовність." },
];

export default function Nmt() {
  useDocumentTitle("Підготовка до НМТ");
  return (
    <>
      <PageHero
        eyebrow="Підготовка до НМТ"
        title={"НМТ без\nпаніки"}
        highlight={["паніки"]}
        text="Курси підготовки до національного мультипредметного тесту з історії, математики, української та англійської мови. Офлайн на Осокорках і онлайн."
        crumbs={[{ label: "НМТ" }]}
        aside={<SubjectVisual kind="math" hue="#c8f560" className="mx-auto max-w-[440px]" />}
      >
        <div className="mt-10 flex flex-wrap gap-4">
          <MagneticButton to="/kontakty" variant="accent">Пройти діагностику</MagneticButton>
          <MagneticButton to="/tsiny" variant="glass">Вартість курсу</MagneticButton>
        </div>
      </PageHero>

      <section className="py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Предмети НМТ" title="Чотири предмети — одна система" highlight={["система"]} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {NMT_SUBJECTS.map((s, i) => (
              <Reveal key={s.slug} delay={i * 100}>
                <TiltCard className="h-full rounded-[2rem]">
                  <Link to={`/predmety/${s.slug}`} data-cursor="hover" className="liquid-glass group block h-full overflow-hidden rounded-[2rem] p-6">
                    <SubjectVisual kind={s.visual} hue={s.hue} className="mx-auto max-w-[220px] transition-transform duration-700 group-hover:scale-105" />
                    <div className="mt-4 flex items-center justify-between">
                      <h3 className="font-heading text-3xl italic">{s.title}</h3>
                      <ArrowUpRight className="h-5 w-5 text-white/40 transition-all group-hover:rotate-45 group-hover:text-accent" />
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Програма" title="Шість етапів до впевненого результату" highlight={["впевненого"]} />
          <div className="relative grid gap-px overflow-hidden rounded-[2rem] bg-white/10 md:grid-cols-2 lg:grid-cols-3">
            {STAGES.map((st, i) => (
              <Reveal key={st.t} delay={(i % 3) * 100} className="bg-black">
                <div className="group relative h-full overflow-hidden p-10 transition-colors duration-500 hover:bg-white/[0.03]">
                  <span className="absolute -right-4 -top-8 font-heading text-[10rem] italic leading-none text-white/[0.04] transition-colors duration-700 group-hover:text-accent/10">
                    {i + 1}
                  </span>
                  <span className="font-body text-xs uppercase tracking-[0.25em] text-accent">Етап {i + 1}</span>
                  <h3 className="mt-6 font-heading text-4xl italic">{st.t}</h3>
                  <p className="mt-3 font-body font-light text-white/55">{st.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <NmtTeaser />

      <section className="py-24">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-accent p-10 text-black md:p-16">
              <div className="absolute -right-20 -top-20 h-80 w-80 animate-spin-slow rounded-full border-[40px] border-black/5" />
              <div className="relative grid gap-10 lg:grid-cols-2 lg:items-end">
                <div>
                  <span className="font-body text-xs uppercase tracking-[0.3em] text-black/60">{NMT_COURSE.name}</span>
                  <p className="mt-6 font-heading text-7xl italic leading-none md:text-8xl">
                    {formatUAH(NMT_COURSE.pricePerMonth)}
                    <span className="text-3xl"> / міс</span>
                  </p>
                  <p className="mt-3 font-body text-black/60">{NMT_COURSE.lessonsPerMonth} занять на місяць · один предмет</p>
                </div>
                <div>
                  <ul className="space-y-3">
                    {NMT_COURSE.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 font-body">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-accent">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/kontakty"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-7 py-3.5 font-body text-sm font-medium text-white transition-transform hover:scale-105"
                  >
                    Записатися на курс <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FaqSection />
    </>
  );
}
