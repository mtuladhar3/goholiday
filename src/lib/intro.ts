export const INTRO_EVENT = "goholiday:intro";

/** Runs `cb` once the preloader has lifted (immediately if it already has). Returns a cleanup. */
export function onIntro(cb: () => void) {
  if (document.documentElement.dataset.intro === "done") {
    cb();
    return () => {};
  }
  window.addEventListener(INTRO_EVENT, cb, { once: true });
  return () => window.removeEventListener(INTRO_EVENT, cb);
}

export function completeIntro() {
  document.documentElement.dataset.intro = "done";
  window.dispatchEvent(new Event(INTRO_EVENT));
}
