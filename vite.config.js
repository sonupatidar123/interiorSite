import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  base: '/sonupatidar123/
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  // 1. FIXED: Base should be the repository name, not the full GitHub URL
  base: "/interiorSite/", 
  resolve: {
    alias: {
      // 2. FIXED: Added the missing comma before this 'resolve' block
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
