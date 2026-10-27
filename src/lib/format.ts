export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
export const metres = (n: number) => `${n.toLocaleString("en-US")} m`;

/** [5,6,7,8,9] → "May – Sep"; split seasons → "Mar – May, Oct – Dec". */
export function monthRange(months: number[]) {
  const runs: number[][] = [];
  for (const m of [...months].sort((a, b) => a - b)) {
    const last = runs.at(-1);
    if (last && last.at(-1) === m - 1) last.push(m);
    else runs.push([m]);
  }
  return runs.map((r) => (r.length === 1 ? MONTHS[r[0] - 1] : `${MONTHS[r[0] - 1]} – ${MONTHS[r.at(-1)! - 1]}`)).join(", ");
}

/** "2027-05-04" → "Tue, 4 May 2027" — pinned to UTC so server and client agree. */
export const longDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
