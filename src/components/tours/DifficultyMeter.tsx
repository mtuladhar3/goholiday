import type { Difficulty } from "@/data/trips";

const levels: Difficulty[] = ["Easy", "Moderate", "Strenuous"];

/** Three rising bars, filled up to the trip's grade. */
export default function DifficultyMeter({ value, className = "" }: { value: Difficulty; className?: string }) {
  const level = levels.indexOf(value);
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="flex items-end gap-0.5" aria-hidden>
        {levels.map((l, i) => (
          <span key={l} className={`w-1 rounded-full ${i <= level ? "bg-saffron" : "bg-current opacity-20"}`} style={{ height: 6 + i * 4 }} />
        ))}
      </span>
      {value}
    </span>
  );
}
