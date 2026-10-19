import { useRef } from "react";
import { useElementProgress } from "../../hooks/useScrollProgress";
import SplitText from "../ui/SplitText";
import Reveal from "../ui/Reveal";

const STEPS = [
  {
    n: "01",
    t: "Діагностика",
    d: "Перше заняття — знайомство і визначення рівня. Знаходимо прогалини та сильні сторони учня.",
    g: "?",
  },
  {
    n: "02",
    t: "Персональний план",
    d: "Складаємо програму під цілі: шкільні оцінки, олімпіада, ДПА чи НМТ. Кожен етап — зрозумілий.",
    g: "↗",
  },
  {
    n: "03",
    t: "Живі заняття",
    d: "Пояснюємо через приклади й діалог, використовуємо дидактичні матеріали та сучасні програмні продукти.",
    g: "✦",
  },
  {
    n: "04",
    t: "Контроль прогресу",
    d: "Проміжні перевірки та зворотний зв’язок для батьків: що вже вдалося і над чим працюємо далі.",
    g: "◎",
  },
  {
    n: "05",
    t: "Результат",
    d: "Впевненість на уроках, кращі оцінки, готовність до іспитів. Ми відповідаємо за кожен етап навчання.",
    g: "★",
  },
];

/** Горизонтальна прокрутка кроків навчання, «приклеєна» до екрана (desktop). */
export default function Approach() {
  const ref = useRef<HTMLElement>(null);
  const p = useElementProgress(ref, "sticky");

  return (
    <>
      {/* Desktop: pinned horizontal scroll */}
      <section ref={ref} className="relative hidden lg:block" style={{ height: `${STEPS.length * 70 + 60}vh` }}>
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="container-x mb-12 flex items-end justify-between">
            <div>
              <span className="eyebrow mb-5">Як ми навчаємо</span>
              <SplitText
                text="Шлях від «не розумію» до «я знаю»"
                highlight={["знаю"]}
                className="font-heading text-6xl italic leading-[0.9] tracking-tight xl:text-7xl"
              />
            </div>
            <div className="font-heading text-8xl italic tabular-nums text-white/10">
              0{Math.min(STEPS.length, Math.floor(p * STEPS.length) + 1)}
              <span className="text-4xl">/0{STEPS.length}</span>
            </div>
          </div>

          <div className="relative">
            <div
              className="flex gap-6 pl-[max(6rem,calc((100vw-80rem)/2+6rem))] will-change-transform"
              style={{ transform: `translate3d(${-p * (STEPS.length - 1.6) * 31}vw, 0, 0)` }}
            >
              {STEPS.map((s, i) => {
                const active = p * (STEPS.length - 0.6) >= i - 0.2;
                return (
                  <article
                    key={s.n}
                    className="liquid-glass relative flex h-[46vh] w-[30vw] shrink-0 flex-col justify-between overflow-hidden rounded-[2rem] p-10 transition-all duration-700"
                    style={{ opacity: active ? 1 : 0.35, transform: active ? "none" : "scale(.94)" }}
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-body text-sm text-white/40">{s.n}</span>
                      <span
                        className="font-heading text-[9rem] italic leading-none transition-colors duration-700"
                        style={{ color: active ? "#c8f560" : "rgba(255,255,255,.1)" }}
                      >
                        {s.g}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-heading text-5xl italic">{s.t}</h3>
                      <p className="mt-4 max-w-sm font-body font-light leading-relaxed text-white/60">{s.d}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="container-x mt-12">
            <div className="h-px w-full bg-white/10">
              <div className="h-px bg-accent" style={{ width: `${p * 100}%` }} />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile / tablet: vertical timeline */}
      <section className="relative py-28 lg:hidden">
        <div className="container-x">
          <span className="eyebrow mb-5">Як ми навчаємо</span>
          <SplitText
            text="Шлях від «не розумію» до «я знаю»"
            highlight={["знаю"]}
            className="mb-14 font-heading text-5xl italic leading-[0.9] tracking-tight"
          />
          <div className="relative space-y-6 border-l border-white/10 pl-8">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <span className="absolute -left-[5px] mt-3 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_14px_#c8f560]" />
                <span className="font-body text-xs text-white/40">{s.n}</span>
                <h3 className="font-heading text-4xl italic">{s.t}</h3>
                <p className="mt-2 font-body font-light text-white/60">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
