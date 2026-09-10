import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    open: true,
    host: true,
  },
  build: {
    sourcemap: false, // ❌ Hides TSX, JSX, source files in production
    minify: "esbuild", // Faster & smaller bundle
    outDir: "dist", // Output folder
    assetsDir: "assets", // Assets folder
    rollupOptions: {
      output: {
        manualChunks: undefined, // Keep bundle optimized
      },
    },
  },
});
