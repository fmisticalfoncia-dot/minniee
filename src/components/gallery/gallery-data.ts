import { ALL_IMAGES, type EditorialImage } from "@/lib/images";

/**
 * Add each verified, image-specific creative direction here after reviewing
 * the original. Null means review is required; details are never guessed.
 * The shared identity instructions are added by formatVerifiedPrompt.
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

/** Keep the identity instructions with every reviewed creative direction. */
export function formatVerifiedPrompt(direction: string | null): string | null {
  if (!direction?.trim()) return null;
  return [
    "Use the customer's uploaded reference photograph as the identity reference. Preserve the customer's facial identity, facial structure, skin tone and recognizable features. Apply the creative direction, styling, pose, composition and photographic environment described in this prompt to the customer's reference image. Do not copy the identity of the person in the example photograph.",
    direction.trim(),
  ].join("\n\n");
}

export const GALLERY_IMAGES = ALL_IMAGES.map((image) => ({
  ...image,
  title: image.caption,
  // Use the existing archive classification, not a guess at the prompt.
  category: image.caption.split(" — ")[1] ?? "Unclassified",
  prompt: formatVerifiedPrompt(VERIFIED_PROMPTS[image.id]),
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
