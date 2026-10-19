import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useMagnetic } from "../../hooks/useMagnetic";
import { cn } from "../../lib/cn";

type Variant = "glass" | "solid" | "accent" | "ghost";

interface Props {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  icon?: boolean;
  className?: string;
  external?: boolean;
  disabled?: boolean;
}

const styles: Record<Variant, string> = {
  glass: "liquid-glass-strong text-white hover:bg-white/10",
  solid: "bg-white text-black hover:bg-white/90",
  accent: "bg-accent text-black hover:brightness-110 shadow-[0_0_40px_-8px_#c8f560]",
  ghost: "text-white/70 hover:text-white ring-1 ring-white/15 hover:ring-white/40",
};

/** Кнопка/посилання з магнітним ефектом і стрілкою, що «вилітає» при наведенні. */
export default function MagneticButton({
  children,
  to,
  href,
  onClick,
  type = "button",
  variant = "glass",
  icon = true,
  className,
  external,
  disabled,
}: Props) {
  const wrap = useMagnetic<HTMLSpanElement>(0.3);
  const cls = cn(
    "group relative inline-flex items-center gap-2 rounded-full px-6 py-3 font-body text-sm font-medium transition-all duration-300 will-change-transform",
    styles[variant],
    disabled && "pointer-events-none opacity-50",
    className,
  );
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {icon && (
        <span className="relative z-10 inline-flex h-5 w-5 overflow-hidden">
          <ArrowUpRight className="h-5 w-5 transition-transform duration-500 ease-out group-hover:-translate-y-5 group-hover:translate-x-5" />
          <ArrowUpRight className="absolute h-5 w-5 -translate-x-5 translate-y-5 transition-transform duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      )}
    </>
  );
  return (
    <span ref={wrap} className="inline-block will-change-transform" data-cursor="hover">
      {to ? (
        <Link to={to} className={cls}>
          {inner}
        </Link>
      ) : href ? (
        <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
          {inner}
        </a>
      ) : (
        <button type={type} onClick={onClick} className={cls} disabled={disabled}>
          {inner}
        </button>
      )}
    </span>
  );
}
