// SPDX-License-Identifier: Apache-2.0
// azentrius.com: English without a prefix, German under /de/ with the same slugs.
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { NOINDEX_PATHS } from "./src/data/routes.mjs";

export default defineConfig({
  site: "https://azentrius.com",
  trailingSlash: "always",
  build: {
    format: "directory",
    // Stylesheets as files, never inline: the Content Security Policy stays simple and they cache.
    inlineStylesheets: "never",
  },
  markdown: {
    // No syntax highlighting: it writes inline styles, and the Content Security Policy allows none.
    // Code blocks take their look from the design system instead.
    syntaxHighlight: false,
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "de"],
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: "en", locales: { en: "en", de: "de" } },
      filter: (page) => !NOINDEX_PATHS.some((path) => page === `https://azentrius.com${path}`),
    }),
  ],
  vite: {
    build: {
      // No data: URLs for assets and no inlined scripts; everything is a file under /_astro/.
      assetsInlineLimit: 0,
    },
  },
});
