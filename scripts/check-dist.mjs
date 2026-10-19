// SPDX-License-Identifier: Apache-2.0
// Checks the built site in dist/ before it is packed: every page pair exists, carries the right
// canonical and hreflang links, has a title and description of the right length, loads no inline
// executable script, links only to pages and files that exist, and names nothing unpublished.
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { NOINDEX_PATHS, ROUTES, SITE } from "../src/data/routes.mjs";

const DIST = fileURLToPath(new URL("../dist/", import.meta.url));
const errors = [];
const fail = (where, message) => errors.push(`${where}: ${message}`);

/**
 * Projects that are not public yet must not be named anywhere in the build. Only the SHA-256 of each
 * name (lower case) is listed, so the names stay out of this public repository and its build logs.
 */
const UNPUBLISHED = new Set([
  "5f64cab7a5a5ab04e7b6f49c4efd378295903c3dd36c7cc113b6998760349d10",
  "ecd1e69384bcbd88bad7cd3070df78585bdd2ddc8f2088832b9e8e461f29e998",
]);
const sha256 = (text) => createHash("sha256").update(text).digest("hex");

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

function fileFor(urlPath) {
  const clean = decodeURIComponent(urlPath.split("#")[0].split("?")[0]);
  if (clean.endsWith("/")) return join(DIST, clean, "index.html");
  return join(DIST, clean);
}

function attr(tag, name) {
  const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`, "i"));
  return m ? m[1] : undefined;
}

function decode(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

if (!existsSync(DIST)) {
  console.error("dist/ is missing; run astro build first.");
  process.exit(1);
}

// 1. Every page pair exists in both languages.
for (const [key, pair] of Object.entries(ROUTES)) {
  for (const lang of ["en", "de"]) {
    if (!existsSync(fileFor(pair[lang]))) fail(pair[lang], `page "${key}" (${lang}) is missing`);
  }
}
for (const file of ["404.html", "robots.txt", "sitemap-index.xml", "favicon.svg"]) {
  if (!existsSync(join(DIST, file))) fail(file, "missing");
}

// 2. Each HTML page.
const files = walk(DIST);
const html = files.filter((f) => f.endsWith(".html"));
const pathOf = (file) => "/" + relative(DIST, file).split(sep).join("/").replace(/index\.html$/, "");

for (const file of html) {
  const where = pathOf(file);
  const src = readFileSync(file, "utf8");
  const head = src.split("</head>")[0];
  const is404 = where === "/404.html";

  // Title and description.
  const titles = [...head.matchAll(/<title>([^<]*)<\/title>/g)].map((m) => decode(m[1]));
  if (titles.length !== 1) fail(where, `${titles.length} <title> elements`);
  else if (titles[0].length > 60) fail(where, `title has ${titles[0].length} characters (max 60)`);
  const desc = head.match(/<meta name="description" content="([^"]*)"/);
  if (!desc) fail(where, "no meta description");
  else if (decode(desc[1]).length > 155) fail(where, `description has ${decode(desc[1]).length} characters (max 155)`);

  // A picture for shared links that exists on this site.
  const og = head.match(/<meta property="og:image" content="([^"]*)"/)?.[1];
  if (!og) fail(where, "no og:image");
  else if (!og.startsWith(SITE + "/")) fail(where, `og:image is not on ${SITE}: ${og}`);
  else if (!existsSync(fileFor(new URL(og).pathname))) fail(where, `og:image missing: ${og}`);

  // Language, one h1.
  const lang = src.match(/<html lang="([a-z]+)"/)?.[1];
  if (!lang) fail(where, "no lang attribute on <html>");
  const h1s = (src.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) fail(where, `${h1s} <h1> elements`);

  // Canonical and hreflang for every page in ROUTES.
  const noindex = /<meta name="robots" content="noindex"/.test(head);
  const entry = Object.values(ROUTES).find((pair) => pair.en === where || pair.de === where);
  if (entry) {
    const expectLang = entry.en === where ? "en" : "de";
    if (lang !== expectLang) fail(where, `lang is "${lang}", expected "${expectLang}"`);
    const canonical = head.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
    if (canonical !== new URL(where, SITE).href) fail(where, `canonical is ${canonical}`);
    const shouldIndex = !NOINDEX_PATHS.includes(where);
    if (noindex === shouldIndex) fail(where, noindex ? "carries noindex" : "should carry noindex");
    if (shouldIndex) {
      const alternates = Object.fromEntries(
        [...head.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], m[2]]),
      );
      const expected = { en: new URL(entry.en, SITE).href, de: new URL(entry.de, SITE).href };
      expected["x-default"] = expected.en;
      for (const [code, href] of Object.entries(expected)) {
        if (alternates[code] !== href) fail(where, `hreflang ${code} is ${alternates[code]}, expected ${href}`);
      }
    }
  } else if (!is404) {
    fail(where, "page is not listed in ROUTES");
  } else if (!noindex) {
    fail(where, "404 page should carry noindex");
  }

  // Scripts: only external files and JSON-LD; no inline code, no event handler attributes.
  for (const m of src.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    const attrs = m[1];
    const type = attr(attrs, "type");
    if (type === "application/ld+json") {
      try {
        JSON.parse(m[2]);
      } catch {
        fail(where, "JSON-LD does not parse");
      }
    } else if (!attr(attrs, "src")) {
      fail(where, "inline executable <script>");
    } else if (m[2].trim()) {
      fail(where, "<script src> with content");
    }
  }
  if (/\son[a-z]+="/i.test(src.replace(/<script\b[\s\S]*?<\/script>/g, ""))) fail(where, "inline event handler");
  if (/\sstyle="/i.test(src)) fail(where, "inline style attribute");

  // Images need alt text and must exist.
  for (const m of src.matchAll(/<img\b[^>]*>/g)) {
    if (attr(m[0], "alt") === undefined) fail(where, `image without alt: ${m[0].slice(0, 80)}`);
    const imgSrc = attr(m[0], "src");
    if (imgSrc?.startsWith("/") && !existsSync(fileFor(imgSrc))) fail(where, `image missing: ${imgSrc}`);
  }

  // Internal links and assets point at files that exist.
  for (const m of src.matchAll(/\s(?:href|src|srcset)="([^"]*)"/g)) {
    for (const candidate of m[1].split(",").map((part) => part.trim().split(/\s+/)[0])) {
      if (!candidate.startsWith("/") || candidate.startsWith("//")) continue;
      if (!existsSync(fileFor(candidate))) fail(where, `broken link: ${candidate}`);
      else if (!candidate.includes(".") && !candidate.split(/[?#]/)[0].endsWith("/"))
        fail(where, `link without trailing slash: ${candidate}`);
    }
  }

  // In-page anchors exist.
  for (const m of src.matchAll(/\shref="#([^"]+)"/g)) {
    if (!new RegExp(`\\sid="${m[1]}"`).test(src)) fail(where, `anchor #${m[1]} has no target`);
  }
}

