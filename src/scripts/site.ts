// SPDX-License-Identifier: Apache-2.0
// Copy buttons: on blocks from CopyBlock.astro, and added to every code block in the installation
// text of a tool page. Counts "Command copied" in Plausible if it is loaded.

type Plausible = (event: string, options?: { props?: Record<string, string> }) => void;

function track(name: string) {
  const plausible = (window as unknown as { plausible?: Plausible }).plausible;
  if (typeof plausible === "function") plausible("Command copied", { props: { block: name, page: location.pathname } });
}

async function copy(button: HTMLButtonElement, text: string) {
  const label = button.textContent ?? "";
  try {
    await navigator.clipboard.writeText(text);
    button.textContent = button.dataset.copied ?? "Copied";
    track(button.dataset.copyName ?? "code");
  } catch {
    button.textContent = button.dataset.failed ?? "Select and copy";
  }
  window.setTimeout(() => (button.textContent = label), 2000);
}

function wire(button: HTMLButtonElement, code: HTMLElement) {
  button.addEventListener("click", () => copy(button, code.innerText.replace(/\n$/, "")));
}

for (const button of document.querySelectorAll<HTMLButtonElement>("[data-copy]")) {
  const code = button.parentElement?.querySelector("code");
  if (code) wire(button, code);
}

const template = document.querySelector<HTMLButtonElement>("[data-copy-template]");
for (const pre of document.querySelectorAll<HTMLPreElement>(".prose pre")) {
  const code = pre.querySelector("code");
  if (!code || !template) continue;
  const wrapper = document.createElement("div");
  wrapper.className = "copy";
  pre.replaceWith(wrapper);
  wrapper.append(pre);
  const button = template.cloneNode(true) as HTMLButtonElement;
  button.hidden = false;
  button.removeAttribute("data-copy-template");
  button.dataset.copyName = template.dataset.copyName ?? "install";
  wrapper.append(button);
  wire(button, code);
}
