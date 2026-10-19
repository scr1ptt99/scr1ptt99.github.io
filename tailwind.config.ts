import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Instrument Serif'", "serif"],
        body: ["'Barlow'", "sans-serif"],
      },
      colors: {
        accent: "#c8f560",
        ember: "#ff8a5b",
        ink: "#050505",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        "marquee-rev": { from: { transform: "translateX(-50%)" }, to: { transform: "translateX(0)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-14px)" } },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        shimmer: { from: { backgroundPosition: "200% 0" }, to: { backgroundPosition: "-200% 0" } },
        pulseRing: {
          "0%": { transform: "scale(.8)", opacity: ".7" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-rev": "marquee-rev 40s linear infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 30s linear infinite",
        shimmer: "shimmer 6s linear infinite",
        "pulse-ring": "pulseRing 2.4s cubic-bezier(.2,.6,.3,1) infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
