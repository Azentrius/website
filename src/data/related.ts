// SPDX-License-Identifier: Apache-2.0
// Which tools a tool page points to: the ones that belong together come first.
import type { CollectionEntry } from "astro:content";

const PAIRS: Record<string, string[]> = {
  "cockpit-cronjobs": ["cockpit-image-update-monitor", "cockpit-status-board", "cockpit-host-settings"],
  "cockpit-image-update-monitor": ["cockpit-update-gaps", "cockpit-cronjobs"],
  "cockpit-update-gaps": ["cockpit-security-monitor", "cockpit-image-update-monitor", "cockpit-status-board"],
  "cockpit-security-monitor": ["cockpit-update-gaps", "cockpit-image-update-monitor", "cockpit-status-board"],
  "cockpit-status-board": ["cockpit-host-settings", "cockpit-update-gaps", "cockpit-security-monitor"],
  "cockpit-host-settings": ["cockpit-status-board", "cockpit-security-monitor", "cockpit-update-gaps"],
  stellwerk: ["lautwerk", "cockpit-cronjobs"],
  lautwerk: ["stellwerk", "sharewerk"],
  sharewerk: ["lautwerk", "stellwerk"],
  "home-assistant-theme": ["cockpit-cronjobs", "cockpit-image-update-monitor"],
};

export function related(slug: string, entries: CollectionEntry<"tools">[]) {
  return (PAIRS[slug] ?? [])
    .map((other) => entries.find((e) => e.data.slug === other))
    .filter((e): e is CollectionEntry<"tools"> => Boolean(e));
}
