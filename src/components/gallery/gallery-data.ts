import { ALL_IMAGES, type EditorialImage } from "@/lib/images";

/**
 * Add each verified, image-specific creative direction here after reviewing
 * the original. Null means review is required; details are never guessed.
 * The shared identity instructions are added by formatVerifiedPrompt.
 */
export const VERIFIED_PROMPTS: Record<EditorialImage["id"], string | null> = {
  "image-01": [
    "Create a polished, full-length fashion editorial photograph in a vertical composition. Frame the subject seated centrally in a red upholstered armchair with slim black legs, viewed from the front at roughly seated eye level. Keep the entire seated figure, crossed legs and red pointed high heels in the frame. The subject sits confidently with one hand resting on the chair arm and the other holding a red telephone receiver to their ear, looking toward the camera with a composed expression.",
    "Style the subject in a glossy black leather biker jacket over a fitted black outfit, sheer black tights with small polka dots, and glossy red pointed-toe stiletto heels. Add red cat-eye sunglasses, dangling silver-toned earrings, rings and a silver-toned wristwatch. Style the hair in long, dark, voluminous curls, while preserving the customer's recognizable facial identity and skin tone.",
    "Place a red rotary telephone on a simple black side table to one side of the chair, with its coiled cord connecting to the receiver. Use a minimal warm off-white wall and pale floor as the setting. Strong directional light casts distinct geometric window-frame shadows across the wall and floor, with natural shadow and highlight transitions on the subject.",
    "Use a restrained black, red and warm ivory palette. Aim for a poised, confident, retro-inspired luxury fashion mood, with realistic photographic detail in the leather, tights, upholstery, jewelry and telephone. Maintain natural proportions and a crisp, refined editorial finish.",
  ].join("\n\n"),
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
