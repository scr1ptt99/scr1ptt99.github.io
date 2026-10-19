import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, ChevronDown, Menu, Phone } from "lucide-react";
import { NAV, SITE } from "../../config/site";
import { SUBJECTS } from "../../data/subjects";
import { usePageScroll } from "../../hooks/useScrollProgress";
import { cn } from "../../lib/cn";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const { y, dir } = usePageScroll();
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMega(false);
    setMobile(false);
  }, [pathname]);

  const hidden = dir === 1 && y > 300 && !mega && !mobile;
  const scrolled = y > 30;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]",
          hidden && "-translate-y-[130%]",
        )}
      >
        <div
          className={cn(
            "relative flex w-full max-w-6xl items-center justify-between gap-4 rounded-full px-3 py-2 transition-all duration-500",
            scrolled ? "liquid-glass-strong bg-black/40" : "bg-transparent",
          )}
          onMouseLeave={() => setMega(false)}
        >
          <Link to="/" className="group flex items-center gap-3 pl-2" data-cursor="hover" aria-label="Ерудит Плюс — на головну">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white font-heading text-2xl italic text-black transition-transform duration-500 group-hover:rotate-[360deg]">
              E
              <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-accent ring-2 ring-black" />
            </span>
            <span className="hidden leading-none sm:block">
              <span className="block font-heading text-xl italic">Ерудит Плюс</span>
              <span className="block font-body text-[10px] uppercase tracking-[0.25em] text-white/40">
                репетиторський центр
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Головне меню">
            {NAV.filter((n) => n.to !== "/").map((item) =>
              "mega" in item && item.mega ? (
                <div key={item.to} onMouseEnter={() => setMega(true)} className="relative">
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-1 rounded-full px-4 py-2 font-body text-sm transition-colors",
                        isActive || pathname.startsWith("/predmety") ? "bg-white/10 text-white" : "text-white/60 hover:text-white",
                      )
                    }
                  >
                    {item.label}
                    <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-300", mega && "rotate-180")} />
                  </NavLink>
                </div>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onMouseEnter={() => setMega(false)}
                  className={({ isActive }) =>
                    cn(
                      "relative rounded-full px-4 py-2 font-body text-sm transition-colors",
                      isActive ? "bg-white/10 text-white" : "text-white/60 hover:text-white",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={SITE.phones[0].href}
              className="hidden items-center gap-2 rounded-full px-4 py-2 font-body text-sm text-white/70 transition-colors hover:text-white xl:flex"
            >
              <Phone className="h-4 w-4" />
              {SITE.phones[0].label}
            </a>
            <Link
              to="/kontakty"
              data-cursor="hover"
              className="hidden items-center gap-2 rounded-full bg-white px-5 py-2.5 font-body text-sm font-medium text-black transition-colors hover:bg-accent sm:flex"
            >
              Записатися <ArrowUpRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => setMobile(true)}
              className="liquid-glass flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
              aria-label="Відкрити меню"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {/* Mega menu */}
          <div
            className={cn(
              "absolute left-0 right-0 top-full pt-3 transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)]",
              mega ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0",
            )}
          >
            <div className="liquid-glass-strong grid grid-cols-4 gap-2 rounded-[2rem] bg-black/70 p-3">
              {SUBJECTS.map((s, i) => (
                <Link
                  key={s.slug}
                  to={`/predmety/${s.slug}`}
                  className="group flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 hover:bg-white/[0.06]"
                  style={{
                    transitionDelay: mega ? `${i * 25}ms` : "0ms",
                    opacity: mega ? 1 : 0,
                    transform: mega ? "none" : "translateY(8px)",
                  }}
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] font-heading text-2xl italic transition-all duration-300 group-hover:scale-110"
                    style={{ color: s.hue, boxShadow: `inset 0 0 0 1px ${s.hue}33` }}
                  >
                    {s.glyph}
                  </span>
                  <span>
                    <span className="block font-body text-sm font-medium text-white">{s.title}</span>
                    <span className="block font-body text-xs text-white/40">{s.short}</span>
                  </span>
                </Link>
              ))}
              <Link
                to="/predmety"
                className="col-span-4 mt-1 flex items-center justify-between rounded-2xl bg-white/[0.04] px-5 py-4 font-body text-sm text-white/70 transition-colors hover:bg-accent hover:text-black"
              >
                Усі предмети та формати навчання
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu open={mobile} onClose={() => setMobile(false)} />
    </>
  );
}
