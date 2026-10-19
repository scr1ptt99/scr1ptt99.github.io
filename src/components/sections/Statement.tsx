import { useRef } from "react";
import { useElementProgress } from "../../hooks/useScrollProgress";

const TEXT =
  "Ми віримо, що кожна дитина здатна на більше. Потрібні лише правильне пояснення, терпіння і викладач, який бачить не оцінку, а людину.";

/** Маніфест: слова «загоряються» одне за одним у такт прокрутці. */
export default function Statement() {
  const ref = useRef<HTMLElement>(null);
  const p = useElementProgress(ref, "through");
  const words = TEXT.split(" ");
  const local = Math.min(1, Math.max(0, (p - 0.15) / 0.5));
  return (
    <section ref={ref} className="relative py-32 md:py-48">
      <div className="container-x">
        <span className="eyebrow mb-10">Наша філософія</span>
        <p className="font-heading text-4xl italic leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
          {words.map((w, i) => {
            const t = i / words.length;
            const on = local > t;
            const key = ["більше.", "людину."].includes(w);
            return (
              <span
                key={i}
                className="transition-colors duration-500"
                style={{ color: on ? (key ? "#c8f560" : "#fff") : "rgba(255,255,255,.12)" }}
              >
                {w}{" "}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
