import Link from "next/link";

type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.15em]">
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-2">
            {i > 0 && <span className="size-1 rounded-full bg-current opacity-40" aria-hidden />}
            {c.href ? (
              <Link href={c.href} className="opacity-70 transition-opacity hover:opacity-100">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
