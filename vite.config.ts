import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import liveReload from "vite-plugin-live-reload";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), liveReload("./src/**/*.tsx")],
  server: {
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
