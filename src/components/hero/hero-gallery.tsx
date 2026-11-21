"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { HERO_IMAGES } from "@/lib/images";

/**
 * The commissioned triptych.
 *
 * Every image is shown exactly as supplied: plain <img> tags pointing at the
 * original files. Nothing is filtered, recoloured, regenerated or cropped
 * away — the frames only position the pixels. All motion lives on the
 * containers:
 *
 *   hero-reveal     · entrance, once
 *   hero-parallax   · pointer depth (desktop, fine pointers only)
 *   hero-float      · slow independent drift + a fraction of a degree of sway
 *
 * With `prefers-reduced-motion`, or on a coarse pointer, the movement is
 * reduced to a static, fully legible composition.
 */

type Placement = {
  /** Static tilt of the frame, in degrees. */
  rotate: number;
  /** Parallax strength in px at full pointer deflection. */
  depth: number;
  /** Entrance delay, in ms. */
  delay: number;
  /** Float cycle, in seconds. */
  float: number;
  /** Float phase offset, in seconds. */
  phase: number;
  /** Grid placement per breakpoint. */
  cell: string;
  /** Aspect ratio of the frame. */
  frame: string;
};

const PLACEMENTS: Placement[] = [
  {
    rotate: -3.4,
    depth: 14,
    delay: 140,
    float: 13,
    phase: -2,
    cell: "col-start-1 row-start-1 sm:col-start-2 sm:row-start-1 sm:self-start lg:col-start-1 lg:row-start-1",
    frame: "aspect-[4/5]",
  },
  {
    rotate: 2.2,
    depth: 26,
    delay: 260,
    float: 16,
    phase: -7,
    cell: "col-start-2 row-start-1 self-end sm:col-start-3 sm:row-start-2 sm:self-start lg:col-start-2 lg:row-start-1",
    frame: "aspect-[4/5]",
  },
  {
    rotate: -5.2,
    depth: 36,
    delay: 400,
    float: 11,
    phase: -4,
    cell: "col-start-3 row-start-2 self-start sm:col-start-1 sm:row-start-2 sm:self-end lg:col-start-3 lg:row-start-2",
    frame: "aspect-[3/4]",
  },
];

export function HeroGallery({ className }: { className?: string }) {
  const stage = React.useRef<HTMLDivElement>(null);
  const frame = React.useRef<number | null>(null);

  const setVars = React.useCallback((x: number, y: number) => {
    const el = stage.current;
    if (!el) return;
    el.style.setProperty("--mx", x.toFixed(3));
    el.style.setProperty("--my", y.toFixed(3));
  }, []);

  React.useEffect(() => {
    const el = stage.current;
    if (!el) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || calm.matches) return;

    const onMove = (event: PointerEvent) => {
      if (frame.current !== null) return;
      frame.current = window.requestAnimationFrame(() => {
        frame.current = null;
        const rect = el.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        setVars(
          Math.max(-0.5, Math.min(0.5, x)) * 2,
          Math.max(-0.5, Math.min(0.5, y)) * 2,
        );
      });
    };

    const onLeave = () => setVars(0, 0);
    const onChange = () => {
      if (calm.matches) onLeave();
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });
    calm.addEventListener("change", onChange);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      calm.removeEventListener("change", onChange);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, [setVars]);

  return (
    <div
      ref={stage}
      className={cn("hero-stage relative isolate w-full", className)}
      role="group"
      aria-label="Selected work from the Maison Mistyy archive"
    >
      {/* Hairline plinth and frame index — the only ornament in the collage. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-3 bottom-1 top-8 -z-10 border border-espresso/10 sm:inset-x-6"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-1 top-2 -z-10 hidden select-none font-serif text-[7rem] font-light leading-none text-espresso/[0.045] sm:block"
      >
        001
      </div>

      <ol className="grid grid-cols-3 items-start gap-3 sm:gap-5 lg:gap-3">
        {HERO_IMAGES.map((image, index) => {
          const p = PLACEMENTS[index];
          const z = ["z-10", "z-20", "z-30"][index] ?? "z-10";
          return (
            <li
              key={image.id}
              className={cn("relative", p.cell, z)}
              style={
                {
                  "--rot": `${p.rotate}deg`,
                  "--depth": p.depth,
                  "--delay": `${p.delay}ms`,
                  "--float": `${p.float}s`,
                  "--phase": `${p.phase}s`,
                } as React.CSSProperties
              }
            >
              <div className="hero-reveal">
                <div className="hero-parallax">
                  <div className="hero-float">
                    <figure
                      className={cn(
                        "group relative overflow-hidden bg-beige shadow-[0_18px_60px_-30px_rgba(53,37,31,0.55)] ring-1 ring-espresso/10 transition-shadow duration-700 hover:shadow-[0_30px_80px_-32px_rgba(53,37,31,0.6)]",
                        p.frame,
                      )}
                    >
                      {/* The original file, untouched: no filters, no crops.
                          A plain <img> is deliberate — next/image would
                          re-encode the pixels, and these are final assets. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image.src}
                        alt={image.alt}
                        width={1024}
                        height={1280}
                        loading={index === 0 ? "eager" : "lazy"}
                        fetchPriority={index === 0 ? "high" : "auto"}
                        decoding="async"
                        draggable={false}
                        className="absolute inset-0 size-full select-none object-cover object-center"
                      />

                      {/* Caption plate: an interface layer over the frame. */}
                      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-espresso/60 via-espresso/10 to-transparent p-2.5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 lg:p-3">
                        <span className="eyebrow text-[0.4375rem] text-ivory lg:text-[0.5rem]">
                          {image.caption}
                        </span>
                        <span className="eyebrow text-[0.4375rem] text-ivory/70 lg:text-[0.5rem]">
                          {image.id.replace("image-", "")}
                        </span>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>

              {/* A champagne corner tick, echoing a mounted print. */}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-1.5 -left-1.5 size-4 border-b border-l border-champagne/70 sm:-bottom-2 sm:-left-2 sm:size-5"
              />
            </li>
          );
        })}
      </ol>

      <div className="mt-7 flex items-end justify-between gap-4 sm:mt-9">
        <p className="eyebrow text-[0.5rem] text-muted-foreground">
          Archive · MMXXVI
        </p>
        <p className="max-w-[15rem] text-right font-serif text-sm italic leading-snug text-espresso/60">
          Three studies from the original collection.
        </p>
      </div>
    </div>
  );
}
