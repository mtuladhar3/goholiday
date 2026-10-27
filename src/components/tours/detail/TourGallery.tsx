"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { lenisRef } from "@/lib/lenis";
import { ArrowLeft, ArrowRight, Close, Expand } from "@/components/ui/Icons";

// Mosaic slots: one large lead image, two stacked, one tall.
const slots = ["col-span-2 row-span-2", "col-start-3 row-start-1", "col-start-3 row-start-2", "col-start-4 row-span-2"];

/** Hero photo mosaic that opens a full-screen lightbox. */
export default function TourGallery({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;
  const total = images.length;

  const go = useCallback((delta: number) => setIndex((i) => (i === null ? i : (i + delta + total) % total)), [total]);
  const close = useCallback(() => setIndex(null), []);

  return (
    <>
      <div className="relative mt-10 hidden h-[min(64vh,580px)] grid-cols-4 grid-rows-2 gap-2 md:grid">
        {images.slice(0, 4).map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setIndex(i)}
            data-cursor="View"
            aria-label={`Open photo ${i + 1} of ${total}`}
            className={`group relative overflow-hidden rounded-card bg-paper-deep ${slots[i]}`}
          >
            <Image
              src={src}
              alt={i === 0 ? title : ""}
              fill
              preload={i === 0}
              sizes={i === 0 ? "50vw" : "25vw"}
              className="object-cover transition-[scale] duration-1000 ease-expo group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
          </button>
        ))}
        <button
          type="button"
          onClick={() => setIndex(0)}
          className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-mist bg-white px-4 py-2.5 text-sm font-medium transition-colors hover:border-navy hover:bg-navy hover:text-white"
        >
          <Expand className="size-4" />
          View all {total} photos
        </button>
      </div>

      <div className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 md:hidden">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Open photo ${i + 1} of ${total}`}
            className="relative aspect-[4/5] w-[82vw] shrink-0 snap-center overflow-hidden rounded-card bg-paper-deep"
          >
            <Image src={src} alt={i === 0 ? title : ""} fill preload={i === 0} sizes="82vw" className="object-cover" />
            <span className="glass absolute bottom-3 right-3 rounded-full px-3 py-1 text-xs font-medium text-white">
              {i + 1} / {total}
            </span>
          </button>
        ))}
      </div>

      {open && <Lightbox images={images} title={title} index={index} onSelect={setIndex} onStep={go} onClose={close} />}
    </>
  );
}

type LightboxProps = {
  images: string[];
  title: string;
  index: number;
  onSelect: (i: number) => void;
  onStep: (delta: number) => void;
  onClose: () => void;
};

function Lightbox({ images, title, index, onSelect, onStep, onClose }: LightboxProps) {
  const dialog = useRef<HTMLDivElement>(null);
  const dragX = useRef<number | null>(null);
  const [shown, setShown] = useState(false);

  // Lock the page, wire up the keyboard, and animate in on the next frame.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    lenisRef.current?.stop();
    document.documentElement.style.overflow = "hidden";
    dialog.current?.focus();
    const raf = requestAnimationFrame(() => setShown(true));

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onStep(1);
      else if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      lenisRef.current?.start();
      previous?.focus();
    };
  }, [onClose, onStep]);

  return (
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — photo gallery`}
      tabIndex={-1}
      data-lenis-prevent
      className={`fixed inset-0 z-[80] flex flex-col bg-ink/95 text-white outline-none backdrop-blur-md transition-opacity duration-500 ${shown ? "opacity-100" : "opacity-0"}`}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <p className="min-w-0 truncate text-sm">
          <span className="font-medium">{title}</span>
          <span className="ml-3 text-white/50 tabular-nums">
            {index + 1} / {images.length}
          </span>
        </p>
        <button type="button" onClick={onClose} aria-label="Close gallery" className="grid size-11 shrink-0 place-items-center rounded-full border border-white/20 transition-colors hover:bg-white hover:text-ink">
          <Close className="size-5" />
        </button>
      </div>

      <div
        className="relative flex-1 touch-pan-y select-none"
        onPointerDown={(e) => (dragX.current = e.clientX)}
        onPointerUp={(e) => {
          if (dragX.current === null) return;
          const delta = e.clientX - dragX.current;
          dragX.current = null;
          if (Math.abs(delta) > 50) onStep(delta < 0 ? 1 : -1);
        }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {images.map((src, i) => (
          <div
            key={src + i}
            className={`pointer-events-none absolute inset-x-4 inset-y-2 transition-[opacity,scale] duration-700 ease-expo sm:inset-x-24 ${
              i === index && shown ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            aria-hidden={i !== index}
          >
            <Image src={src} alt={i === index ? `${title} — photo ${i + 1}` : ""} fill sizes="100vw" className="object-contain" />
          </div>
        ))}

        <button
          type="button"
          onClick={() => onStep(-1)}
          aria-label="Previous photo"
          className="absolute left-4 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-ink/40 backdrop-blur transition-colors hover:bg-white hover:text-ink sm:grid"
        >
          <ArrowLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => onStep(1)}
          aria-label="Next photo"
          className="absolute right-4 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white text-ink transition-colors hover:bg-gold sm:grid"
        >
          <ArrowRight className="size-5" />
        </button>
      </div>

      <div className="no-scrollbar flex justify-start gap-2 overflow-x-auto px-4 py-4 sm:justify-center sm:px-8 sm:py-6">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`Show photo ${i + 1}`}
            aria-current={i === index}
            className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-thumb transition-[opacity,box-shadow] duration-300 sm:h-20 sm:w-28 ${
              i === index ? "opacity-100 ring-2 ring-gold ring-offset-2 ring-offset-ink" : "opacity-40 hover:opacity-80"
            }`}
          >
            <Image src={src} alt="" fill sizes="112px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
