import { popularTreks } from "@/data/trips";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/animations/Reveal";
import TripOfTheMonth from "./TripOfTheMonth";
import TrekTile from "./TrekTile";
import TrekFinder from "./TrekFinder";

export default function TrekBento() {
  return (
    <Section id="treks">
      <SectionHeader
        label="Popular in Tibet"
        title={"Chosen by\n*pilgrims*"}
        description="The kora and Tibetan treks travellers book most, plus one overland journey we can't stop talking about."
        action={{ href: "#trips", label: "All treks" }}
      />

      <Reveal className="mt-14 grid gap-4 lg:grid-cols-12" stagger={0.12}>
        <div className="lg:col-span-7">
          <TripOfTheMonth />
        </div>
        <div className="flex flex-col gap-4 lg:col-span-5">
          {popularTreks.map((trek) => (
            <TrekTile key={trek.slug} trek={trek} />
          ))}
          <TrekFinder />
        </div>
      </Reveal>
    </Section>
  );
}
