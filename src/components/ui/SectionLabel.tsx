export default function SectionLabel({ children, className = "" }: { children: string; className?: string }) {
  return (
    <p className={`type-eyebrow flex items-center gap-3 ${className}`}>
      <span className="size-1.5 rounded-full bg-saffron" />
      {children}
    </p>
  );
}
