import type { Metadata } from "next";
import { Suspense } from "react";
import { getCategory, tours } from "@/data/tours";
import { site } from "@/data/site";
import SiteShell from "@/components/layout/SiteShell";
import Container from "@/components/ui/Container";
import { Check, Phone } from "@/components/ui/Icons";
import PageHero from "@/components/company/PageHero";
import BookingWizard from "@/components/booking/BookingWizard";
import type { BookableTour } from "@/components/booking/types";

export const metadata: Metadata = {
  title: "Reserve your trip — GoHoliday",
  description: "Reserve a Kailash, Tibet, Nepal or Bhutan journey online in four short steps. Nothing is charged until we confirm.",
};

// Only what the form needs crosses to the browser — not itineraries or galleries.
const bookable: BookableTour[] = tours.map((t) => ({
  slug: t.slug,
  title: t.title,
  category: getCategory(t.category)!.name,
  days: t.days,
  price: t.price,
  image: t.image,
  location: t.location,
}));

export default function BookPage() {
  return (
    <SiteShell>
      <PageHero
        crumb="Reserve"
        title={"Reserve your\n*journey*"}
        intro="Four short steps: pick your trip and start date, tell us who's travelling, add any extras, then check and reserve. Nothing is charged until we confirm."
        aside={
          <div className="flex flex-col gap-4 lg:items-end">
            <ul className="flex flex-wrap gap-2 lg:justify-end">
              {["No booking fees", "25% deposit", "Free date change"].map((t) => (
                <li key={t} className="flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium">
                  <Check className="size-3.5 text-navy" strokeWidth={2.5} />
                  {t}
                </li>
              ))}
            </ul>
            <a href={`tel:${site.whatsapp}`} className="flex items-center gap-2 text-sm text-stone transition-colors hover:text-navy">
              <Phone className="size-4" /> Prefer to book by phone? <span className="font-medium text-ink">{site.whatsapp}</span>
            </a>
          </div>
        }
      />

      {/* The form panel is sized to the screen, so scrolled to here the path, fields and buttons all show together. */}
      <section id="reserve" className="scroll-mt-28 pb-16 lg:pb-20">
        <Container>
          <Suspense fallback={<div className="h-[calc(100svh-9rem)] min-h-[560px] animate-pulse rounded-panel bg-paper-deep" />}>
            <BookingWizard tours={bookable} />
          </Suspense>
        </Container>
      </section>
    </SiteShell>
  );
}
