import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/site/placeholder-page";

export const metadata: Metadata = {
  title: "The Community",
  description: "A considered circle of artists, directors and students working in creative intelligence.",
};

export default function CommunityPage() {
  return (
    <PlaceholderPage
      eyebrow="Maison Mistyy · The Community"
      title="The Community"
      description="A considered circle of artists, directors and students working in creative intelligence."
    />
  );
}
