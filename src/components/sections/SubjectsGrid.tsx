import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { SUBJECTS } from "../../data/subjects";
import TiltCard from "../ui/TiltCard";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import MagneticButton from "../ui/MagneticButton";

/** Сітка предметів з 3D-нахилом, прожектором і гліфами, що «оживають» при наведенні. */
export default function SubjectsGrid({ withHeading = true }: { withHeading?: boolean }) {
  return (
    <section className="relative py-28 md:py-36">
      <div className="container-x">
        {withHeading && (
          <SectionHeading
            eyebrow="Предмети"
            title={"Вісім предметів.\nОдин підхід — розуміння."}
            highlight={["розуміння"]}
            text="Обирайте предмет — і подивіться, як ми його викладаємо, які теми розбираємо та з чим учень виходить із курсу."
            action={<MagneticButton to="/predmety" variant="ghost">Усі предмети</MagneticButton>}
          />
        )}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SUBJECTS.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 4) * 90} variant="up">
              <TiltCard className="h-full rounded-[1.75rem]">
                <Link
                  to={`/predmety/${s.slug}`}
                  data-cursor="hover"
                  className="liquid-glass group relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-[1.75rem] p-7"
                >
                  <div
                    className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-40"
                    style={{ background: s.hue }}
                  />
                  <div className="relative flex items-start justify-between">
                    <span className="font-body text-xs text-white/30">0{i + 1}</span>
                    {s.nmt && (
                      <span className="rounded-full bg-white/[0.06] px-3 py-1 font-body text-[10px] uppercase tracking-widest text-white/60">
                        НМТ
                      </span>
                    )}
                  </div>
                  <span
                    className="relative my-6 block font-heading text-7xl italic leading-none transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-2 group-hover:scale-110"
                    style={{ color: s.hue, textShadow: `0 0 40px ${s.hue}55` }}
                  >
                    {s.glyph}
                  </span>
                  <div className="relative">
                    <h3 className="font-heading text-3xl italic text-white">{s.title}</h3>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <p className="font-body text-sm text-white/50">{s.short}</p>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06] transition-all duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-black">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
