"use client";

import type { KeyboardEvent, ReactNode } from "react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarouselProps {
  slides: ReactNode[];
  className?: string;
  /** Accessible label for the carousel region. */
  label?: string;
}

/**
 * Carousel — a track of full-width slides with prev/next controls, dot
 * indicators, looping, and arrow-key navigation. Built on ARIA carousel roles.
 */
export function Carousel({
  slides,
  className,
  label = "Gallery",
}: CarouselProps) {
  const [index, setIndex] = useState(0);
  const count = slides.length;
  const go = (i: number) => setIndex(((i % count) + count) % count);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    }
  };

  if (count === 0) return null;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-brand",
        className,
      )}
    >
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={i !== index}
            className="min-w-full"
          >
            {slide}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur transition-colors hover:bg-background"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur transition-colors hover:bg-background"
      >
        <ChevronRight className="size-5" />
      </button>

      <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={cn(
              "h-2 rounded-full transition-all",
              i === index ? "w-6 bg-brand" : "w-2 bg-white/30 hover:bg-white/50",
            )}
          />
        ))}
      </div>
    </div>
  );
}
