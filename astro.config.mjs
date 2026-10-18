// @ts-check

import path from "node:path";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // Keep spaces between inline elements in existing articles after Astro 7.
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },

  integrations: [
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: {
        theme: "github-dark-dimmed",
        themes: {
          light: "github-light",
          dark: "github-dark-dimmed",
        },
      },
      gfm: true,
    }),
    react(),
  ],
});
