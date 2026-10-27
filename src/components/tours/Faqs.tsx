import { Plus } from "@/components/ui/Icons";

/** Native <details> accordion — works without JavaScript. */
export default function Faqs({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-mist border-y border-mist">
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-medium tracking-tight transition-colors hover:text-navy [&::-webkit-details-marker]:hidden">
            {f.q}
            <span className="grid size-9 shrink-0 place-items-center rounded-full border border-mist transition-all duration-500 ease-expo group-open:rotate-45 group-open:border-navy group-open:bg-navy group-open:text-white">
              <Plus className="size-4" />
            </span>
          </summary>
          <p className="max-w-2xl pb-6 leading-relaxed text-stone">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
