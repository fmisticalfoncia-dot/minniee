import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/site/placeholder-page";

export const metadata: Metadata = {
  title: "Search",
  description: "Search across the house — studio work, academy lessons, the bookshelf and the marketplace.",
};

export default function SearchPage() {
  return (
    <PlaceholderPage
      eyebrow="Maison Mistyy · Search the House"
      title="Search"
      description="Search across the house — studio work, academy lessons, the bookshelf and the marketplace."
    />
  );
}
