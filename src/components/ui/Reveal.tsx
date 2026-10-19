import { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "../../hooks/useInView";
import { cn } from "../../lib/cn";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  variant?: "up" | "left" | "scale";
  className?: string;
  style?: CSSProperties;
}

/** Плавна поява при прокрутці: зсув + розмиття. */
export default function Reveal({ children, as: Tag = "div", delay = 0, variant = "up", className, style }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref}
      className={cn(
        "reveal",
        variant === "left" && "reveal-left",
        variant === "scale" && "reveal-scale",
        inView && "is-in",
        className,
      )}
      style={{ ...style, ["--d" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
