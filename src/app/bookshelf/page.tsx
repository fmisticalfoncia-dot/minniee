import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/site/placeholder-page";

export const metadata: Metadata = {
  title: "The Bookshelf",
  description: "A curated shelf of reading for the creative mind — references, essays and house publications.",
};

export default function BookshelfPage() {
  return (
    <PlaceholderPage
      eyebrow="Maison Mistyy · The Bookshelf"
      title="The Bookshelf"
      description="A curated shelf of reading for the creative mind — references, essays and house publications."
    />
  );
}
