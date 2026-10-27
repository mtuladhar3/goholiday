import { MONTHS } from "@/lib/format";

/** Twelve-month strip with the recommended travel months picked out. */
export default function BestMonths({ months }: { months: number[] }) {
  return (
    <div>
      <ol className="grid grid-cols-6 gap-1.5 sm:grid-cols-12">
        {MONTHS.map((m, i) => {
          const good = months.includes(i + 1);
          return (
            <li
              key={m}
              className={`flex flex-col items-center gap-3 rounded-thumb border px-1 pb-3 pt-4 text-xs font-medium ${good ? "border-navy bg-navy text-white" : "border-mist text-stone"}`}
            >
              <span className={`w-1.5 rounded-full ${good ? "h-8 bg-gold" : "h-3 bg-mist"}`} aria-hidden />
              {m}
              <span className="sr-only">{good ? "recommended" : "off season"}</span>
            </li>
          );
        })}
      </ol>
      <p className="mt-4 flex items-center gap-4 text-xs text-stone">
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-sm bg-navy" /> Best conditions
        </span>
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-sm border border-mist" /> Possible, quieter
        </span>
      </p>
    </div>
  );
}
