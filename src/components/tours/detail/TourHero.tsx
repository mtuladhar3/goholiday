import { categoryHref, galleryFor, type Tour, type TourCategory } from "@/data/tours";
import Container from "@/components/ui/Container";
import StarRating from "@/components/ui/StarRating";
import SplitReveal from "@/components/animations/SplitReveal";
import { MapPin } from "@/components/ui/Icons";
import Breadcrumbs from "../Breadcrumbs";
import TourGallery from "./TourGallery";

export default function TourHero({ tour, category }: { tour: Tour; category: TourCategory }) {
  return (
    <section className="pt-36 sm:pt-40">
      <Container>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: category.name, href: categoryHref(category.slug) }, { label: tour.title }]} className="text-stone" />

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <SplitReveal as="h1" text={tour.title} className="type-statement" />
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-stone">{tour.tagline}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm lg:justify-end lg:pb-2">
            {tour.badge && <span className="rounded-full bg-gold px-3 py-1.5 text-xs font-medium text-navy">{tour.badge}</span>}
            <span className="flex items-center gap-2">
              <StarRating value={tour.rating} />
              <span className="font-medium">{tour.rating.toFixed(1)}</span>
              <span className="text-stone">({tour.reviews} reviews)</span>
            </span>
            <span className="flex items-center gap-1.5 text-stone">
              <MapPin className="size-4" />
              {tour.location}
            </span>
          </div>
        </div>

        <TourGallery images={galleryFor(tour)} title={tour.title} />
      </Container>
    </section>
  );
}
