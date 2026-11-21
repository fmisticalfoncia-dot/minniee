/**
 * MAISON MISTYY — original image collection
 *
 * Every commissioned image is registered here exactly once, as supplied.
 * Sections take what they need from this single source of truth:
 *
 *   hero  ·  the three images placed in the hero composition
 *   vault ·  the remaining six, held for later sections
 *
 * Rules of the house: the `src` values are final. No regeneration, no
 * re-grading, no crop that removes content. Frames may be positioned and
 * animated, but the pixels are never altered.
 */

export type EditorialImage = {
  /** Stable identifier for the asset collection. */
  id: `image-0${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;
  /** Original file URL, displayed exactly as supplied. */
  src: string;
  /** Intrinsic aspect ratio (width / height), used to reserve space. */
  ratio: number;
  /** Accessible description for screen readers and fallbacks. */
  alt: string;
  /** Short editorial caption for captions, credits and future layouts. */
  caption: string;
  /** Which section currently uses the image, null when held in the vault. */
  placement: "hero" | "vault";
};

const CLOUD = "https://res.cloudinary.com/mjmmjbqu/image/upload";

export const IMAGE_COLLECTION = [
  {
    id: "image-01",
    src: `${CLOUD}/v1789455530/WhatsApp_Image_2026-09-14_at_00.09.44_2_wozdtb.jpg`,
    ratio: 4 / 5,
    alt: "Editorial portrait from the Maison Mistyy archive, warm studio light",
    caption: "Study No. 01 — Warm Light",
    placement: "hero",
  },
  {
    id: "image-02",
    src: `${CLOUD}/v1789455565/WhatsApp_Image_2026-09-14_at_00.09.44_iagfpw.jpg`,
    ratio: 4 / 5,
    alt: "Editorial portrait from the Maison Mistyy archive, soft neutral palette",
    caption: "Study No. 02 — Soft Neutral",
    placement: "hero",
  },
  {
    id: "image-03",
    src: `${CLOUD}/v1789455582/WhatsApp_Image_2026-09-14_at_00.09.43_1_xrabsc.jpg`,
    ratio: 4 / 5,
    alt: "Editorial portrait from the Maison Mistyy archive, quiet composition",
    caption: "Study No. 03 — Quiet Form",
    placement: "hero",
  },
  {
    id: "image-04",
    src: `${CLOUD}/v1789455602/WhatsApp_Image_2026-09-14_at_00.09.43_caacrq.jpg`,
    ratio: 4 / 5,
    alt: "Creative direction still from the Maison Mistyy archive",
    caption: "Study No. 04 — Direction",
    placement: "vault",
  },
  {
    id: "image-05",
    src: `${CLOUD}/v1789589623/WhatsApp_Image_2026-09-16_at_20.51.36_kcayhi.jpg`,
    ratio: 4 / 5,
    alt: "Art direction reference from the Maison Mistyy archive",
    caption: "Study No. 05 — Reference",
    placement: "vault",
  },
  {
    id: "image-06",
    src: `${CLOUD}/v1789625334/file_0000000070c4820882cbd4f0133ae19f_l4q7sr.png`,
    ratio: 4 / 5,
    alt: "AI-assisted visual study from the Maison Mistyy archive",
    caption: "Study No. 06 — Synthetic Bloom",
    placement: "vault",
  },
  {
    id: "image-07",
    src: `${CLOUD}/v1789627172/WhatsApp_Image_2026-09-16_at_12.51.36_hbidwj.jpg`,
    ratio: 4 / 5,
    alt: "Photography study from the Maison Mistyy archive",
    caption: "Study No. 07 — Grain",
    placement: "vault",
  },
  {
    id: "image-08",
    src: `${CLOUD}/v1789627195/WhatsApp_Image_2026-09-16_at_12.51.36_1_xqvfej.jpg`,
    ratio: 4 / 5,
    alt: "Studio portrait from the Maison Mistyy archive",
    caption: "Study No. 08 — Studio",
    placement: "vault",
  },
  {
    id: "image-09",
    src: `${CLOUD}/v1789627401/WhatsApp_Image_2026-09-16_at_12.51.38_hee0lp.jpg`,
    ratio: 4 / 5,
    alt: "Final study from the Maison Mistyy archive",
    caption: "Study No. 09 — Closing Frame",
    placement: "vault",
  },
] as const satisfies readonly EditorialImage[];

/** All nine registered originals, in commission order. */
export const ALL_IMAGES = IMAGE_COLLECTION;

/** Exactly three originals, used by the hero composition. */
export const HERO_IMAGES = IMAGE_COLLECTION.filter(
  (image) => image.placement === "hero",
);

/** The remaining six, held for later sections. */
export const VAULT_IMAGES = IMAGE_COLLECTION.filter(
  (image) => image.placement === "vault",
);

/** Look an original up by its collection id. */
export function getImage(id: EditorialImage["id"]) {
  const image = IMAGE_COLLECTION.find((item) => item.id === id);
  if (!image) throw new Error(`Unknown image asset: ${id}`);
  return image;
}
