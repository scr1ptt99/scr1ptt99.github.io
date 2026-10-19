import { FormEvent, useState } from "react";
import { Check, Loader2, Phone } from "lucide-react";
import { SITE } from "../../config/site";
import { SUBJECTS } from "../../data/subjects";
import MagneticButton from "../ui/MagneticButton";
import { cn } from "../../lib/cn";

type Status = "idle" | "sending" | "sent" | "error";

/** Форма запису. Надсилає дані на SITE.formEndpoint; якщо його не задано — пропонує зателефонувати. */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [name, setName] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    const errs: Record<string, string> = {};
    if (!data.name?.trim()) errs.name = "Вкажіть ім’я";
    if (!/^[+\d\s()-]{9,}$/.test(data.phone ?? "")) errs.phone = "Перевірте номер телефону";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setName(data.name);

    if (!SITE.formEndpoint) {
      setStatus("sent");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(SITE.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="liquid-glass-strong flex min-h-[520px] flex-col items-center justify-center rounded-[2.5rem] bg-white/[0.02] p-10 text-center">
        <span className="relative flex h-24 w-24 items-center justify-center">
          <span className="absolute inset-0 animate-pulse-ring rounded-full ring-2 ring-accent" />
          <span className="flex h-24 w-24 items-center justify-center rounded-full bg-accent text-black">
            <Check className="h-10 w-10" />
          </span>
        </span>
        <h3 className="mt-10 font-heading text-5xl italic">Дякуємо, {name}!</h3>
        {SITE.formEndpoint ? (
          <p className="mt-4 max-w-sm font-body font-light text-white/60">Заявку отримано. Адміністратор зв’яжеться з вами найближчим часом.</p>
        ) : (
          <p className="mt-4 max-w-sm font-body font-light text-white/60">
            Заявку сформовано. Щоб записатися найшвидше — зателефонуйте адміністратору:
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {SITE.phones.map((p) => (
            <MagneticButton key={p.href} href={p.href} variant="glass" icon={false}>
              <Phone className="mr-1 inline h-4 w-4" /> {p.label}
            </MagneticButton>
          ))}
        </div>
        <button onClick={() => setStatus("idle")} className="mt-8 font-body text-sm text-white/40 underline-offset-4 hover:underline">
          Надіслати ще одну заявку
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="liquid-glass-strong space-y-5 rounded-[2.5rem] bg-white/[0.02] p-6 md:p-10"
    >
      <h3 className="font-heading text-4xl italic">Запис на заняття</h3>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block font-body text-xs uppercase tracking-[0.2em] text-white/40">Ім’я</span>
          <input name="name" className={cn("field", errors.name && "ring-ember/70")} placeholder="Як до вас звертатися" autoComplete="name" />
          {errors.name && <span className="mt-2 block font-body text-xs text-ember">{errors.name}</span>}
        </label>
        <label className="block">
          <span className="mb-2 block font-body text-xs uppercase tracking-[0.2em] text-white/40">Телефон</span>
          <input
            name="phone"
            type="tel"
            className={cn("field", errors.phone && "ring-ember/70")}
            placeholder="+38 (0__) ___-__-__"
            autoComplete="tel"
          />
          {errors.phone && <span className="mt-2 block font-body text-xs text-ember">{errors.phone}</span>}
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block font-body text-xs uppercase tracking-[0.2em] text-white/40">Предмет</span>
          <select name="subject" className="field appearance-none" defaultValue={SUBJECTS[0].title}>
            {SUBJECTS.map((s) => (
              <option key={s.slug} className="bg-black">
                {s.title}
              </option>
            ))}
            <option className="bg-black">Підготовка до НМТ</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block font-body text-xs uppercase tracking-[0.2em] text-white/40">Клас</span>
          <select name="grade" className="field appearance-none" defaultValue="9">
            {Array.from({ length: 11 }, (_, i) => (
              <option key={i} value={i + 1} className="bg-black">
                {i + 1} клас
              </option>
            ))}
          </select>
        </label>
      </div>
      <fieldset>
        <span className="mb-3 block font-body text-xs uppercase tracking-[0.2em] text-white/40">Формат</span>
        <div className="flex flex-wrap gap-2">
          {["Індивідуально", "Міні-група", "Онлайн"].map((f, i) => (
            <label key={f} className="cursor-pointer">
              <input type="radio" name="format" value={f} defaultChecked={i === 0} className="peer sr-only" />
              <span className="inline-block rounded-full bg-white/[0.06] px-5 py-2.5 font-body text-sm text-white/60 transition-all peer-checked:bg-accent peer-checked:text-black peer-focus-visible:ring-2 peer-focus-visible:ring-white">
                {f}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className="block">
        <span className="mb-2 block font-body text-xs uppercase tracking-[0.2em] text-white/40">Коментар</span>
        <textarea name="message" rows={4} className="field resize-none" placeholder="Мета навчання, зручний час, побажання" />
      </label>
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <p className="max-w-xs font-body text-xs text-white/35">Натискаючи кнопку, ви погоджуєтеся з політикою конфіденційності.</p>
        <MagneticButton type="submit" variant="accent" disabled={status === "sending"}>
          {status === "sending" ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Надсилаємо
            </span>
          ) : (
            "Надіслати заявку"
          )}
        </MagneticButton>
      </div>
      {status === "error" && (
        <p className="font-body text-sm text-ember">Не вдалося надіслати. Будь ласка, зателефонуйте нам: {SITE.phones[0].label}</p>
      )}
    </form>
  );
}
