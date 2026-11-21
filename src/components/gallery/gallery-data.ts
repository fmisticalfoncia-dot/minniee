import { ALL_IMAGES, type EditorialImage } from "@/lib/images";

/**
 * Store complete, verified prompts here after reviewing each original. Null
 * means review is required; details are never guessed. User-supplied prompts
 * stay verbatim. formatVerifiedPrompt can help compose future reviewed prompts.
 */
export const VERIFIED_PROMPTS: Record<EditorialImage["id"], string | null> = {
  "image-01": `Create a luxurious, photorealistic fashion editorial photoshoot using the customer's uploaded reference photograph as the identity reference.

IDENTITY PRESERVATION:
Preserve the customer's exact facial identity, facial structure, skin tone and recognizable features. Do not copy the identity of the woman in the inspiration image. Apply the following styling and creative direction to the customer's own identity.

SCENE AND COMPOSITION:
A sophisticated woman seated confidently in a luxurious deep-red velvet accent chair in a minimalist photography studio. She is sitting with one leg elegantly crossed over the other, holding a vintage bright-red corded telephone receiver against her ear. The matching red rotary telephone rests on a small black side table beside her.

FASHION AND STYLING:
She wears a fitted black top underneath an oversized black leather biker jacket with glossy leather texture and silver hardware. Pair the outfit with sheer black polka-dot tights and elegant pointed-toe glossy red stiletto heels. Add refined statement jewellery, including earrings, rings and a metallic wristwatch.

HAIR AND BEAUTY:
Voluminous, long, naturally textured black curls framing the face. Sophisticated makeup with defined eyes, luminous skin and glossy deep-toned lips. Red cat-eye sunglasses complete the fashion-forward look.

POSE AND EXPRESSION:
Relaxed yet powerful editorial posture. One hand holds the telephone receiver while the other rests naturally on the chair arm. Legs crossed elegantly. Calm, confident facial expression.

LIGHTING AND ENVIRONMENT:
Bright, warm natural studio lighting entering from the side, creating dramatic geometric window shadows across a soft warm ivory wall and pale floor. Minimalist studio environment with no unnecessary decorations.

PHOTOGRAPHY DIRECTION:
Luxury fashion magazine editorial, full-body portrait, slightly low camera perspective, carefully balanced composition, realistic skin texture, detailed leather materials, rich velvet texture, crisp fabric details and professional high-end fashion photography.

COLOUR PALETTE:
Deep red, glossy black, warm ivory and subtle silver accents.

FINAL RESULT:
A sophisticated, cinematic luxury fashion campaign photograph. Maintain realistic anatomy, natural proportions, accurate hands, detailed textures and professional photographic quality. Vertical portrait composition, high resolution.`,
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
