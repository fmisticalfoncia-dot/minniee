import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/site/placeholder-page";

export const metadata: Metadata = {
  title: "Customer Account",
  description: "Your private client room: orders, editions, lessons and saved work.",
};

export default function AccountPage() {
  return (
    <PlaceholderPage
      eyebrow="Maison Mistyy · Client Room"
      title="Customer Account"
      description="Your private client room: orders, editions, lessons and saved work."
    />
  );
}
