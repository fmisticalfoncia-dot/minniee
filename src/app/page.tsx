import { SiteHeader } from "@/components/site/site-header";
import { HeroSection } from "@/components/hero/hero-section";
import { AboutSection } from "@/components/about/about-section";
import { FounderSection } from "@/components/founder/founder-section";

export default function HomePage() {
  return (
    <main
      id="main"
      tabIndex={-1}
      className="flex min-h-dvh flex-col outline-none"
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-espresso focus:px-4 focus:py-2 focus:text-xs focus:uppercase focus:tracking-[0.2em] focus:text-ivory"
      >
        Skip to content
      </a>
      <SiteHeader />
      <HeroSection className="flex-1" />
      <AboutSection />
      <FounderSection />
    </main>
  );
}
