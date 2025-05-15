import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES === "true" ? "/ds-example-react/" : "/",
  resolve: {
    alias: {
      "@tokens": path.resolve(__dirname, "./tokens_compiled"),
    },
  },
});
