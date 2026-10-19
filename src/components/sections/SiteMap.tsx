import { Link } from "react-router-dom";
import { Clock, MapPin, Phone } from "lucide-react";
import { NAV, SITE } from "../../config/site";
import { SUBJECTS } from "../../data/subjects";
import Reveal from "../ui/Reveal";
import Marquee from "../ui/Marquee";

/** Інформаційний блок перед фінальною CTA: навігація, предмети, контакти, графік. */
export default function SiteMap() {
  return (
    <section className="relative border-t border-white/10 pt-20">
      <div className="container-x grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <Reveal>
          <h3 className="mb-6 font-body text-xs uppercase tracking-[0.25em] text-white/40">Навігація</h3>
          <ul className="space-y-3">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="group inline-flex items-center gap-2 font-body text-white/70 transition-colors hover:text-white">
                  <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-4" />
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={80}>
          <h3 className="mb-6 font-body text-xs uppercase tracking-[0.25em] text-white/40">Предмети</h3>
          <ul className="space-y-3">
            {SUBJECTS.map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/predmety/${s.slug}`}
                  className="group inline-flex items-center gap-2 font-body text-white/70 transition-colors hover:text-white"
                >
                  <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-4" />
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={160}>
          <h3 className="mb-6 font-body text-xs uppercase tracking-[0.25em] text-white/40">Контакти</h3>
          <div className="space-y-4 font-body text-white/70">
            {SITE.phones.map((p) => (
              <a key={p.href} href={p.href} className="flex items-center gap-3 transition-colors hover:text-accent">
                <Phone className="h-4 w-4 text-white/40" /> {p.label}
              </a>
            ))}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address.mapQuery)}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-3 transition-colors hover:text-accent"
            >
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-white/40" />
              <span>
                {SITE.address.street}
                <br />
                {SITE.address.office}
                <br />
                {SITE.address.district}, {SITE.address.city}
              </span>
            </a>
          </div>
        </Reveal>
        <Reveal delay={240}>
          <h3 className="mb-6 font-body text-xs uppercase tracking-[0.25em] text-white/40">Графік роботи</h3>
          <ul className="space-y-3 font-body text-white/70">
            {SITE.hours.map((h) => (
              <li key={h.days} className="flex items-start gap-3">
                <Clock className="mt-1 h-4 w-4 shrink-0 text-white/40" />
                <span>
                  {h.days}
                  <br />
                  <span className="text-white">{h.time}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Marquee className="mt-20 select-none" speed={60}>
        {Array.from({ length: 3 }, (_, i) => (
          <span key={i} className="flex items-center whitespace-nowrap px-8 font-heading text-[18vw] italic leading-none text-white/[0.04]">
            Ерудит Плюс <span className="mx-8 text-accent/20">✦</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
