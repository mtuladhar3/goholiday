import { Star } from "./Icons";

export default function StarRating({ value, className = "" }: { value: number; className?: string }) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`Rated ${value} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`size-3.5 ${i < value ? "text-gold" : "opacity-20"}`} />
      ))}
    </div>
  );
}
