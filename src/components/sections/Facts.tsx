import Counter from "../ui/Counter";
import Reveal from "../ui/Reveal";
import { SUBJECTS, NMT_SUBJECTS } from "../../data/subjects";

/** Факти про центр з анімованими лічильниками (лише реальні дані). */
export default function Facts() {
  const facts = [
    { n: SUBJECTS.length, s: "", label: "предметів шкільної програми" },
    { n: NMT_SUBJECTS.length, s: "", label: "предмети з підготовки до НМТ" },
    { n: 6, s: "", label: "днів на тиждень працюємо для вас" },
    { n: 3, s: "", label: "формати: індивідуально, група, онлайн" },
  ];
  return (
    <section className="relative border-y border-white/10 py-16">
      <div className="container-x grid grid-cols-2 gap-y-12 lg:grid-cols-4">
        {facts.map((f, i) => (
          <Reveal key={f.label} delay={i * 100} className="relative px-4 text-center lg:border-l lg:border-white/10 lg:first:border-l-0">
            <Counter to={f.n} suffix={f.s} className="block font-heading text-7xl italic leading-none text-white md:text-8xl" />
            <span className="mx-auto mt-3 block max-w-[14rem] font-body text-sm text-white/50">{f.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
