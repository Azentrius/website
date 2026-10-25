// SPDX-License-Identifier: Apache-2.0
// What every tool page shares in both languages: repository, product name, status, platforms and
// pictures. The texts are in src/content/tools/<lang>/<slug>.md.
import type { ImageMetadata } from "astro";

import cronOverview from "../assets/screenshots/cockpit-cronjobs/overview.png";
import cronOverviewDark from "../assets/screenshots/cockpit-cronjobs/overview-dark.png";
import cronRunNow from "../assets/screenshots/cockpit-cronjobs/run-now.png";
import cronRuns from "../assets/screenshots/cockpit-cronjobs/runs.png";
import cronConvert from "../assets/screenshots/cockpit-cronjobs/convert.png";
import cronBackups from "../assets/screenshots/cockpit-cronjobs/backups.png";
import iumUpdates from "../assets/screenshots/cockpit-image-update-monitor/updates.png";
import iumUpdatesDark from "../assets/screenshots/cockpit-image-update-monitor/updates-dark.png";
import iumDialog from "../assets/screenshots/cockpit-image-update-monitor/update-dialog.png";
import iumDone from "../assets/screenshots/cockpit-image-update-monitor/update-done.png";
import iumBackups from "../assets/screenshots/cockpit-image-update-monitor/backups.png";
import iumVersion from "../assets/screenshots/cockpit-image-update-monitor/version-dialog.png";
import gapsOverview from "../assets/screenshots/cockpit-update-gaps/overview.png";
import gapsOverviewDark from "../assets/screenshots/cockpit-update-gaps/overview-dark.png";
import gapsUpkeep from "../assets/screenshots/cockpit-update-gaps/upkeep.png";
import gapsAccepted from "../assets/screenshots/cockpit-update-gaps/accepted.png";
import secExposure from "../assets/screenshots/cockpit-security-monitor/exposure.png";
import secExposureDark from "../assets/screenshots/cockpit-security-monitor/exposure-dark.png";
import secSsh from "../assets/screenshots/cockpit-security-monitor/ssh.png";
import secContainers from "../assets/screenshots/cockpit-security-monitor/containers.png";
import secMarkDialog from "../assets/screenshots/cockpit-security-monitor/mark-dialog.png";
import hostOverview from "../assets/screenshots/cockpit-host-settings/overview.png";
import hostOverviewDark from "../assets/screenshots/cockpit-host-settings/overview-dark.png";
import hostNtfy from "../assets/screenshots/cockpit-host-settings/ntfy.png";
import hostCheck from "../assets/screenshots/cockpit-host-settings/check-dialog.png";
import hostAddons from "../assets/screenshots/cockpit-host-settings/addons.png";
import stellwerkDisplay from "../assets/screenshots/stellwerk/display.png";
import themeLight from "../assets/screenshots/home-assistant-theme/light.png";
import themeDark from "../assets/screenshots/home-assistant-theme/dark.png";
import themeLightDialog from "../assets/screenshots/home-assistant-theme/light-dialog.png";
import themeDarkDialog from "../assets/screenshots/home-assistant-theme/dark-dialog.png";
import lautwerkIcon from "../assets/icons/lautwerk.svg";
import sharewerkIcon from "../assets/icons/sharewerk.svg";

export type ToolSlug =
  | "cockpit-cronjobs"
  | "cockpit-image-update-monitor"
  | "cockpit-update-gaps"
  | "cockpit-security-monitor"
  | "cockpit-status-board"
  | "cockpit-host-settings"
  | "stellwerk"
  | "lautwerk"
  | "sharewerk"
  | "home-assistant-theme";

export type Category = "cockpit" | "desktop" | "android" | "home-assistant";

/** A picture in the gallery; the alt text comes from the page content, by key. */
export interface Shot {
  key: string;
  image: ImageMetadata;
  dark?: ImageMetadata;
}

export interface Tool {
  slug: ToolSlug;
  repo: string;
  /** The product name as the design system sets it: base, then either the gold dot or an italic suffix. */
  name: { base: string; suffix?: string; dot?: boolean };
  plainName: string;
  category: Category;
  status: "stable" | "prototype";
  license: string;
  /** Distribution package, if there is one. */
  package?: string;
  hero?: Shot;
  /** Light and dark side by side instead of one picture that follows the device. */
  heroPair?: boolean;
  /** The app's sign, shown next to the hero text of a project without screenshots (alt text: key "icon"). */
  icon?: ImageMetadata;
  gallery: Shot[];
  docs: { changelog: boolean; roadmap: boolean; security: boolean };
}

