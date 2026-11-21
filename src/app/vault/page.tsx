import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/site/placeholder-page";

export const metadata: Metadata = {
  title: "The Vault",
  description: "The private archive: original imagery, editions and reference collections held by the house.",
};

export default function VaultPage() {
  return (
    <PlaceholderPage
      eyebrow="Maison Mistyy · The Vault"
      title="The Vault"
      description="The private archive: original imagery, editions and reference collections held by the house."
    />
  );
}
