import { reviews } from "@/data/reviews";
import { partners } from "@/data/site";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import StarRating from "@/components/ui/StarRating";
import ReviewCard from "@/components/ui/ReviewCard";
import Marquee from "@/components/animations/Marquee";
import Reveal from "@/components/animations/Reveal";

export default function Testimonials() {
  const half = Math.ceil(reviews.length / 2);
  const rows = [reviews.slice(0, half), reviews.slice(half)];

  return (
    <section id="reviews" className="scroll-mt-20 overflow-hidden py-16 lg:py-20">
      <Container>
        <SectionHeader
          label="Client reviews"
          title={"Loved by\n*pilgrims*"}
          aside={
            <div className="flex items-end gap-4">
              <p className="type-stat">4.9</p>
              <div className="pb-1">
                <StarRating value={5} />
                <p className="mt-2 text-sm text-stone">1,200+ reviews</p>
              </div>
            </div>
          }
          description="Real words from travellers who circled Kailash and crossed Tibet with us — unedited, from Tripadvisor and Google."
          action={{ href: "#plan", label: "Start your story" }}
        />
      </Container>

      <div className="mt-14 flex flex-col gap-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        {rows.map((row, i) => (
          <Marquee key={i} duration={45} reverse={i === 1} pauseOnHover gapClass="gap-4 pr-4">
            {row.map((review) => (
              <ReviewCard key={review.name} review={review} />
            ))}
          </Marquee>
        ))}
      </div>

      <Container className="mt-20">
        <Reveal className="flex flex-col gap-6 border-t border-mist pt-10 lg:flex-row lg:items-center lg:justify-between" stagger={0.05}>
          <p className="type-eyebrow shrink-0 text-stone">Licensed &amp; recognised by</p>
          <ul className="flex flex-wrap gap-2">
            {partners.map((p) => (
              <li key={p} className="rounded-full border border-mist px-4 py-2 text-sm font-medium">
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
