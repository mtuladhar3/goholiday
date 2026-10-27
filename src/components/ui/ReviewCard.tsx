import Image from "next/image";
import type { Review } from "@/data/reviews";
import StarRating from "./StarRating";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex w-[300px] shrink-0 flex-col justify-between gap-6 rounded-card border border-mist bg-paper p-6 sm:w-[400px]">
      <div>
        <StarRating value={review.rating} />
        <blockquote className="mt-4 text-base leading-relaxed tracking-tight sm:text-lg">“{review.text}”</blockquote>
      </div>
      <figcaption className="flex items-center gap-3 border-t border-mist pt-4">
        <span className="relative size-10 overflow-hidden rounded-full">
          <Image src={review.avatar} alt={review.name} fill sizes="40px" className="object-cover" />
        </span>
        <span className="text-sm">
          <span className="block font-medium">{review.name}</span>
          <span className="block text-stone">
            {review.country} · {review.trip}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
