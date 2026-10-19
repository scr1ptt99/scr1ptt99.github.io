import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import { SITE } from "../config/site";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

interface Section {
  h: string;
  p: string;
}

const PRIVACY: Section[] = [
  {
    h: "Які дані ми збираємо",
    p: "Ім’я, номер телефону, обраний предмет, клас і коментар, які ви добровільно вказуєте у формі запису на сайті.",
  },
  {
    h: "Навіщо ми їх використовуємо",
    p: "Виключно для зв’язку з вами щодо запису на заняття, узгодження розкладу та інформування про навчання.",
  },
  {
    h: "Передача третім особам",
    p: "Ми не продаємо і не передаємо ваші дані третім особам, окрім випадків, передбачених законодавством України.",
  },
  {
    h: "Зберігання та видалення",
    p: "Дані зберігаються стільки, скільки потрібно для надання послуг. Ви можете будь-коли попросити видалити їх, зателефонувавши нам.",
  },
  {
    h: "Файли cookie",
    p: "Сайт може використовувати технічні файли cookie та локальне сховище браузера для коректної роботи (наприклад, щоб не показувати заставку повторно).",
  },
];

const TERMS: Section[] = [
  {
    h: "Загальні положення",
    p: `Сайт належить ${SITE.fullName} і містить інформацію про освітні послуги центру. Користуючись сайтом, ви погоджуєтеся з цими умовами.`,
  },
  {
    h: "Інформація на сайті",
    p: "Вартість і склад послуг на сайті мають інформаційний характер. Остаточні умови навчання узгоджуються з адміністратором центру.",
  },
  {
    h: "Запис і скасування занять",
    p: "Про перенесення чи скасування заняття просимо повідомляти заздалегідь. Деталі обговорюються під час запису.",
  },
  {
    h: "Інтелектуальна власність",
    p: "Тексти, дизайн і матеріали сайту не можна копіювати без згоди центру.",
  },
];

function LegalPage({ title, eyebrow, sections }: { title: string; eyebrow: string; sections: Section[] }) {
  useDocumentTitle(title);
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} crumbs={[{ label: title }]} />
      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-6">
          {sections.map((s, i) => (
            <Reveal key={s.h} delay={i * 60}>
              <div className="grid gap-4 border-t border-white/10 py-10 md:grid-cols-[80px_1fr]">
                <span className="font-heading text-4xl italic text-white/20">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="font-heading text-3xl italic">{s.h}</h2>
                  <p className="mt-3 font-body font-light leading-relaxed text-white/65">{s.p}</p>
                </div>
              </div>
            </Reveal>
          ))}
          <p className="border-t border-white/10 pt-8 font-body text-sm text-white/40">
            Питання щодо цього документа — за телефоном {SITE.phones[0].label}.
          </p>
        </div>
      </section>
    </>
  );
}

export const Privacy = () => <LegalPage title="Конфіденційність" eyebrow="Документи" sections={PRIVACY} />;
export const Terms = () => <LegalPage title="Умови користування" eyebrow="Документи" sections={TERMS} />;
