import SiteShell from "@/components/layout/SiteShell";
import HeroSlider from "@/components/home/hero/HeroSlider";
import Destinations from "@/components/home/destinations/Destinations";
import TripSearch from "@/components/home/TripSearch";
import DestinationMarquee from "@/components/home/DestinationMarquee";
import FeaturedTrips from "@/components/home/trips/FeaturedTrips";
import Experiences from "@/components/home/experiences/Experiences";
import TrekBento from "@/components/home/treks/TrekBento";
import Manifesto from "@/components/home/manifesto/Manifesto";
import Journal from "@/components/home/journal/Journal";
import ExpertCTA from "@/components/home/expert/ExpertCTA";
import Testimonials from "@/components/home/testimonials/Testimonials";

export default function Home() {
  return (
    <SiteShell>
      <HeroSlider />
      <TripSearch />
      <DestinationMarquee />
      <Destinations />
      <FeaturedTrips />
      <Experiences />
      <TrekBento />
      <Manifesto />
      <Journal />
      <ExpertCTA />
      <Testimonials />
    </SiteShell>
  );
}
