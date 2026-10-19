import { ReactNode } from "react";
import { useTilt } from "../../hooks/useTilt";
import { cn } from "../../lib/cn";

export default function TiltCard({
  children,
  className,
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useTilt<HTMLDivElement>(max);
  return (
    <div
      ref={ref}
      className={cn("spotlight transition-transform duration-300 ease-out [transform-style:preserve-3d]", className)}
    >
      {children}
    </div>
  );
}
