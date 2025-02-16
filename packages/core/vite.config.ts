import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    libInjectCss() as any,
    dts({ include: ["src"], insertTypesEntry: true }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/lib/index.ts"),
      fileName: "notionpresso",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
    },
    copyPublicDir: false,
    output: {
      assetFileNames: (assetInfo) => {
        if (assetInfo.name.endsWith(".woff2")) {
          return "fonts/[name][extname]";
        }
        return "assets/[name]-[hash][extname]";
      },
    },
  },
});
