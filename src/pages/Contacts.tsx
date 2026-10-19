import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import TiltCard from "../components/ui/TiltCard";
import ContactForm from "../components/sections/ContactForm";
import { SITE } from "../config/site";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function Contacts() {
  useDocumentTitle("Контакти");
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address.mapQuery)}`;
  const embed = `https://www.google.com/maps?q=${encodeURIComponent(SITE.address.mapQuery)}&z=16&output=embed`;

  return (
    <>
      <PageHero
        eyebrow="Контакти"
        title={"Приходьте —\nпознайомимось"}
        highlight={["познайомимось"]}
        text={`${SITE.address.street}, ${SITE.address.office}. ${SITE.address.district}, ${SITE.address.city}. Залиште заявку або просто зателефонуйте.`}
        crumbs={[{ label: "Контакти" }]}
      />

      <section className="pb-24">
        <div className="container-x grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-4">
            <Reveal>
              <TiltCard max={4} className="rounded-[2rem]">
                <div className="liquid-glass rounded-[2rem] p-8">
                  <Phone className="h-6 w-6 text-accent" strokeWidth={1.5} />
                  <p className="mt-6 font-body text-xs uppercase tracking-[0.25em] text-white/40">Телефони</p>
                  {SITE.phones.map((p) => (
                    <a key={p.href} href={p.href} className="mt-2 block font-heading text-3xl italic transition-colors hover:text-accent md:text-4xl">
                      {p.label}
                    </a>
                  ))}
                </div>
              </TiltCard>
            </Reveal>
            <Reveal delay={100}>
              <TiltCard max={4} className="rounded-[2rem]">
                <a href={mapsLink} target="_blank" rel="noreferrer" className="liquid-glass group block rounded-[2rem] p-8">
                  <MapPin className="h-6 w-6 text-accent" strokeWidth={1.5} />
                  <p className="mt-6 font-body text-xs uppercase tracking-[0.25em] text-white/40">Адреса</p>
                  <p className="mt-2 font-heading text-3xl italic leading-tight">
                    {SITE.address.street}
                    <br />
                    <span className="text-white/60">{SITE.address.office}</span>
                  </p>
                  <p className="mt-2 font-body text-sm text-white/50">
                    {SITE.address.district}, {SITE.address.city}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-body text-sm text-accent">
                    <Navigation className="h-4 w-4 transition-transform group-hover:rotate-45" /> Прокласти маршрут
                  </span>
                </a>
              </TiltCard>
            </Reveal>
            <Reveal delay={200}>
              <TiltCard max={4} className="rounded-[2rem]">
                <div className="liquid-glass rounded-[2rem] p-8">
                  <Clock className="h-6 w-6 text-accent" strokeWidth={1.5} />
                  <p className="mt-6 font-body text-xs uppercase tracking-[0.25em] text-white/40">Графік</p>
                  <ul className="mt-3 divide-y divide-white/10">
                    {SITE.hours.map((h) => (
                      <li key={h.days} className="flex items-center justify-between py-3 font-body">
                        <span className="text-white/60">{h.days}</span>
                        <span className="text-white">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </Reveal>
          </div>
          <Reveal delay={150} variant="scale">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x">
          <Reveal variant="scale">
            <div className="group relative h-[480px] overflow-hidden rounded-[2.5rem] ring-1 ring-white/10">
              <iframe
                title="Карта: Ерудит Плюс"
                src={embed}
                loading="lazy"
                className="h-full w-full grayscale invert-[.92] hue-rotate-180 contrast-[.9] transition-all duration-700 group-hover:invert-0 group-hover:hue-rotate-0 group-hover:grayscale-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute left-6 top-6 rounded-full bg-black/70 px-5 py-3 font-body text-sm backdrop-blur">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-accent" />
                {SITE.address.street} · {SITE.address.district}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
