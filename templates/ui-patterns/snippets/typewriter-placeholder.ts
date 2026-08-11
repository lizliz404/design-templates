/**
 * Rotating typewriter “placeholder” for empty inputs.
 * Overlay (not native placeholder) so we get a caret + clean pause-on-focus.
 * Narrow viewports can swap to a shorter phrase set to avoid clipping.
 */
export type TypewriterOpts = {
  typeMs?: number;
  deleteMs?: number;
  holdMs?: number;
  gapMs?: number;
  /** Shorter lines for small screens (recommended). */
  phrasesNarrow?: string[];
  /** Default: (max-width: 640px) */
  narrowQuery?: string;
  /** Extra random ms added while typing (default 36). 0 = off. */
  typeJitterMs?: number;
};

function cleanList(phrases: string[]): string[] {
  return phrases.map((p) => p.trim()).filter(Boolean);
}

export function attachTypewriterPlaceholder(
  input: HTMLInputElement,
  phrases: string[],
  opts: TypewriterOpts = {},
): () => void {
  const wide = cleanList(phrases);
  const narrow = cleanList(opts.phrasesNarrow ?? []);
  if (!wide.length) return () => {};

  const typeMs = opts.typeMs ?? 36;
  const deleteMs = opts.deleteMs ?? 20;
  const holdMs = opts.holdMs ?? 1600;
  const gapMs = opts.gapMs ?? 420;
  const typeJitterMs = opts.typeJitterMs ?? 36;
  const narrowQuery = opts.narrowQuery ?? "(max-width: 640px)";

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const parent = input.parentElement;
  if (!parent) return () => {};

  const wrap = document.createElement("div");
  wrap.className = "tw-ph-wrap";
  parent.insertBefore(wrap, input);
  wrap.append(input);

  const overlay = document.createElement("span");
  overlay.className = "tw-ph";
  overlay.setAttribute("aria-hidden", "true");
  const textEl = document.createElement("span");
  textEl.className = "tw-ph-text";
  const caret = document.createElement("span");
  caret.className = "tw-ph-caret";
  overlay.append(textEl, caret);
  wrap.append(overlay);

  // Stable a11y label; never cycle aria-label with the animation.
  if (!input.getAttribute("aria-label")) {
    input.setAttribute("aria-label", wide[0]);
  }
  input.placeholder = "";

  let list = wide;
  let i = 0;
  let char = 0;
  let deleting = false;
  let timer = 0;
  let stopped = false;

  const mql =
    typeof window !== "undefined" && narrow.length
      ? window.matchMedia(narrowQuery)
      : null;

  const pickList = (): string[] => {
    if (mql?.matches && narrow.length) return narrow;
    return wide;
  };

  const applyList = (next: string[], reset = false) => {
    if (next === list && !reset) return;
    list = next;
    if (reset) {
      i = 0;
      char = 0;
      deleting = false;
      textEl.textContent = "";
    } else {
      i = i % list.length;
      char = Math.min(char, list[i].length);
    }
  };

  applyList(pickList(), true);

  const syncVisibility = () => {
    const hide = Boolean(input.value) || document.activeElement === input;
    overlay.hidden = hide;
    wrap.classList.toggle("tw-ph-wrap--idle", hide);
  };

  const clear = () => {
    if (timer) window.clearTimeout(timer);
    timer = 0;
  };

  const schedule = (fn: () => void, ms: number) => {
    clear();
    timer = window.setTimeout(fn, ms);
  };

  const typeDelay = () =>
    typeMs + (typeJitterMs > 0 ? Math.floor(Math.random() * typeJitterMs) : 0);

  const tick = () => {
    if (stopped || !input.isConnected) return;
    if (document.hidden) {
      schedule(tick, 500);
      return;
    }
    syncVisibility();
    if (overlay.hidden) {
      schedule(tick, 350);
      return;
    }

    const phrase = list[i % list.length];

    if (!deleting) {
      char = Math.min(char + 1, phrase.length);
      textEl.textContent = phrase.slice(0, char);
      if (char >= phrase.length) {
        deleting = true;
        schedule(tick, holdMs);
        return;
      }
      schedule(tick, typeDelay());
      return;
    }

    char = Math.max(char - 1, 0);
    textEl.textContent = phrase.slice(0, char);
    if (char <= 0) {
      deleting = false;
      i = (i + 1) % list.length;
      schedule(tick, gapMs);
      return;
    }
    schedule(tick, deleteMs);
  };

  const onFocusBlur = () => {
    syncVisibility();
    if (!overlay.hidden && !timer) schedule(tick, 200);
  };

  const onNarrowChange = () => {
    applyList(pickList(), true);
    if (!reduced && !overlay.hidden) schedule(tick, 200);
    else if (reduced) textEl.textContent = list[0] ?? "";
  };

  input.addEventListener("focus", onFocusBlur);
  input.addEventListener("blur", onFocusBlur);
  input.addEventListener("input", syncVisibility);
  mql?.addEventListener?.("change", onNarrowChange);

  if (reduced) {
    textEl.textContent = list[0] ?? wide[0];
    caret.hidden = true;
    syncVisibility();
    return () => {
      stopped = true;
      clear();
      input.removeEventListener("focus", onFocusBlur);
      input.removeEventListener("blur", onFocusBlur);
      input.removeEventListener("input", syncVisibility);
      mql?.removeEventListener?.("change", onNarrowChange);
    };
  }

  syncVisibility();
  schedule(tick, 500);

  return () => {
    stopped = true;
    clear();
    input.removeEventListener("focus", onFocusBlur);
    input.removeEventListener("blur", onFocusBlur);
    input.removeEventListener("input", syncVisibility);
    mql?.removeEventListener?.("change", onNarrowChange);
  };
}
