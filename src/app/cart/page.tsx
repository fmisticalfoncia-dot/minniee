import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/site/placeholder-page";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Your selection of digital products and editions, ready when you are.",
};

export default function CartPage() {
  return (
    <PlaceholderPage
      eyebrow="Maison Mistyy · Your Selection"
      title="Shopping Cart"
      description="Your selection of digital products and editions, ready when you are."
    />
  );
}