// 3. Nothing unpublished, in any text file.
for (const file of files.filter((f) => /\.(html|xml|txt|js|css|json|svg)$/.test(f))) {
  const src = readFileSync(file, "utf8");
  const words = new Set(src.toLowerCase().match(/[a-z]+/g) ?? []);
  if ([...words].some((word) => UNPUBLISHED.has(sha256(word)))) fail(relative(DIST, file), "names a project that is not public yet");
}

// 4. Sitemap lists every indexable page and nothing else.
const sitemapFiles = files.filter((f) => /sitemap-\d+\.xml$/.test(f));
const listed = new Set(
  sitemapFiles.flatMap((f) => [...readFileSync(f, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])),
);
for (const pair of Object.values(ROUTES)) {
  for (const p of [pair.en, pair.de]) {
    const url = new URL(p, SITE).href;
    const shouldList = !NOINDEX_PATHS.includes(p);
    if (shouldList !== listed.has(url)) fail("sitemap", shouldList ? `${url} is missing` : `${url} should not be listed`);
  }
}
for (const url of listed) {
  const p = new URL(url).pathname;
  if (!Object.values(ROUTES).some((pair) => pair.en === p || pair.de === p)) fail("sitemap", `unexpected ${url}`);
}

// 5. robots.txt points at the sitemap.
const robots = readFileSync(join(DIST, "robots.txt"), "utf8");
if (!robots.includes(`Sitemap: ${SITE}/sitemap-index.xml`)) fail("robots.txt", "no Sitemap line");

if (errors.length) {
  console.error(`check-dist: ${errors.length} problem(s)\n` + errors.map((e) => `  - ${e}`).join("\n"));
  process.exit(1);
}
console.log(`check-dist: ${html.length} pages, ${listed.size} sitemap entries, all good`);
