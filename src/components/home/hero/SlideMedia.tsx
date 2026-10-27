import Image from "next/image";

export const STRIPS = 6;

/**
 * One slide's photo cut into vertical strips. Each strip holds a full-width copy of the
 * image offset to its column, so together they read as a single picture that can be
 * revealed strip by strip.
 */
export default function SlideMedia({ image, priority }: { image: string; priority?: boolean }) {
  return (
    <div className="hs-slide invisible absolute inset-0">
      {Array.from({ length: STRIPS }, (_, i) => (
        <div
          key={i}
          className="hs-strip absolute inset-y-0 overflow-hidden"
          style={{ left: `${(i * 100) / STRIPS}%`, width: `calc(${100 / STRIPS}% + 1px)` }}
        >
          <div className="hs-strip-inner absolute inset-y-0" style={{ width: `${STRIPS * 100}%`, left: `-${i * 100}%` }}>
            <Image src={image} alt="" fill priority={priority} sizes="100vw" className="object-cover" />
          </div>
        </div>
      ))}
    </div>
  );
}
