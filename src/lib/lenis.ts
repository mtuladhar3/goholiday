import type Lenis from "lenis";

/** Shared handle so components (e.g. the menu overlay) can pause smooth scrolling. */
export const lenisRef: { current: Lenis | null } = { current: null };
