// Shared classes for light-background forms (contact, booking). The dark enquiry form keeps its own.
export const fieldClass =
  "w-full rounded-thumb border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-stone/60 focus:border-navy";
export const labelClass = "type-eyebrow mb-2 block text-stone";

/** Pill-shaped radio/checkbox: the input is visually hidden and the label restyles when it's checked. */
export const pillClass =
  "cursor-pointer rounded-full border border-ink/15 px-4 py-2 text-sm font-medium transition-colors hover:border-navy has-[:checked]:border-navy has-[:checked]:bg-navy has-[:checked]:text-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-saffron";
