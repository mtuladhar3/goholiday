import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { notFound } from "next/navigation";
import { categoryHref, departuresFor, getCategory, getTour, overviewFor, routeProfile, tours, toursIn } from "@/data/tours";
import { reviews } from "@/data/reviews";
import SiteShell from "@/components/layout/SiteShell";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionLabel from "@/components/ui/SectionLabel";
import ReviewCard from "@/components/ui/ReviewCard";
import { Check } from "@/components/ui/Icons";
import SplitReveal from "@/components/animations/SplitReveal";
import ExpertCTA from "@/components/home/expert/ExpertCTA";
import ElevationChart from "@/components/home/treks/ElevationChart";
import TourListCard from "@/components/tours/TourListCard";
import Faqs from "@/components/tours/Faqs";
import TourHero from "@/components/tours/detail/TourHero";
import TourFacts from "@/components/tours/detail/TourFacts";
import SectionNav from "@/components/tours/detail/SectionNav";
import Itinerary from "@/components/tours/detail/Itinerary";
import Inclusions from "@/components/tours/detail/Inclusions";
import { BookingCard, BookingProvider, MobileBookingBar } from "@/components/tours/detail/Booking";
import RichText from "@/components/ui/RichText";

type Params = PageProps<"/tours/[category]/[slug]">["params"];

export function generateStaticParams() {
  return tours.map((t) => ({ category: t.category, slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tours/[category]/[slug]">): Promise<Metadata> {
  const { category, slug } = await params;
  const tour = getTour(category, slug);
  if (!tour) return {};
  return { title: `${tour.title} — GoHoliday`, description: tour.tagline };
}

export default function TourPage({ params }: PageProps<"/tours/[category]/[slug]">) {
  return (
    <SiteShell>
      <Suspense fallback={<div className="min-h-svh" />}>
        <TourContent params={params} />
      </Suspense>
    </SiteShell>
  );
}

const sections = [
  { id: "overview", label: "Overview" },
  { id: "highlights", label: "Highlights" },
  { id: "itinerary", label: "Itinerary" },
  { id: "essentials", label: "Essential info" },
  { id: "inclusions", label: "Inclusions" },
  { id: "faqs", label: "FAQs" },
];

function Block({ id, label, title, children }: { id: string; label: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-32 border-t border-mist pt-12 lg:pt-14">
      <SectionLabel>{label}</SectionLabel>
      <SplitReveal text={title} className="type-headline mb-8 mt-4" />
      {children}
    </section>
  );
}

// Reading params suspends, so the page body sits behind a boundary while the shared chrome renders instantly.
async function TourContent({ params }: { params: Params }) {
  const { category: categorySlug, slug } = await params;
  const tour = getTour(categorySlug, slug);
  const category = getCategory(categorySlug);
  if (!tour || !category) notFound();

  const related = toursIn(category.slug).filter((t) => t.slug !== tour.slug);
  const similar = (related.length >= 3 ? related : [...related, ...tours.filter((t) => t.category !== category.slug)]).slice(0, 3);

  return (
    <BookingProvider departures={departuresFor(tour)}>
      <TourHero tour={tour} category={category} />

      <Container className="mt-10 grid gap-12 pb-16 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16 lg:pb-20">
        <div className="grid min-w-0 gap-12 lg:gap-14">
          <TourFacts tour={tour} category={category} />

          <Block id="overview" label="Overview" title="About this *journey*">
            <RichText html={overviewFor(tour)} />
          </Block>

          <Block id="highlights" label="Highlights" title="Why you'll *love* it">
            <ul className="grid gap-3 sm:grid-cols-2">
              {tour.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 rounded-card border border-mist bg-white p-4">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gold text-navy">
                    <Check className="size-3.5" strokeWidth={2.5} />
                  </span>
                  <span className="font-medium leading-snug">{h}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-card border border-mist bg-white p-5 sm:p-8">
              <div className="mb-8 flex flex-wrap items-baseline justify-between gap-2">
                <p className="type-eyebrow text-stone">Route profile</p>
                <p className="text-sm text-stone">
                  {tour.start} → {tour.end} · peak <span className="font-medium text-ink">{tour.maxAltitude.toLocaleString("en-US")} m</span>
                </p>
              </div>
              <ElevationChart points={routeProfile(tour)} />
            </div>
          </Block>

          <Block id="itinerary" label="Itinerary" title="Day by *day*">
            <Itinerary days={tour.itinerary} />
          </Block>

          <Block id="essentials" label="Essential info" title="Before you *go*">
            <RichText html={category.essentials} />
          </Block>

          <Block id="inclusions" label="Inclusions" title="What's *covered*">
            <Inclusions tour={tour} includes={category.includes} excludes={category.excludes} />
          </Block>

          <Block id="faqs" label="FAQs" title="Good to *know*">
            <Faqs items={category.faqs} />
          </Block>
        </div>

        <aside className="lg:sticky lg:top-32 lg:self-start">
          <BookingCard rating={tour.rating} reviews={tour.reviews} />
        </aside>
      </Container>

      <Section tone="deep">
        <SectionHeader label={`${tour.reviews} reviews`} title="Traveller *stories*" />
        <div className="no-scrollbar -mx-4 mt-12 flex gap-4 overflow-x-auto px-4 sm:-mx-8 sm:px-8">
          {reviews.map((r) => (
            <ReviewCard key={r.name} review={r} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader label="Similar journeys" title="You might also *like*" action={{ href: categoryHref(category.slug), label: `All ${category.name}` }} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {similar.map((t) => (
            <TourListCard key={t.slug} tour={t} />
          ))}
        </div>
      </Section>

      <ExpertCTA />
      <SectionNav items={sections} />
      <MobileBookingBar />
    </BookingProvider>
  );
}
