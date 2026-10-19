import { BookOpenCheck, GraduationCap, Laptop, Medal, NotebookPen, ShieldCheck, Sparkles, Users } from "lucide-react";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import TiltCard from "../ui/TiltCard";

const SERVICES = [
  { icon: GraduationCap, t: "Підготовка до ДПА та НМТ", d: "Системна підготовка у форматі реальних тестів." },
  { icon: Medal, t: "Іспити та олімпіади", d: "Поглиблене вивчення для тих, хто хоче більше." },
  { icon: NotebookPen, t: "Домашнє завдання", d: "Розбираємо разом, щоб тема стала зрозумілою." },
  { icon: Sparkles, t: "Спецкурси", d: "Теми поза базовим навчальним планом школи." },
];

const WHY = [
  { icon: Users, t: "Досвідчені викладачі", d: "Усі мають відповідні дипломи та сертифікати про освіту." },
  { icon: BookOpenCheck, t: "Дидактичні матеріали", d: "Багато додаткового навчального та розвивального матеріалу." },
  { icon: Laptop, t: "Сучасні інструменти", d: "Робота з сучасними програмними продуктами на заняттях." },
  { icon: ShieldCheck, t: "Відповідальність", d: "Відповідаємо за кожен етап навчання учня." },
];

export default function Services() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="container-x">
        <SectionHeading
          eyebrow="Послуги"
          title={"Більше, ніж\nпросто репетитор"}
          highlight={["репетитор"]}
          text="Традиційні методики поглибленого вивчення предметів поєднуємо із сучасними підходами до викладання."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.t} delay={i * 90}>
              <TiltCard className="h-full rounded-[1.75rem]">
                <div className="group relative h-full overflow-hidden rounded-[1.75rem] bg-white p-8 text-black">
                  <s.icon className="h-10 w-10 transition-transform duration-700 group-hover:rotate-[-12deg] group-hover:scale-110" strokeWidth={1.3} />
                  <h3 className="mt-16 font-heading text-3xl italic leading-none">{s.t}</h3>
                  <p className="mt-3 font-body text-sm text-black/60">{s.d}</p>
                  <span className="absolute -bottom-6 -right-2 font-heading text-[8rem] italic leading-none text-black/[0.05]">0{i + 1}</span>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <span className="eyebrow mb-5">Чому «Ерудит Плюс»</span>
              <h3 className="font-heading text-5xl italic leading-[0.95] md:text-6xl">
                Глибокі та <span className="text-gradient">систематизовані</span> знання — у зручний для вас час
              </h3>
            </Reveal>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[2rem] bg-white/10 sm:grid-cols-2">
            {WHY.map((w, i) => (
              <Reveal key={w.t} delay={i * 100} className="bg-black">
                <div className="group h-full p-8 transition-colors duration-500 hover:bg-white/[0.03]">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-all duration-500 group-hover:bg-accent group-hover:text-black">
                    <w.icon className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <h4 className="mt-8 font-heading text-3xl italic">{w.t}</h4>
                  <p className="mt-3 font-body font-light text-white/55">{w.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
