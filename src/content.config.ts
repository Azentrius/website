// SPDX-License-Identifier: Apache-2.0
// The content model. The build fails when a required field is missing or a title or description is
// too long for a search result (title 60, description 155 characters).
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const seo = {
  title: z.string().min(10).max(60),
  description: z.string().min(50).max(155),
};

const tools = defineCollection({
  // The id is the file path ("de/stellwerk"), not the slug field: both languages share a slug.
  loader: glob({
    pattern: "*/*.md",
    base: "./src/content/tools",
    generateId: ({ entry }) => entry.replace(/\.md$/, ""),
  }),
  schema: z.object({
    ...seo,
    slug: z.enum([
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
    ]),
    lang: z.enum(["en", "de"]),
    eyebrow: z.string().max(40),
    h1: z.string().max(90),
    lead: z.string().max(320),
    /** One sentence for the project cards. */
    summary: z.string().max(160),
    platforms: z.array(z.string()).min(1),
    /** Shown right under the H1 when set, e.g. the prototype notice. */
    notice: z.string().optional(),
    problemTitle: z.string().optional(),
    problem: z.array(z.string()).min(1).max(3),
    features: z.array(z.object({ title: z.string(), text: z.string() })).min(3).max(6),
    explainer: z
      .object({
        title: z.string(),
        intro: z.string().optional(),
        head: z.tuple([z.string(), z.string()]).optional(),
        rows: z.array(z.tuple([z.string(), z.string()])).min(1),
      })
      .optional(),
    keeps: z.object({ title: z.string(), text: z.string() }).optional(),
    security: z.array(z.string()).min(1),
    requirements: z.array(z.string()).min(1),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).min(3),
    compare: z.string().optional(),
    alt: z.record(z.string(), z.string()),
    primaryAction: z.object({ label: z.string(), href: z.string() }),
    notes: z.array(z.string()).default([]),
    updated: z.coerce.date(),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: "*/*.md", base: "./src/content/legal" }),
  schema: z.object({
    ...seo,
    page: z.enum(["legal", "privacy"]),
    lang: z.enum(["en", "de"]),
    eyebrow: z.string(),
    h1: z.string(),
    subtitle: z.string(),
    updated: z.coerce.date(),
  }),
});

export const collections = { tools, legal };
