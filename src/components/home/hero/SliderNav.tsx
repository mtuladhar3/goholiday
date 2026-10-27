import type { HeroSlide } from "@/data/heroSlides";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";

type SliderNavProps = {
  slides: HeroSlide[];
  index: number;
  onSelect: (i: number) => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function SliderNav({ slides, index, onSelect, onPrev, onNext }: SliderNavProps) {
  return (
    <div className="hs-fade flex items-end gap-4 sm:gap-8">
      <div className="flex gap-2">
        <button type="button" onClick={onPrev} aria-label="Previous slide" className="glass grid size-12 place-items-center rounded-full transition-colors hover:bg-white hover:text-ink">
          <ArrowLeft className="size-4" />
        </button>
        <button type="button" onClick={onNext} aria-label="Next slide" className="grid size-12 place-items-center rounded-full bg-navy text-white transition-colors hover:bg-saffron">
          <ArrowRight className="size-4" />
        </button>
      </div>

      <ol className="flex flex-1 gap-3 sm:gap-5">
        {slides.map((s, i) => (
          <li key={s.name} className="flex-1">
            <button type="button" onClick={() => onSelect(i)} aria-label={`Go to ${s.name}`} aria-current={i === index} className="group w-full text-left">
              <span className={`flex items-baseline gap-2 text-xs transition-opacity duration-500 ${i === index ? "opacity-100" : "opacity-50 group-hover:opacity-90"}`}>
                <span className="hidden font-medium uppercase tracking-[0.15em] md:inline">{s.name}</span>
              </span>
              <span className="mt-2 block h-0.5 overflow-hidden rounded-full bg-white/20">
                <span className={`hs-progress hs-progress-${i} block h-full origin-left bg-white`} style={{ transform: "scaleX(0)" }} />
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
