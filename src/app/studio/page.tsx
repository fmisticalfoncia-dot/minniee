import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/site/placeholder-page";

export const metadata: Metadata = {
  title: "The Studio",
  description: "A creative atelier for direction, photography and imagery made with — and beyond — the machine.",
};

export default function StudioPage() {
  return (
    <PlaceholderPage
      eyebrow="Maison Mistyy · The Studio"
      title="The Studio"
      description="A creative atelier for direction, photography and imagery made with — and beyond — the machine."
    />
  );
}
