// SPDX-License-Identifier: Apache-2.0
// Which tools a tool page points to: the ones that belong together come first.
import type { CollectionEntry } from "astro:content";

const PAIRS: Record<string, string[]> = {
  "cockpit-cronjobs": ["cockpit-image-update-monitor", "home-assistant-theme"],
  "cockpit-image-update-monitor": ["cockpit-cronjobs", "home-assistant-theme"],
  stellwerk: ["lautwerk", "cockpit-cronjobs"],
  lautwerk: ["stellwerk", "home-assistant-theme"],
  "home-assistant-theme": ["cockpit-cronjobs", "cockpit-image-update-monitor"],
};

export function related(slug: string, entries: CollectionEntry<"tools">[]) {
  return (PAIRS[slug] ?? [])
    .map((other) => entries.find((e) => e.data.slug === other))
    .filter((e): e is CollectionEntry<"tools"> => Boolean(e));
}
