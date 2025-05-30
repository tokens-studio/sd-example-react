import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { buildTokens } from "./style-dictionary-builder.js";

const tryBuildTokens = async () => {
  try {
    await buildTokens();
  } catch (error) {
    console.error(`Token build error: ${error.message}`);
  }
};

const tokenWatcherPlugin = () => ({
  name: "token-watcher",
  async configureServer(server) {
    await tryBuildTokens();

    server.watcher.add("tokens/**/*.json");
    server.watcher.on("change", async (filePath) => {
      const isTokenFile =
        filePath.includes("tokens/") && filePath.endsWith(".json");
      if (!isTokenFile) return;
      await tryBuildTokens();
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), tokenWatcherPlugin()],
  // Only use the base path for production builds (when deploying to GitHub Pages)
  base: command === 'build' ? "/sd-example-react/" : "/",
  resolve: {
    alias: {
      "@tokens": path.resolve(__dirname, "./src/.cache/tokens"),
    },
  },
}));
