import { FAQ } from "../../data/faq";
import Accordion from "../ui/Accordion";
import SplitText from "../ui/SplitText";
import Reveal from "../ui/Reveal";
import MagneticButton from "../ui/MagneticButton";
import { SITE } from "../../config/site";

export default function FaqSection() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.6fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <span className="eyebrow mb-5">Питання</span>
          </Reveal>
          <SplitText
            text={"Часті\nзапитання"}
            className="font-heading text-6xl italic leading-[0.9] tracking-tight md:text-7xl"
          />
          <Reveal delay={200}>
            <p className="mt-6 max-w-sm font-body font-light text-white/55">Не знайшли відповідь? Зателефонуйте — розкажемо все про навчання.</p>
            <div className="mt-8">
              <MagneticButton href={SITE.phones[0].href} variant="glass">
                {SITE.phones[0].label}
              </MagneticButton>
            </div>
          </Reveal>
        </div>
        <Accordion items={FAQ} />
      </div>
    </section>
  );
}
