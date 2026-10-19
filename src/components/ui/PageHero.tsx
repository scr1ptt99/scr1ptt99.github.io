import { ReactNode } from "react";
import SplitText from "./SplitText";
import Reveal from "./Reveal";
import Breadcrumbs from "./Breadcrumbs";
import Aurora from "../visuals/Aurora";
import ParticleField from "../visuals/ParticleField";

/** Шапка внутрішніх сторінок. */
export default function PageHero({
  eyebrow,
  title,
  highlight,
  text,
  crumbs,
  hue,
  children,
  aside,
}: {
  eyebrow: string;
  title: string;
  highlight?: string[];
  text?: string;
  crumbs: { label: string; to?: string }[];
  hue?: string;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-20 pt-36 md:pb-28 md:pt-44">
      <Aurora hue={hue} />
      <ParticleField density={0.5} className="opacity-60" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <Reveal>
            <Breadcrumbs items={crumbs} />
          </Reveal>
          <Reveal delay={100}>
            <span className="eyebrow mb-6">{eyebrow}</span>
          </Reveal>
          <SplitText
            as="h1"
            immediate
            delay={300}
            text={title}
            highlight={highlight}
            className="font-heading text-6xl italic leading-[0.88] tracking-tight md:text-7xl lg:text-8xl"
          />
          {text && (
            <Reveal delay={500}>
              <p className="mt-8 max-w-xl font-body text-lg font-light text-white/60">{text}</p>
            </Reveal>
          )}
          {children && <Reveal delay={650}>{children}</Reveal>}
        </div>
        {aside && (
          <Reveal variant="scale" delay={400} className="hidden lg:block">
            {aside}
          </Reveal>
        )}
      </div>
    </section>
  );
}
