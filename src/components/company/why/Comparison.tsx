import { comparison } from "@/data/whyTravel";
import { Check, Minus } from "@/components/ui/Icons";
import Reveal from "@/components/animations/Reveal";

/** Side-by-side table; below `sm` each row stacks the topic above its two answers. */
export default function Comparison() {
  return (
    <Reveal>
      <table className="w-full border-separate border-spacing-0 text-left">
        <thead>
          <tr className="grid grid-cols-2 sm:table-row">
            <th className="hidden sm:table-cell sm:w-1/3" />
            <th scope="col" className="rounded-t-card bg-navy px-5 pb-4 pt-6 text-white">
              <span className="type-eyebrow text-white/60">With us</span>
              <span className="mt-1 block text-xl font-medium tracking-tight">GoHoliday</span>
            </th>
            <th scope="col" className="px-5 pb-4 pt-6">
              <span className="type-eyebrow text-stone">Elsewhere</span>
              <span className="mt-1 block text-xl font-medium tracking-tight text-stone">Typical reseller</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {comparison.map((row, i) => {
            const last = i === comparison.length - 1;
            return (
              <tr key={row.topic} className="grid grid-cols-2 sm:table-row">
                <th scope="row" className="col-span-2 border-t border-ink/15 pb-2 pt-5 text-sm font-medium sm:py-5 sm:pr-6 sm:text-base">
                  {row.topic}
                </th>
                <td className={`bg-navy px-5 pb-5 pt-2 text-white sm:border-t sm:border-white/15 sm:py-5 ${last ? "rounded-b-card" : ""}`}>
                  <span className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gold text-navy">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {row.us}
                  </span>
                </td>
                <td className="px-5 pb-5 pt-2 text-stone sm:border-t sm:border-ink/15 sm:py-5">
                  <span className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-ink/10">
                      <Minus className="size-3" strokeWidth={3} />
                    </span>
                    {row.them}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Reveal>
  );
}
