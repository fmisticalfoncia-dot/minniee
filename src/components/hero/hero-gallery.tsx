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
 * containers, in nested layers with exactly one job each:
 *
 *   hero-reveal   · entrance, once, staggered
 *   hero-parallax · pointer depth (desktop fine pointers, reset on leave)
 *   hero-float    · independent drift + alternating sway, per frame
 *   figure        · the frame: static tilt, shadow, ring, caption
 *
 * The three floats run on three different cycles (11s, 14s, 9s) from three
 * different phases, so they never fall into step. Each frame's resting
 * offset is a percentage of its own height, so the composition keeps its
 * proportions at every viewport instead of collapsing when the frames
 * narrow; the float then moves each frame from that pose by a few pixels.
 *
 * With `prefers-reduced-motion` nothing animates at all and every frame sits
 * exactly on its resting pose, so none is ever caught mid-gesture.
 */

type Placement = {
  /** Mean tilt of the frame, in degrees. */
  rotate: number;
  /** How far the tilt alternates either side of the mean, in degrees. */
  sway: number;
  /** Parallax strength in px at full pointer deflection. */
  depth: number;
  /** Entrance delay, in ms. */
  delay: number;
  /** Float cycle, in seconds. */
  float: number;
  /** Float phase offset, in seconds. */
  phase: number;
  /** Vertical drive, as a percentage of the frame's own height. */
  dy: number;
  /** Vertical travel at the extremes of the float, in px. */
  lift: number;
  /** Grid placement — the three frames share one row, never a text overlap. */
  cell: string;
  /** Aspect ratio of the frame. */
  frame: string;
};

/**
 * The hand-mounted spread: centre frame raised, right frame dropped, each
 * tilted the other way. Expressed as a percentage of the frame's own height,
 * so a phone keeps a hint of the arrangement without any overlap.
 */
const PLACEMENTS: Placement[] = [
  {
    rotate: -3.4,
    sway: 1.1,
    depth: 12,
    delay: 140,
    float: 11,
    phase: 0,
    dy: 0,
    lift: 6,
    cell: "col-start-1 row-start-1",
    frame: "aspect-[4/5]",
  },
  {
    rotate: 2.2,
    sway: 1.35,
    depth: 22,
    delay: 280,
    float: 14,
    phase: -5.5,
    dy: -3.5,
    lift: 10,
    cell: "col-start-2 row-start-1",
    frame: "aspect-[4/5]",
  },
  {
    rotate: -5.2,
    sway: 1.6,
    depth: 32,
    delay: 420,
    float: 9,
    phase: -3,
    dy: 3.5,
    lift: 8,
    cell: "col-start-3 row-start-1",
    frame: "aspect-[3/4]",
  },
];

/**
 * Two transforms, deliberately kept apart so the layers compose instead of
 * fighting: the frame owns the fixed pose (the hand-mounted spread), and the
 * float owns only the *delta* it moves from that pose by. Transforms multiply,
 * so nothing is counted twice and the reduced-motion still is just the pose.
 */
const n = (v: number) => +v.toFixed(3);

/** The frame's fixed pose — the spread, before any motion. */
function stillTransform(p: Placement) {
  return `translate3d(0,${n(p.dy)}%,0) rotate(${n(p.rotate)}deg)`;
}

/**
 * A frame's float: position swaps above and below the baseline while the tilt
 * alternates either side of it, so the motion reads as a drift rather than a
 * slide. Starts and ends at zero, so the cycle closes without a jump.
 */
function floatKeyframes(name: string, p: Placement, touch: boolean) {
  const lift = touch ? p.lift * 0.6 : p.lift;
  const sway = touch ? p.sway * 0.7 : p.sway;
  return (
    `@keyframes ${name}{` +
    `0%,100%{transform:translate3d(0,0,0) rotate(0deg)}` +
    `28%{transform:translate3d(0,${n(-lift)}px,0) rotate(${n(sway)}deg)}` +
    `55%{transform:translate3d(0,${n(lift * 0.35)}px,0) rotate(0deg)}` +
    `78%{transform:translate3d(0,${n(-lift * 0.3)}px,0) rotate(${n(-sway)}deg)}}`
  );
}

