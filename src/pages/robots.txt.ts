// SPDX-License-Identifier: Apache-2.0
// Crawlers, AI search included, may read everything (decided 18.10.2026).
import type { APIRoute } from "astro";

export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: https://azentrius.com/sitemap-index.xml\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
