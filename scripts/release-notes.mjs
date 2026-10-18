// SPDX-License-Identifier: Apache-2.0
// Prints the section of CHANGELOG.md for one version ("## 0.1.0 – 2026-10-20" up to the next "## ").
// With --require-date a section without a date ("not released yet") counts as missing.
// Exits with 1 when there is no such section.
//
// Usage: node scripts/release-notes.mjs VERSION [--require-date]
import { readFileSync } from "node:fs";

const HEADING = /^## +\[?([^\]\s]+)\]?(?:\s+[–-]\s+(.*))?$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

const [version, ...flags] = process.argv.slice(2);
if (!version) {
  console.error("usage: node scripts/release-notes.mjs VERSION [--require-date]");
  process.exit(2);
}
const requireDate = flags.includes("--require-date");
const lines = readFileSync(new URL("../CHANGELOG.md", import.meta.url), "utf8").replace(/\r\n/g, "\n").split("\n");
const start = lines.findIndex((line) => {
  const match = HEADING.exec(line);
  return match?.[1] === version && (!requireDate || DATE.test((match[2] ?? "").trim()));
});
if (start < 0) process.exit(1);
const next = lines.findIndex((line, i) => i > start && line.startsWith("## "));
const body = lines.slice(start + 1, next < 0 ? undefined : next);
while (body.length && !body[0].trim()) body.shift();
while (body.length && !body.at(-1).trim()) body.pop();
process.stdout.write(`${body.join("\n")}\n`);
