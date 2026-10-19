import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Hls from "hls.js";
import { SITE } from "../../config/site";
import { useInView } from "../../hooks/useInView";
import { cn } from "../../lib/cn";

/**
 * CTA + Footer — кінематографічна фінальна секція кожної сторінки:
 * HLS-відео на фоні (Mux), градієнтні затухання, liquid-glass кнопка
 * та мінімальний футер-рядок. Структура — за ТЗ, тексти — для «Ерудит Плюс».
 */
const CtaFooter = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: contentRef, inView } = useInView<HTMLDivElement>();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const src = SITE.ctaVideo; // https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }
  }, []);

  return (
    <section className="relative py-32 px-6 md:px-16 lg:px-24 text-center overflow-hidden">
      {/* Background HLS Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 z-[1] pointer-events-none"
        style={{ height: "200px", background: "linear-gradient(to bottom, black, transparent)" }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[1] pointer-events-none"
        style={{ height: "200px", background: "linear-gradient(to top, black, transparent)" }}
      />

      {/* Content */}
      <div ref={contentRef} className={cn("relative z-10", inView && "is-in")}>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white tracking-tight leading-[0.85] max-w-3xl mx-auto mb-4">
          {"Ваш наступний рівень знань починається тут.".split(" ").map((w, i) => (
            <span key={i} className="split-word">
              <span className="split-inner" style={{ ["--d" as string]: `${i * 80}ms` }}>
                {w}&nbsp;
              </span>
            </span>
          ))}
        </h2>
        <p
          className={cn(
            "reveal text-white/60 font-body font-light text-sm md:text-base max-w-xl mx-auto mb-8",
            inView && "is-in",
          )}
          style={{ ["--d" as string]: "400ms" }}
        >
          Запишіться на пробне заняття. Відчуйте, як змінюється навчання, коли воно справді цікаве. Без зобов&#8217;язань, без тиску. Лише можливості.
        </p>
        <div
          className={cn("reveal flex flex-wrap items-center justify-center gap-6", inView && "is-in")}
          style={{ ["--d" as string]: "550ms" }}
        >
          <Link
            to="/kontakty"
            data-cursor="hover"
            className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-medium text-white flex items-center gap-2 hover:bg-white/10 transition-all font-body"
          >
            Записатися на заняття
            <ArrowUpRight className="h-5 w-5" />
          </Link>
          <Link
            to="/tsiny"
            data-cursor="hover"
            className="bg-white text-black rounded-full px-6 py-3 text-sm font-medium flex items-center gap-2 hover:bg-white/90 transition-colors font-body"
          >
            Переглянути ціни
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 font-body font-light text-xs">
            &copy; {SITE.year} {SITE.name}. Усі права захищені.
          </p>
          <div className="flex items-center gap-6">
            {[
              { label: "Конфіденційність", to: "/konfidentsiynist" },
              { label: "Умови", to: "/umovy" },
              { label: "Контакти", to: "/kontakty" },
            ].map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-white/40 hover:text-white/70 font-body font-light text-xs transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaFooter;
