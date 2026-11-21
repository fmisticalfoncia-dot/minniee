# MAISON MISTYY

> Your Imagination. Our Creative Intelligence.

The first stage of a luxury creative house and digital learning ecosystem: the
**navigation bar** and the **hero section**. Nothing else is built yet — every
other destination is a clearly marked holding route, ready for its own stage.

---

## Stack

| Layer      | Choice                                                        |
| ---------- | ------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, TypeScript, `src/` directory)          |
| Styling    | Tailwind CSS v4 (`@import "tailwindcss"`, no config file)      |
| UI         | shadcn/ui structure (`components.json`, `components/ui/*`)     |
| Primitives | Radix (`@radix-ui/react-dialog`, `@radix-ui/react-slot`)        |
| Icons      | `lucide-react`                                                 |
| Type       | Cormorant Garamond + Jost, self-hosted via Fontsource          |

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # eslint
```

The shadcn CLI was not run at install time (it needs the remote registry), so
`components.json`, `src/lib/utils.ts` and `src/components/ui/*` are committed
directly in the canonical shadcn layout. `npx shadcn@latest add <component>`
works against this project as-is.

---

## Where things live

```
src/
  app/
    layout.tsx            root shell, metadata
    page.tsx              the hero page (nav + hero only)
    globals.css           design tokens, base layer, house utilities
    hero.css              all hero motion, kept out of the components
    <route>/page.tsx      holding routes for each nav destination
  components/
    site/
      site-header.tsx     responsive navigation (rail + slide-out drawer)
      brand-mark.tsx      wordmark, plus the MM monogram for mid widths
      utility-actions.tsx reusable Search / Account / Cart controls
      placeholder-page.tsx holding page for unbuilt sections
    hero/
      hero-section.tsx    the split layout and hairline guides
      hero-content.tsx    eyebrow, headline, paragraph, both CTAs
      hero-gallery.tsx    the three-image tilted composition
    ui/
      button.tsx          shadcn button, house-tuned variants
      sheet.tsx           shadcn sheet (Radix dialog) — the mobile drawer
      tilted-grid-hero.tsx  supplied curved-band component, house-tuned
      tilted-grid-hero.demo.tsx  demo wiring for the band
  lib/
    images.ts             THE image collection (all nine originals)
    site.ts               navigation, utility routes, site copy
    utils.ts              cn()
```

### Design tokens

All colour and type lives in `src/app/globals.css`:

```
--ivory #F8F5EF   --espresso #35251F   --champagne #C5A46D   --beige #E8DFD2
```

They are exposed to Tailwind through `@theme inline`, so `bg-ivory`,
`text-espresso`, `border-champagne` and the shadcn aliases
(`background`, `foreground`, `muted-foreground`, `border`, …) all resolve to
the house palette. Future sections inherit the look by using those names.

---

## The image collection

`src/lib/images.ts` is the single source of truth for the nine commissioned
originals. Each entry carries `id`, `src` (the supplied URL, unchanged),
`ratio`, `alt`, `caption` and `placement`.

- `HERO_IMAGES` — the three images in the hero.
- `VAULT_IMAGES` — the other six, registered and ready for later sections.
- `ALL_IMAGES` / `IMAGE_COLLECTION` — all nine, in commission order.

**Strict preservation.** The hero renders plain `<img>` elements pointing at
the original files; `next/image` is deliberately not used, because it would
re-encode the pixels. No filters, no colour treatment, no AI transformation,
no destructive cropping. CSS positions and animates the frames only.

---

## Motion

Nothing animates inside an image. Three nested containers do the work, and
each layer has exactly one job:

1. `.hero-reveal` — the entrance, once, staggered per frame.
2. `.hero-parallax` — pointer depth, written as CSS custom properties
   (`--mx`, `--my`) from a single rAF-throttled listener. Fine pointers only.
3. `.hero-float` — slow independent float and a fraction of a degree of sway,
   each frame on its own duration and phase.

```css
@media (prefers-reduced-motion: reduce) { /* everything resolves to a still */ }
@media (hover: none), (pointer: coarse) { /* longer, shallower drift */ }
```

The reduced-motion rules also collapse the page-wide transition durations, and
`scroll-behavior: smooth` reverts to `auto`.

---

## Navigation & routes

| Link                | Route            |
| ------------------- | ---------------- |
| Home                | `/`              |
| The Studio          | `/studio`        |
| The Vault           | `/vault`         |
| The Academy         | `/academy`       |
| The Bookshelf       | `/bookshelf`     |
| The Marketplace     | `/marketplace`   |
| The Creative Lab    | `/creative-lab`  |
| The Community       | `/community`     |
| Search              | `/search`        |
| Customer Account    | `/account`       |
| Shopping Cart       | `/cart`          |

The hero CTAs point at `/studio` ("Explore Our Services") and `/academy`
("Discover Masterclasses"). Every route resolves — each unbuilt one renders
`PlaceholderPage`, which states plainly that the section is in development.

**Breakpoints.** The full link rail appears at ≥1440px. Between 640px and
1439px the wordmark becomes the MM monogram and the links move into the
drawer, so eight links are never squeezed into a narrow bar. Below 640px the
bar keeps the wordmark, the utility controls collapse into the drawer, and the
menu button stays.

**Accessibility.** Dismissible Radix dialog with focus trap and Escape,
`aria-current="page"` on the active link, labels on every icon control, a skip
link on the page, visible focus rings, and semantic `header` / `nav` / `main`.

---

## Extending it

1. Add the section component under `src/components/<area>/`.
2. Drop it into `src/app/page.tsx` below `<HeroSection />` (or give it its own
   route and replace the holding page).
3. Pull imagery from `src/lib/images.ts`; never re-declare a URL.
4. Use the token names (`bg-background`, `text-espresso`, `border-border`,
   `font-serif` for display type, `eyebrow` for small caps).

To preview the supplied curved image band, render
`<TiltedGridHeroDemo />` from `src/components/ui/tilted-grid-hero.demo.tsx`
on any page — it already reads the registered collection.

---

## Not built yet

About page, services, gallery sections, Academy, Marketplace, Bookshelf,
Community, Creative Lab and the footer. Those arrive in later stages.
