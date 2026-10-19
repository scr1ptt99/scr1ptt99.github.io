import { ArrowDown, MapPin } from "lucide-react";
import ParticleField from "../visuals/ParticleField";
import Aurora from "../visuals/Aurora";
import GlyphOrbit from "../visuals/GlyphOrbit";
import SplitText from "../ui/SplitText";
import Reveal from "../ui/Reveal";
import RotatingWords from "../ui/RotatingWords";
import MagneticButton from "../ui/MagneticButton";
import Marquee from "../ui/Marquee";
import { SUBJECTS } from "../../data/subjects";
import { SITE } from "../../config/site";
import { usePageScroll } from "../../hooks/useScrollProgress";

export default function Hero() {
  const { y } = usePageScroll();
  const p = Math.min(1, y / 800);

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <Aurora />
      <ParticleField />
      {/* radial vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,black_85%)]" />

      <div
        className="container-x relative z-10 grid flex-1 items-center gap-10 pb-10 pt-36 lg:grid-cols-[1.25fr_1fr] lg:pt-28"
        style={{ transform: `translate3d(0, ${p * 120}px, 0)`, opacity: 1 - p * 0.9 }}
      >
        <div>
          <Reveal delay={200}>
            <span className="liquid-glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 font-body text-xs text-white/70">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Набір на навчальний рік відкрито
            </span>
          </Reveal>

          <SplitText
            as="h1"
            immediate
            delay={350}
            stagger={90}
            text={"Знання, що\nвідкривають двері"}
            highlight={["двері"]}
            className="font-heading text-[15vw] italic leading-[0.85] tracking-tight sm:text-7xl md:text-8xl xl:text-[8.5rem]"
          />

          <Reveal delay={900}>
            <p className="mt-8 font-body text-xl font-light text-white/70 md:text-2xl">
              Репетитори з{" "}
              <RotatingWords
                className="font-heading text-2xl italic text-accent md:text-3xl"
                words={["математики", "української", "англійської", "історії", "фізики", "хімії", "біології", "німецької"]}
              />
            </p>
          </Reveal>

          <Reveal delay={1050}>
            <p className="mt-4 max-w-lg font-body text-base font-light text-white/50">
              Підвищення рівня знань і підготовка до НМТ — індивідуально, у міні-групах та онлайн. Досвідчені викладачі, прозорий
              прогрес і жодного «зубріння».
            </p>
          </Reveal>

          <Reveal delay={1200}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton to="/kontakty" variant="accent">
                Записатися на пробне
              </MagneticButton>
              <MagneticButton to="/predmety" variant="glass">
                Обрати предмет
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={1350}>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address.mapQuery)}`}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center gap-2 font-body text-sm text-white/40 transition-colors hover:text-white"
            >
              <MapPin className="h-4 w-4" /> {SITE.address.street}, {SITE.address.district}
            </a>
          </Reveal>
        </div>

        <Reveal variant="scale" delay={600} className="hidden justify-center lg:flex">
          <div style={{ transform: `rotate(${p * 30}deg) scale(${1 - p * 0.15})` }} className="transition-transform duration-100">
            <GlyphOrbit size={500} />
          </div>
        </Reveal>
      </div>

      <div className="relative z-10 pb-8">
        <Marquee speed={45}>
          {SUBJECTS.map((s) => (
            <span key={s.slug} className="flex items-center gap-6 px-6 font-heading text-3xl italic text-white/30 md:text-4xl">
              {s.title}
              <span className="font-body text-lg not-italic" style={{ color: s.hue }}>
                {s.glyph}
              </span>
            </span>
          ))}
        </Marquee>
        <div className="container-x mt-6 flex items-center justify-between font-body text-xs uppercase tracking-[0.25em] text-white/30">
          <span>Київ · Осокорки</span>
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight * 0.9, behavior: "smooth" })}
            className="flex items-center gap-3 transition-colors hover:text-white"
          >
            Гортайте
            <span className="flex h-9 w-6 justify-center rounded-full border border-white/20 pt-1.5">
              <ArrowDown className="h-3 w-3 animate-bounce" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
