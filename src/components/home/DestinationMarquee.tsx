import Image from "next/image";
import { destinations } from "@/data/site";
import { images } from "@/data/images";
import Marquee from "@/components/animations/Marquee";

const photos: Record<string, string> = {
  Everest: images.amaDablam,
  Kailash: images.sunsetPeaks,
  Lhasa: images.prayerWheels,
  Bhutan: images.prayerFlags,
  Annapurna: images.alpineValley,
  Langtang: images.hikers,
  Pokhara: images.phewaLake,
  Mustang: images.everestStupa,
};

export default function DestinationMarquee() {
  return (
    <section aria-label="Destinations" className="border-y border-mist py-8 sm:py-10">
      <Marquee duration={45} pauseOnHover gapClass="gap-6 pr-6 sm:gap-10 sm:pr-10">
        {destinations.map((name, i) => (
          <span key={name} className="group flex items-center gap-6 sm:gap-10">
            <span
              className={`type-display transition-colors duration-500 ${
                i % 2 ? "font-serif font-normal italic text-saffron group-hover:text-navy" : "group-hover:text-navy"
              }`}
            >
              {name}
            </span>
            <span
              className={`relative h-14 w-24 shrink-0 overflow-hidden rounded-full border border-mist transition-transform duration-700 ease-expo group-hover:rotate-0 group-hover:scale-110 sm:h-20 sm:w-36 ${
                i % 2 ? "rotate-3" : "-rotate-3"
              }`}
            >
              <Image src={photos[name] ?? images.alpineValley} alt="" fill sizes="144px" className="object-cover" />
            </span>
            <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-saffron sm:size-6" aria-hidden>
              <path d="M12 0c.8 6.4 5.6 11.2 12 12-6.4.8-11.2 5.6-12 12-.8-6.4-5.6-11.2-12-12C6.4 11.2 11.2 6.4 12 0Z" fill="currentColor" />
            </svg>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
