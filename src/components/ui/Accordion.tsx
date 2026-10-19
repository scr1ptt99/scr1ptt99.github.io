import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";
import { cn } from "../../lib/cn";

export default function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={it.q} delay={i * 60}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-center justify-between gap-6 py-7 text-left"
              data-cursor="hover"
            >
              <span className="font-heading text-2xl italic text-white transition-colors group-hover:text-accent md:text-3xl">
                {it.q}
              </span>
              <span
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full ring-1 ring-white/15 transition-all duration-500",
                  isOpen && "rotate-[135deg] bg-accent text-black ring-accent",
                )}
              >
                <Plus className="h-5 w-5" />
              </span>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.16,1,.3,1)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-8 font-body text-base font-light leading-relaxed text-white/60">{it.a}</p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
