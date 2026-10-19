import { ReactNode } from "react";
import Reveal from "./Reveal";
import SplitText from "./SplitText";
import { cn } from "../../lib/cn";

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  text,
  align = "left",
  className,
  action,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string[];
  text?: string;
  align?: "left" | "center";
  className?: string;
  action?: ReactNode;
}) {
  const center = align === "center";
  return (
    <div
      className={cn(
        "mb-14 flex flex-col gap-6 md:mb-20",
        center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-3xl", center && "mx-auto")}>
        {eyebrow && (
          <Reveal>
            <span className="eyebrow mb-5">{eyebrow}</span>
          </Reveal>
        )}
        <SplitText
          text={title}
          highlight={highlight}
          className="font-heading text-5xl italic leading-[0.9] tracking-tight text-white md:text-6xl lg:text-7xl"
        />
        {text && (
          <Reveal delay={200}>
            <p className={cn("mt-6 max-w-xl font-body text-base font-light text-white/60 md:text-lg", center && "mx-auto")}>
              {text}
            </p>
          </Reveal>
        )}
      </div>
      {action && <Reveal delay={300}>{action}</Reveal>}
    </div>
  );
}
