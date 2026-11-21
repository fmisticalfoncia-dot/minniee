export type Service = {
  title: string;
  description: string;
  offerings: readonly string[];
  cta: string;
  href: string;
};

export const SERVICES: readonly Service[] = [
  {
    title: "The Studio",
    description:
      "Premium AI-powered photography and creative direction for individuals, creators and brands.",
    offerings: [
      "AI Photoshoots",
      "Custom AI Photoshoots",
      "Personal Branding Photography",
      "Brand Campaign Visuals",
      "AI Product Photography",
      "Creative Direction",
      "Visual Content Creation",
    ],
    cta: "Explore The Studio",
    href: "/studio",
  },
  {
    title: "The Vault",
    description:
      "A curated collection of creative resources for people exploring AI-powered visual creation.",
    offerings: [
      "THE AI PHOTOSHOOT VAULT™",
      "AI Image Prompts",
      "Photoshoot Concepts",
      "Prompt Collections",
      "Visual Direction Templates",
      "Creative Inspiration",
    ],
    cta: "Explore The Vault",
    href: "/vault",
  },
  {
    title: "The Academy",
    description:
      "Learn practical creative and digital skills through guided educational experiences.",
    offerings: [
      "AI Training",
      "Online Courses",
      "Masterclasses",
      "Private Training",
      "Creative Workshops",
    ],
    cta: "Discover The Academy",
    href: "/academy",
  },
  {
    title: "The Bookshelf",
    description:
      "Discover books, guides and digital publications created to educate, inspire and empower.",
    offerings: [
      "Ebooks",
      "Digital Books",
      "Educational Guides",
      "Digital Publications",
      "BEYOND INHERITANCE",
    ],
    cta: "Visit The Bookshelf",
    href: "/bookshelf",
  },
  {
    title: "The Marketplace",
    description:
      "Explore useful digital products and resources designed for creators and entrepreneurs.",
    offerings: [
      "Digital Products",
      "Creative Templates",
      "Downloadable Guides",
      "Digital Resources",
    ],
    cta: "Explore The Marketplace",
    href: "/marketplace",
  },
  {
    title: "The Creative Lab",
    description:
      "Explore the possibilities of AI, automation and emerging creative technologies.",
    offerings: [
      "AI Experiments",
      "Creative Technology",
      "Automation Projects",
      "Innovative Creative Tools",
    ],
    cta: "Enter The Creative Lab",
    href: "/creative-lab",
  },
  {
    title: "The Community",
    description:
      "A space for creative connections, collaborations, learning and shared opportunities.",
    offerings: ["Creator Community", "Collaborations", "Events", "Networking"],
    cta: "Join The Community",
    href: "/community",
  },
];
