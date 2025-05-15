import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { buildTokens } from "./style-dictionary-builder.js";

const tryBuildTokens = async () => {
  try {
    await buildTokens();
  } catch (error) {
    console.error(`Initial token build error: ${error.message}`);
  }
};

const tokenWatcherPlugin = () => ({
  name: "token-watcher",
  async configureServer(server) {
    await tryBuildTokens();

    server.watcher.add("tokens/**/*.json");
    server.watcher.on("change", async (filePath) => {
      if (!(filePath.includes("tokens/") && filePath.endsWith(".json"))) return;
      await tryBuildTokens();
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tokenWatcherPlugin()],
  base: process.env.GITHUB_PAGES === "true" ? "/ds-example-react/" : "/",
  resolve: {
    alias: {
      "@tokens": path.resolve(__dirname, "./dist/tokens"),
    },
  },
});
