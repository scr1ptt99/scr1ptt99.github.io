import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight, Phone, X } from "lucide-react";
import { NAV, SITE } from "../../config/site";
import { SUBJECTS } from "../../data/subjects";
import { cn } from "../../lib/cn";

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      className={cn("fixed inset-0 z-[60] lg:hidden", open ? "pointer-events-auto" : "pointer-events-none")}
      aria-hidden={!open}
    >
      <div
        className="absolute inset-0 bg-black transition-[clip-path] duration-700 ease-[cubic-bezier(.76,0,.24,1)]"
        style={{ clipPath: open ? "circle(150% at 95% 5%)" : "circle(0% at 95% 5%)" }}
      />
      <div className={cn("relative flex h-full flex-col overflow-y-auto px-6 pb-10 pt-6 transition-opacity duration-300", open ? "opacity-100 delay-200" : "opacity-0")}>
        <div className="flex items-center justify-between">
          <span className="font-heading text-2xl italic">Ерудит Плюс</span>
          <button onClick={onClose} className="liquid-glass flex h-11 w-11 items-center justify-center rounded-full" aria-label="Закрити меню">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="mt-12 flex flex-col">
          {NAV.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "flex items-center justify-between border-b border-white/10 py-4 font-heading text-5xl italic transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)]",
                  isActive ? "text-accent" : "text-white",
                )
              }
              style={{
                transitionDelay: open ? `${200 + i * 60}ms` : "0ms",
                transform: open ? "none" : "translateY(40px)",
                opacity: open ? 1 : 0,
              }}
            >
              {item.label}
              <ArrowUpRight className="h-6 w-6 text-white/30" />
            </NavLink>
          ))}
        </nav>
        <div className="mt-8 flex flex-wrap gap-2">
          {SUBJECTS.map((s) => (
            <Link
              key={s.slug}
              to={`/predmety/${s.slug}`}
              className="rounded-full bg-white/[0.06] px-4 py-2 font-body text-sm text-white/70"
            >
              {s.title}
            </Link>
          ))}
        </div>
        <div className="mt-auto pt-10">
          <a href={SITE.phones[0].href} className="flex items-center gap-3 font-body text-lg">
            <Phone className="h-5 w-5 text-accent" /> {SITE.phones[0].label}
          </a>
          <p className="mt-2 font-body text-sm text-white/40">
            {SITE.address.street}, {SITE.address.office}, {SITE.address.district}
          </p>
        </div>
      </div>
    </div>
  );
}