export function HeroGallery({ className }: { className?: string }) {
  const stage = React.useRef<HTMLDivElement>(null);
  // Stable across renders, unique per instance: safe with SSR.
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");

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
    // Check preferences on every move so changes take effect without a reload.
    let raf: number | null = null;
    const onMove = (event: PointerEvent) => {
      if (!fine.matches || calm.matches || raf !== null) return;
      raf = window.requestAnimationFrame(() => {
        raf = null;
        if (!fine.matches || calm.matches) return;
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

    const onLeave = () => {
      if (raf !== null) {
        window.cancelAnimationFrame(raf);
        raf = null;
      }
      setVars(0, 0);
    };
    const onChange = () => {
      if (!fine.matches || calm.matches) onLeave();
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });
    calm.addEventListener("change", onChange);
    fine.addEventListener("change", onChange);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      calm.removeEventListener("change", onChange);
      fine.removeEventListener("change", onChange);
      if (raf !== null) window.cancelAnimationFrame(raf);
    };
  }, [setVars]);

  /* Each frame gets its own timeline. Two variants per frame — a desktop
     float and a shallower touch float under its own name — because
     re-declaring the same keyframes inside a media query is unevenly
     supported. The still is emitted outside any motion query. */
  const motionCss = PLACEMENTS.map((p, i) => {
    const desk = `hero-float-${uid}-${i}`;
    const touch = `hero-touch-${uid}-${i}`;
    const frameClass = `hero-frame-${uid}-${i}`;
    return (
      `${floatKeyframes(desk, p, false)}` +
      `${floatKeyframes(touch, p, true)}` +
      `.${frameClass}{transform:${stillTransform(p)}}` +
      `@media (prefers-reduced-motion:no-preference){` +
      `.hero-float-${uid}-${i}{animation:${desk} ${p.float}s cubic-bezier(0.45,0.05,0.55,0.95) ${p.phase}s infinite}` +
      `}` +
      `@media (prefers-reduced-motion:no-preference) and (hover:none){` +
      `.hero-float-${uid}-${i}{animation-name:${touch};animation-duration:${(
        p.float * 1.5
      ).toFixed(2)}s}` +
      `}`
    );
  }).join("");

  return (
    <div
      ref={stage}
      className={cn("hero-stage relative isolate w-full", className)}
      role="group"
      aria-label="Selected work from the Maison Mistyy archive"
    >
      <style>{motionCss}</style>

      {/* The frames sit on a hairline plinth, and the plinth stops with them:
          the caption row below is outside its box, so no rule ever crosses a
          word and nothing is left half-hidden. */}
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-2.5 -bottom-3.5 -top-5 -z-10 border border-espresso/10 sm:-inset-x-4 sm:-bottom-4 sm:-top-6"
        />

        <ol className="grid grid-cols-3 items-start gap-2.5 sm:gap-4 lg:gap-3">
          {HERO_IMAGES.map((image, index) => {
            const p = PLACEMENTS[index];
            const z = ["z-10", "z-20", "z-30"][index] ?? "z-10";
            return (
              <li
                key={image.id}
                className={cn("relative", p.cell, z)}
                style={
                  {
                    "--depth": p.depth,
                    "--delay": `${p.delay}ms`,
                  } as React.CSSProperties
                }
              >
                <div className="hero-reveal">
                  <div className="hero-parallax">
                    <div
                      className={cn("hero-float", `hero-float-${uid}-${index}`)}
                    >
                      <figure
                        className={cn(
                          `hero-frame-${uid}-${index}`,
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
                          className="absolute inset-0 size-full select-none object-contain object-center"
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
      </div>

      <div className="mt-11 flex items-end justify-between gap-4 sm:mt-12">
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
