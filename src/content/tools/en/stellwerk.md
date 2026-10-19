---
slug: stellwerk
lang: en
title: "Stellwerk: approve Claude Code permissions on a desk display"
description: "A local desk display for Claude Code and Codex: every session at a glance, permission requests with full input, allow or deny on a second screen."
eyebrow: A signal box for your AI agents
h1: Approve Claude Code and Codex requests on a second screen
lead: "Every running Claude Code and Codex session on a wide second screen. Permission requests show their complete input and can be allowed or denied right there; the app keeps working, and whoever decides first counts."
summary: A local desk display for Claude Code and Codex sessions and their permission requests, for a wide second screen.
platforms: ["Windows 10 & 11", "Claude Code", "Codex"]
problemTitle: Long runs stop at a window you cannot see.
problem:
  - "Long agent runs stop at a permission request whose window happens to be hidden."
  - "Several sessions at once are hard to keep track of."
  - "Automatic approvals save clicks, but cost control."
features:
  - title: Every session at a glance
    text: "Name, project and status of each session, the number of running subagents and how full its context is. The most urgent first."
  - title: Requests with their full input
    text: "A shell command in full, a file change with path and content, an MCP call with server, tool and parameters. Allow, deny, or leave it to the app."
  - title: The app works as before
    text: "The Claude app shows its own card at the same time; whoever decides first counts. After 60 seconds without a decision, the request goes back to the app."
  - title: What waits for you
    text: "Questions and input the agents wait for in the app are listed with how long they have been waiting."
  - title: If you like
    text: "Open pull requests with their Actions runs, hardware load and temperature, your Uptime Kuma monitors and how much of your plans' limits is used."
  - title: Local only
    text: "The hub listens on 127.0.0.1 and nowhere else. The display loads nothing from the internet."
explainer:
  title: How a request goes
  head: ["Step", "What happens"]
  rows:
    - ["1", "Claude Code asks for a permission and sends the request to the Stellwerk hub through a hook."]
    - ["2", "The display shows it as a card; the Claude app shows its own at the same time."]
    - ["3", "Whoever decides first, display or app, counts."]
    - ["4", "Without a decision on the display within 60 seconds, the request goes back to the app. If the hub is not running, Claude Code simply asks in the app."]
security:
  - "Fixed address 127.0.0.1, plus a Windows Firewall rule as a second layer."
  - "Every hook request needs a token; the display signs in before it gets anything."
  - "Nothing is allowed automatically: no rules, no \"always allow\"."
  - "Connections to other machines only to api.github.com and your Uptime Kuma, each only once you set it up."
requirements:
  - "Windows 10 or 11"
  - "Node.js 24 (LTS)"
  - "Claude Code: the Claude desktop app or the command line"
  - "Codex, if you like: the Codex app"
  - "Microsoft Edge or another Chromium browser for the display"
faq:
  - q: Does it work with the Claude desktop app?
    a: "Yes, with Claude Code in the desktop app and on the command line. The app shows its own card, and the first decision counts."
  - q: Does it work with Codex?
    a: "Yes, with the Codex app, after stellwerk codex install. A Codex request waits on the display for 30 seconds and then goes to the app, because the app shows its own card only after that; “In the app” hands it over at once."
  - q: What happens if the hub is not running?
    a: "Claude Code simply asks in the app, without error messages."
  - q: Can it allow requests automatically?
    a: "No. There are no rules and no \"always allow\"."
  - q: Which display do I need?
    a: "It is made for 1920×720 and ready for touch; one factor scales every size for other screens."
  - q: Does it run on macOS or Linux?
    a: "Not yet: Windows 10 and 11 only."
  - q: Does it send data to the internet?
    a: "No, except to api.github.com for pull requests and to your own Uptime Kuma, each only if you set it up."
compare: "Other tools bring approvals to the phone or by push, some with automatic approval. Stellwerk stays on your desk and on your machine, and approves nothing on its own."
alt:
  display: "The Stellwerk display at 1920×720: sessions with how full their context is, the requests waiting next to them, Uptime Kuma monitors, clock, hub, hardware and plan usage"
primaryAction:
  label: Download Stellwerk
  href: "https://github.com/Azentrius/stellwerk/releases/latest"
notes:
  - "Stellwerk is an independent project and not affiliated with Anthropic or OpenAI. Claude Code and Codex name what Stellwerk works with."
  - "The Stellwerk sign is a mark of Azentrius and is not licensed under the Apache License."
updated: 2026-10-19
---

### From a release

Download `stellwerk-VERSION.zip` and `SHA256SUMS` from the [latest release](https://github.com/Azentrius/stellwerk/releases/latest). In PowerShell, with the version you downloaded:

```powershell
(Get-FileHash stellwerk-VERSION.zip).Hash    # must match the line in SHA256SUMS
gh attestation verify stellwerk-VERSION.zip --repo Azentrius/stellwerk
Expand-Archive stellwerk-VERSION.zip -DestinationPath .
cd stellwerk-VERSION
npm ci --omit=dev
npm link
```

### Connect Claude Code

1. Start the hub: `stellwerk serve`. On its first start it creates the token for the hooks.
2. Connect Claude Code: `stellwerk hooks install`. It shows what it adds to your settings and asks before writing.
3. Restart the Claude desktop app and any terminals that run Claude Code.
4. Once, as administrator: `stellwerk install` adds the firewall rule.
5. Open the display on the second screen. To start everything with Windows: `stellwerk autostart install`.

### Connect Codex (optional)

Stellwerk shows the sessions of the Codex app too, marked "Codex", and answers their approvals on the display:

```powershell
stellwerk codex install
```

It shows what it adds to Codex' hooks and asks before writing. Restart the Codex app and allow the new hooks there: the hook symbol in its input field opens **Review hooks**. Codex runs hooks only after that.

How Codex differs from Claude Code:

- The Codex app shows its own approval card only after Stellwerk has answered. So a Codex request waits on the display for 30 seconds (adjustable from 10 to 35) and then goes to the app; **In the app** hands it over at once.
- With "Approve for me", Codex' own reviewer decides; Stellwerk then holds nothing and shows no card.
- If the hub is not running, Codex asks as usual.

`stellwerk codex uninstall` removes exactly these hooks. The [README](https://github.com/Azentrius/stellwerk#installation) covers the rest: pull requests, hardware values and Uptime Kuma.
