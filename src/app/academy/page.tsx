import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/site/placeholder-page";

export const metadata: Metadata = {
  title: "The Academy",
  description: "Masterclasses and structured learning in creative intelligence, image-making and visual direction.",
};

export default function AcademyPage() {
  return (
    <PlaceholderPage
      eyebrow="Maison Mistyy · The Academy"
      title="The Academy"
      description="Masterclasses and structured learning in creative intelligence, image-making and visual direction."
    />
  );
}
