import { ALL_IMAGES, type EditorialImage } from "@/lib/images";

/**
 * Add each verified, full generation prompt here after reviewing the original.
 * Null means the prompt has not been supplied; it is never guessed.
 */
export const VERIFIED_PROMPTS: Record<EditorialImage["id"], string | null> = {
  "image-01": null,
  "image-02": null,
  "image-03": null,
  "image-04": null,
  "image-05": null,
  "image-06": null,
  "image-07": null,
  "image-08": null,
  "image-09": null,
};

export const GALLERY_IMAGES = ALL_IMAGES.map((image) => ({
  ...image,
  title: image.caption,
  // Use the existing archive classification, not a guess at the prompt.
  category: image.caption.split(" — ")[1] ?? "Unclassified",
  prompt: VERIFIED_PROMPTS[image.id],
}));

export type GalleryImage = (typeof GALLERY_IMAGES)[number];

/** An honest display snippet, not an invented image-generation recipe. */
export function imageDisplayCode(image: GalleryImage) {
  return [
    "const image = document.createElement('img');",
    `image.src = ${JSON.stringify(image.src)};`,
    `image.alt = ${JSON.stringify(image.alt)};`,
    "document.body.appendChild(image);",
  ].join("\n");
}
