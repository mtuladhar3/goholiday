export type Token = { text: string; em: boolean; trail: string };

/**
 * Splits a line into words, tracking *emphasis* that may span several words:
 * "a *local expert*." → a | local(em) | expert(em) + "."
 */
export function tokenize(line: string): Token[] {
  let open = false;
  return line
    .split(" ")
    .filter(Boolean)
    .map((raw) => {
      let text = raw;
      let em = open;
      if (text.startsWith("*")) {
        em = true;
        open = true;
        text = text.slice(1);
      }
      let trail = "";
      const close = text.match(/\*([.,!?:;—]*)$/);
      if (close) {
        trail = close[1];
        text = text.slice(0, -close[0].length);
        open = false;
      }
      return { text, em, trail };
    });
}
