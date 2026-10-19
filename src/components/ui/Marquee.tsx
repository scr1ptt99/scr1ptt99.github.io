import { ReactNode } from "react";
import { cn } from "../../lib/cn";

/** Нескінченна стрічка; зупиняється при наведенні. */
export default function Marquee({
  children,
  reverse,
  className,
  speed = 40,
}: {
  children: ReactNode;
  reverse?: boolean;
  className?: string;
  speed?: number;
}) {
  return (
    <div className={cn("group relative flex overflow-hidden mask-fade-x", className)}>
      <div
        className={cn("flex shrink-0 items-center group-hover:[animation-play-state:paused]", reverse ? "animate-marquee-rev" : "animate-marquee")}
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
