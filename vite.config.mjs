
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
  },
  plugins: [react()],
  define: {
    'import.meta.env.VITE_APP_EASEBUZZ_LINK': JSON.stringify(process.env.VITE_APP_EASEBUZZ_LINK),
    'import.meta.env.VITE_EASEBUZZ_KEY': JSON.stringify(process.env.VITE_EASEBUZZ_KEY),
  },
});