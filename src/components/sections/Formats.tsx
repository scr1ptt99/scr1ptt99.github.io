import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Monitor, User, Users } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { cn } from "../../lib/cn";

const FORMATS = [
  {
    icon: User,
    t: "Індивідуально",
    d: "Один на один з викладачем: персональна програма, власний темп, фокус саме на тому, що потрібно учню.",
    tags: ["Персональний план", "Гнучкий розклад", "Максимум уваги"],
    hue: "#c8f560",
  },
  {
    icon: Users,
    t: "Міні-група",
    d: "Невеликі групи учнів одного рівня: командна динаміка, обмін ідеями і доступніша вартість.",
    tags: ["Учні одного рівня", "Мотивація", "Вигідніше"],
    hue: "#7cc6ff",
  },
  {
    icon: Monitor,
    t: "Онлайн",
    d: "Ті самі викладачі та програми — з дому. Інтерактивна дошка, матеріали та зв’язок з викладачем.",
    tags: ["З будь-якого міста", "Без дороги", "Ті самі викладачі"],
    hue: "#ff8a5b",
  },
];

/** Формати навчання — панелі, що розкриваються при наведенні. */
export default function Formats() {
  const [active, setActive] = useState(0);
  return (
    <section className="relative py-28 md:py-36">
      <div className="container-x">
        <SectionHeading eyebrow="Формати" title="Навчання, що підлаштовується під вас" highlight={["вас"]} />
        <Reveal>
          <div className="flex flex-col gap-4 lg:h-[480px] lg:flex-row">
            {FORMATS.map((f, i) => {
              const on = active === i;
              return (
                <div
                  key={f.t}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  data-cursor="hover"
                  className={cn(
                    "liquid-glass relative cursor-pointer overflow-hidden rounded-[2rem] p-8 transition-[flex-grow,background-color] duration-700 ease-[cubic-bezier(.16,1,.3,1)] lg:p-10",
                    on ? "lg:flex-[3]" : "lg:flex-[1]",
                  )}
                >
                  <div
                    className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-[90px] transition-opacity duration-700"
                    style={{ background: f.hue, opacity: on ? 0.35 : 0.05 }}
                  />
                  <div className="relative flex h-full flex-col justify-between gap-10">
                    <div className="flex items-center justify-between">
                      <span
                        className="flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-500"
                        style={{ background: on ? f.hue : "rgba(255,255,255,.06)", color: on ? "#000" : "#fff" }}
                      >
                        <f.icon className="h-6 w-6" strokeWidth={1.5} />
                      </span>
                      <span className="font-body text-sm text-white/30">0{i + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-heading text-5xl italic leading-none md:text-6xl">{f.t}</h3>
                      <div
                        className={cn(
                          "grid transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)]",
                          on ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 lg:grid-rows-[0fr]",
                        )}
                      >
                        <div className="overflow-hidden">
                          <p className="max-w-md font-body font-light text-white/65">{f.d}</p>
                          <div className="mt-5 flex flex-wrap gap-2">
                            {f.tags.map((t) => (
                              <span key={t} className="rounded-full bg-white/[0.07] px-3 py-1.5 font-body text-xs text-white/70">
                                {t}
                              </span>
                            ))}
                          </div>
                          <Link
                            to="/tsiny"
                            className="mt-6 inline-flex items-center gap-2 font-body text-sm text-white transition-colors hover:text-accent"
                          >
                            Вартість формату <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
