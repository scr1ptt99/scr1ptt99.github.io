import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// BASE_PATH задаётся при публикации на GitHub Pages (например "/erudit-plus/").
// Локально и на своём домене — "/".
export default defineConfig({
  base: process.env.BASE_PATH || "/",
  plugins: [react()],
  server: { port: 5173, host: true },
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          hls: ["hls.js"],
        },
      },
    },
  },
});
