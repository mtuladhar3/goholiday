import type { LegalDocument } from "@/data/legal";
import { ArrowUpRight, Document } from "@/components/ui/Icons";

/** Certificate-style card: inset rule, a seal that turns on hover, and the key registration details. */
export default function DocumentCard({ doc }: { doc: LegalDocument }) {
  const sealId = `seal-${doc.title.toLowerCase().replace(/\W+/g, "-")}`;
  return (
    <article className="group relative flex flex-col rounded-card border border-ink/10 bg-paper p-2 transition-colors duration-500 hover:border-navy">
      <div className="flex flex-1 flex-col rounded-thumb border border-dashed border-ink/15 p-5">
        <div className="flex items-start justify-between gap-4">
          <span className="rounded-full bg-paper-deep px-3 py-1.5 text-xs font-medium">{doc.kind}</span>
          <svg viewBox="0 0 100 100" aria-hidden className="size-16 shrink-0 text-saffron transition-transform duration-1000 ease-expo group-hover:rotate-90">
            <defs>
              <path id={sealId} d="M50 50m-34 0a34 34 0 1 1 68 0a34 34 0 1 1 -68 0" />
            </defs>
            <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="24" fill="currentColor" opacity="0.12" />
            <text fontSize="10" fill="currentColor" fontWeight="600" letterSpacing="2">
              <textPath href={`#${sealId}`}>VERIFIED • ON FILE • </textPath>
            </text>
            <path d="m41 50 6 6 12-12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h3 className="mt-6 text-xl font-medium leading-snug tracking-tight">{doc.title}</h3>
        <p className="mt-1.5 flex-1 text-sm text-stone">{doc.issuer}</p>

        <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-ink/10 pt-4 text-sm">
          {[
            ["Registration no.", doc.number],
            ["Since", doc.issued],
            ["Validity", doc.validUntil],
          ].map(([label, value], i) => (
            <div key={label} className={i === 0 ? "col-span-2" : ""}>
              <dt className="text-[11px] uppercase tracking-[0.15em] text-stone">{label}</dt>
              <dd className="mt-1 font-medium tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>

        <a
          href={doc.file}
          className="mt-6 flex items-center justify-between gap-3 rounded-full bg-paper-deep py-1.5 pl-4 pr-1.5 text-sm font-medium transition-colors duration-500 group-hover:bg-navy group-hover:text-white"
        >
          <span className="flex items-center gap-2">
            <Document className="size-4" /> View certificate
            <span className="sr-only">: {doc.title}</span>
          </span>
          <span className="grid size-8 place-items-center rounded-full bg-paper text-ink transition-transform duration-500 ease-expo group-hover:rotate-45">
            <ArrowUpRight className="size-4" />
          </span>
        </a>
      </div>
    </article>
  );
}
