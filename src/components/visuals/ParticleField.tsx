import { useEffect, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const GLYPHS = ["∑", "π", "√", "∫", "Δ", "λ", "Ω", "x²", "Aa", "ß", "Ї", "H₂O", "⚛", "∞", "θ", "%", "÷", "≈"];

interface P {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  glyph?: string;
  size: number;
  alpha: number;
}

/**
 * Інтерактивне «сузір'я знань»: точки й символи предметів,
 * що з'єднуються лініями і розлітаються від курсора.
 */
export default function ParticleField({ density = 1, className = "" }: { density?: number; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let particles: P[] = [];
    let raf = 0;
    let visible = true;
    const mouse = { x: -9999, y: -9999, active: false };

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(110, (w * h) / 14000) * density);
      particles = Array.from({ length: count }, (_, i) => {
        const isGlyph = i % 6 === 0;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.4 + 0.4,
          glyph: isGlyph ? GLYPHS[(i / 6) % GLYPHS.length | 0] : undefined,
          size: isGlyph ? 14 + Math.random() * 14 : 0,
          alpha: 0.25 + Math.random() * 0.6,
        };
      });
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);
      const linkDist = Math.min(150, w / 7);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // repel from mouse
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 22000) {
            const f = (22000 - d2) / 22000;
            p.vx += (dx / Math.sqrt(d2 + 0.01)) * f * 0.6;
            p.vy += (dy / Math.sqrt(d2 + 0.01)) * f * 0.6;
          }
        }
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.vx += (Math.random() - 0.5) * 0.02;
        p.vy += (Math.random() - 0.5) * 0.02;
        p.x += p.vx + 0.05;
        p.y += p.vy - 0.03;
        if (p.x < -40) p.x = w + 40;
        if (p.x > w + 40) p.x = -40;
        if (p.y < -40) p.y = h + 40;
        if (p.y > h + 40) p.y = -40;

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < linkDist) {
            const a = (1 - d / linkDist) * 0.18;
            ctx.strokeStyle = `rgba(255,255,255,${a})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      // mouse links in accent colour
      if (mouse.active) {
        for (const p of particles) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 200) {
            ctx.strokeStyle = `rgba(200,245,96,${(1 - d / 200) * 0.45})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        if (p.glyph) {
          ctx.font = `italic ${p.size}px 'Instrument Serif', serif`;
          ctx.fillStyle = `rgba(255,255,255,${p.alpha * 0.55})`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(p.glyph, p.x, p.y);
        } else {
          ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = () => {
      if (visible) step();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = mouse.y > 0 && mouse.y < r.height;
    };
    const onLeave = () => (mouse.active = false);

    init();
    if (reduced) {
      step();
    } else {
      raf = requestAnimationFrame(loop);
    }
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    const ro = new ResizeObserver(() => init());
    ro.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [density, reduced]);

  return <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden />;
}
