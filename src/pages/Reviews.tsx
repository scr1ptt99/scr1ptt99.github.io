import { Quote, Star } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import MagneticButton from "../components/ui/MagneticButton";
import { REVIEWS, Review } from "../data/reviews";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

function ReviewCard({ r }: { r: Review }) {
  return (
    <figure className="liquid-glass relative mb-4 rounded-[1.75rem] p-7">
      {r.placeholder && (
        <span className="absolute right-5 top-5 rounded-full bg-white/[0.08] px-2.5 py-1 font-body text-[10px] uppercase tracking-widest text-white/50">
          зразок
        </span>
      )}
      <Quote className="h-8 w-8 text-accent" strokeWidth={1.2} />
      <div className="mt-4 flex gap-1">
        {Array.from({ length: r.rating }, (_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
        ))}
      </div>
      <blockquote className="mt-4 font-heading text-2xl italic leading-snug text-white/90">{r.text}</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08] font-heading text-lg italic">
          {r.name.charAt(0)}
        </span>
        <span>
          <span className="block font-body text-sm font-medium">{r.name}</span>
          <span className="block font-body text-xs text-white/40">
            {r.role} · {r.subject}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Колонка, що безперервно прокручується вертикально. */
function Column({ items, reverse, speed }: { items: Review[]; reverse?: boolean; speed: number }) {
  return (
    <div className="group relative h-[760px] overflow-hidden [mask-image:linear-gradient(180deg,transparent,#000_12%,#000_88%,transparent)]">
      <div
        className="group-hover:[animation-play-state:paused]"
        style={{ animation: `reviewsScroll ${speed}s linear infinite ${reverse ? "reverse" : ""}` }}
      >
        {[...items, ...items].map((r, i) => (
          <ReviewCard key={i} r={r} />
        ))}
      </div>
    </div>
  );
}

export default function Reviews() {
  useDocumentTitle("Відгуки");
  const cols = [REVIEWS.filter((_, i) => i % 3 === 0), REVIEWS.filter((_, i) => i % 3 === 1), REVIEWS.filter((_, i) => i % 3 === 2)];
  return (
    <>
      <style>{`@keyframes reviewsScroll{from{transform:translateY(0)}to{transform:translateY(-50%)}}`}</style>
      <PageHero
        eyebrow="Відгуки"
        title={"Що кажуть\nучні та батьки"}
        highlight={["батьки"]}
        text="Найкраща оцінка нашої роботи — слова тих, хто вчився з нами. Наведіть курсор на колонку, щоб зупинити її."
        crumbs={[{ label: "Відгуки" }]}
      >
        <div className="mt-10">
          <MagneticButton to="/kontakty" variant="glass">
            Залишити відгук
          </MagneticButton>
        </div>
      </PageHero>

      <section className="pb-24">
        <div className="container-x">
          <Reveal>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Column items={cols[0]} speed={38} />
              <div className="hidden md:block">
                <Column items={cols[1]} speed={46} reverse />
              </div>
              <div className="hidden lg:block">
                <Column items={cols[2]} speed={42} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
