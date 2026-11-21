import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/site/placeholder-page";

export const metadata: Metadata = {
  title: "The Marketplace",
  description: "Digital products, presets, templates and editions from the Maison Mistyy studio.",
};

export default function MarketplacePage() {
  return (
    <PlaceholderPage
      eyebrow="Maison Mistyy · The Marketplace"
      title="The Marketplace"
      description="Digital products, presets, templates and editions from the Maison Mistyy studio."
    />
  );
}
