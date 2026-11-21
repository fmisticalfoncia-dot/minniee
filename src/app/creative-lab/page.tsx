import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/site/placeholder-page";

export const metadata: Metadata = {
  title: "The Creative Lab",
  description: "An experimental space for tools, prompts and prototypes built at the edge of AI and craft.",
};

export default function CreativeLabPage() {
  return (
    <PlaceholderPage
      eyebrow="Maison Mistyy · The Creative Lab"
      title="The Creative Lab"
      description="An experimental space for tools, prompts and prototypes built at the edge of AI and craft."
    />
  );
}
