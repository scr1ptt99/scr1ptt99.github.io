import { cn } from "../../lib/cn";

/** М'які кольорові «плями» на фоні, що повільно пливуть. */
export default function Aurora({ className, hue = "#c8f560" }: { className?: string; hue?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div
        className="absolute -left-[10%] top-[10%] h-[45vmax] w-[45vmax] animate-float rounded-full opacity-[0.16] blur-[120px]"
        style={{ background: hue }}
      />
      <div
        className="absolute -right-[10%] top-[30%] h-[38vmax] w-[38vmax] rounded-full bg-[#5b6cff] opacity-[0.14] blur-[130px]"
        style={{ animation: "float 9s ease-in-out infinite reverse" }}
      />
      <div
        className="absolute bottom-[-20%] left-[30%] h-[30vmax] w-[30vmax] rounded-full bg-[#ff8a5b] opacity-[0.08] blur-[120px]"
        style={{ animation: "float 12s ease-in-out infinite" }}
      />
    </div>
  );
}
