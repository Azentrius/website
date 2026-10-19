---
slug: home-assistant-theme
lang: en
title: Azentrius Theme – Home Assistant theme in ink and gold
description: "Open-source Home Assistant theme in ink, paper and gold, set in DM Sans. Light and dark follow your profile. Install with HACS or by hand."
eyebrow: Theme for Home Assistant
h1: A Home Assistant theme in ink, paper and gold
lead: "Set in DM Sans, light or dark as your profile says. Device colours, sizes and icons stay as Home Assistant draws them."
summary: A Home Assistant theme in ink, paper and gold, set in DM Sans, for light and dark mode.
platforms: ["Home Assistant 2026.10+", "HACS"]
problemTitle: One look, checked, instead of dozens of variables.
problem:
  - "Colours and type come from a tested design system instead of dozens of variables set by hand."
  - "The contrast of every colour pair is checked in both modes."
  - "The fonts come from your own Home Assistant, not from someone else's server."
features:
  - title: Action colour
    text: "Ink in light mode, gold in dark mode, for buttons, switches, sliders, tabs and the selected sidebar entry."
  - title: Surfaces
    text: "Header and sidebar sit on the page ground. Cards are flat with a thin border and a 16 px radius; dialogs have 24 px."
  - title: Text, lines and focus
    text: "Warm greys for secondary text and borders, a bronze or gold focus ring and links."
  - title: Status
    text: "Success, warning, error and information in the design system's colours. Gold is never a status."
  - title: Type
    text: "DM Sans for the interface, Red Hat Mono for code, once you add the fonts."
keeps:
  title: What stays Home Assistant's
  text: "The colours of device states (amber for a light that is on, orange for heating, blue for cooling and so on), sizes and spacing, icons and texts. The theme only sets values; it adds no content. In HACS and in your profile, it is called simply Azentrius."
security:
  - "Your own Home Assistant serves the fonts under /local/; nothing is loaded from anywhere else."
  - "Every release has SHA256SUMS and a signed build provenance from the repository's release workflow."
requirements:
  - "Home Assistant 2026.10 or newer (tested with 2026.10, frontend 20260930.4)"
  - "HACS, or access to the configuration folder for installing by hand"
faq:
  - q: Does it change the colours of my devices?
    a: "No. Device states keep Home Assistant's colours."
  - q: Why is it called Azentrius in HACS?
    a: "That is the name you pick it by in your profile and with frontend.set_theme. Azentrius Theme is the product name."
  - q: Does it load fonts from the internet?
    a: "No. Your own Home Assistant serves them under /local/. Without them, your system's sans-serif is used."
  - q: Can I make it the default for everyone?
    a: "Yes, with the action frontend.set_theme and name: Azentrius. A choice in a profile wins over the default."
  - q: Does it work in light and dark mode?
    a: "Yes. Both follow the setting in your profile."
  - q: Will it break after an update?
    a: "It can: besides the official theme variables, it sets newer ones that may change with a frontend update. It is tested with 2026.10; please report problems as an issue."
alt:
  light: "Analytics settings in light mode: a white card on paper, switches in ink"
  dark: "Analytics settings in dark mode: a dark card on ink, switches in gold"
  light-dialog: "Dialog for a new dashboard in light mode, with text fields and switches"
  dark-dialog: "Dialog for a new dashboard in dark mode, with text fields and switches"
primaryAction:
  label: Install the theme
  href: "#install"
notes:
  - "Azentrius Theme is an independent project and not affiliated with Home Assistant or the Open Home Foundation."
updated: 2026-10-19
---

### With HACS

1. In HACS, open the menu, choose **Custom repositories** and add `https://github.com/Azentrius/home-assistant-theme` with the type **Theme**.
2. Download **Azentrius**.
3. Make sure `configuration.yaml` loads the themes folder:

```yaml
frontend:
  themes: !include_dir_merge_named themes
```

4. Run the action **Home Assistant Frontend: Reload themes**, or restart Home Assistant if you just added the line.
5. Pick **Azentrius** under **Profile › Theme**.

### The fonts

HACS installs only the theme file. For DM Sans, copy `www/azentrius/` from the release archive to `/config/www/azentrius/`, load its script and restart Home Assistant:

```yaml
frontend:
  extra_module_url:
    - /local/azentrius/azentrius.js
```

### By hand

Download the archive and `SHA256SUMS` from the [latest release](https://github.com/Azentrius/home-assistant-theme/releases/latest), check them and unpack the archive into `/config`:

```sh
sha256sum --ignore-missing -c SHA256SUMS
gh attestation verify azentrius-home-assistant-theme-VERSION.zip --repo Azentrius/home-assistant-theme
```
