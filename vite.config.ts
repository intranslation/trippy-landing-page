import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import liveReload from "vite-plugin-live-reload";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), liveReload("./src/**/*.tsx")],
  server: {
    proxy: {
      "/api": {
        target: "https://save-lead-14743591223.us-central1.run.app",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    hmr: true,
    watch: {
      usePolling: true,
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
        },
      },
    },
  },
});
