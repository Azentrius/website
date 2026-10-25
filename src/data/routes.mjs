// SPDX-License-Identifier: Apache-2.0
// Every page that exists in both languages, by key. The language switch and hreflang use these pairs,
// so a page always points at its counterpart, never at the other language's start page.

export const SITE = "https://azentrius.com";

export const TOOL_SLUGS = [
  "cockpit-cronjobs",
  "cockpit-image-update-monitor",
  "cockpit-update-gaps",
  "cockpit-security-monitor",
  "cockpit-status-board",
  "cockpit-host-settings",
  "stellwerk",
  "lautwerk",
  "sharewerk",
  "home-assistant-theme",
];

const pairs = {
  home: { en: "/", de: "/de/" },
  projects: { en: "/projects/", de: "/de/projects/" },
  legal: { en: "/legal-notice/", de: "/de/impressum/" },
  privacy: { en: "/privacy/", de: "/de/datenschutz/" },
};
for (const slug of TOOL_SLUGS) pairs[slug] = { en: `/${slug}/`, de: `/de/${slug}/` };

export const ROUTES = pairs;

/** Paths that carry noindex and stay out of the sitemap. */
export const NOINDEX_PATHS = [];

/** The path of a page in a language. */
export function path(key, lang) {
  const pair = ROUTES[key];
  if (!pair) throw new Error(`Unknown page key: ${key}`);
  return pair[lang];
}