export const TOOLS: Tool[] = [
  {
    slug: "cockpit-cronjobs",
    repo: "Azentrius/cockpit-cronjobs",
    name: { base: "Cron Jobs", dot: true },
    plainName: "Cron Jobs",
    category: "cockpit",
    status: "stable",
    license: "Apache-2.0",
    package: "cockpit-cronjobs",
    hero: { key: "overview", image: cronOverview, dark: cronOverviewDark },
    gallery: [
      { key: "run-now", image: cronRunNow },
      { key: "runs", image: cronRuns },
      { key: "convert", image: cronConvert },
      { key: "backups", image: cronBackups },
    ],
    docs: { changelog: true, roadmap: true, security: true },
  },
  {
    slug: "cockpit-image-update-monitor",
    repo: "Azentrius/cockpit-image-update-monitor",
    name: { base: "Image Update", suffix: "Monitor" },
    plainName: "Image Update Monitor",
    category: "cockpit",
    status: "stable",
    license: "Apache-2.0",
    package: "cockpit-image-update-monitor",
    hero: { key: "updates", image: iumUpdates, dark: iumUpdatesDark },
    gallery: [
      { key: "update-dialog", image: iumDialog },
      { key: "update-done", image: iumDone },
      { key: "version-dialog", image: iumVersion },
      { key: "backups", image: iumBackups },
    ],
    docs: { changelog: true, roadmap: true, security: true },
  },
  {
    slug: "cockpit-update-gaps",
    repo: "Azentrius/cockpit-update-gaps",
    name: { base: "Update Gaps", dot: true },
    plainName: "Update Gaps",
    category: "cockpit",
    status: "stable",
    license: "Apache-2.0",
    package: "cockpit-update-gaps",
    hero: { key: "overview", image: gapsOverview, dark: gapsOverviewDark },
    gallery: [
      { key: "upkeep", image: gapsUpkeep },
      { key: "accepted", image: gapsAccepted },
    ],
    docs: { changelog: true, roadmap: false, security: true },
  },
  {
    slug: "cockpit-security-monitor",
    repo: "Azentrius/cockpit-security-monitor",
    name: { base: "Security", suffix: "Monitor" },
    plainName: "Security Monitor",
    category: "cockpit",
    status: "stable",
    license: "Apache-2.0",
    package: "cockpit-security-monitor",
    hero: { key: "exposure", image: secExposure, dark: secExposureDark },
    gallery: [
      { key: "ssh", image: secSsh },
      { key: "containers", image: secContainers },
      { key: "mark-dialog", image: secMarkDialog },
    ],
    docs: { changelog: true, roadmap: false, security: true },
  },
  {
    slug: "cockpit-status-board",
    repo: "Azentrius/cockpit-status-board",
    name: { base: "Status Board", dot: true },
    plainName: "Status Board",
    category: "cockpit",
    status: "stable",
    license: "Apache-2.0",
    package: "cockpit-status-board",
    // No screenshots: the ones in the repository show real host names.
    gallery: [],
    docs: { changelog: true, roadmap: false, security: true },
  },
  {
    slug: "cockpit-host-settings",
    repo: "Azentrius/cockpit-host-settings",
    name: { base: "Host Settings", dot: true },
    plainName: "Host Settings",
    category: "cockpit",
    status: "stable",
    license: "Apache-2.0",
    package: "cockpit-host-settings",
    hero: { key: "overview", image: hostOverview, dark: hostOverviewDark },
    gallery: [
      { key: "ntfy", image: hostNtfy },
      { key: "check-dialog", image: hostCheck },
      { key: "addons", image: hostAddons },
    ],
    docs: { changelog: true, roadmap: false, security: true },
  },
  {
    slug: "stellwerk",
    repo: "Azentrius/stellwerk",
    name: { base: "Stellwerk", dot: true },
    plainName: "Stellwerk",
    category: "desktop",
    status: "stable",
    license: "Apache-2.0",
    hero: { key: "display", image: stellwerkDisplay },
    gallery: [],
    docs: { changelog: true, roadmap: true, security: true },
  },
  {
    slug: "lautwerk",
    repo: "Azentrius/lautwerk",
    name: { base: "Lautwerk", dot: true },
    plainName: "Lautwerk",
    category: "android",
    status: "prototype",
    license: "Apache-2.0",
    icon: lautwerkIcon,
    gallery: [],
    docs: { changelog: true, roadmap: true, security: true },
  },
  {
    slug: "sharewerk",
    repo: "Azentrius/sharewerk",
    name: { base: "Sharewerk", dot: true },
    plainName: "Sharewerk",
    category: "android",
    status: "prototype",
    license: "Apache-2.0",
    icon: sharewerkIcon,
    gallery: [],
    docs: { changelog: true, roadmap: false, security: true },
  },
  {
    slug: "home-assistant-theme",
    repo: "Azentrius/home-assistant-theme",
    name: { base: "Azentrius", suffix: "Theme" },
    plainName: "Azentrius Theme",
    category: "home-assistant",
    status: "stable",
    license: "Apache-2.0",
    hero: { key: "light", image: themeLight, dark: themeDark },
    heroPair: true,
    gallery: [
      { key: "light-dialog", image: themeLightDialog },
      { key: "dark-dialog", image: themeDarkDialog },
    ],
    docs: { changelog: true, roadmap: false, security: true },
  },
];

export const CATEGORY_ORDER: Category[] = ["cockpit", "desktop", "android", "home-assistant"];

export function tool(slug: string): Tool {
  const found = TOOLS.find((entry) => entry.slug === slug);
  if (!found) throw new Error(`Unknown tool: ${slug}`);
  return found;
}

export function repoUrl(entry: Tool, file?: string): string {
  return file ? `https://github.com/${entry.repo}/blob/main/${file}` : `https://github.com/${entry.repo}`;
}
