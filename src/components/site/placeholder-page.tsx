import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { SiteHeader } from "@/components/site/site-header";
import { SITE } from "@/lib/site";

/**
 * A deliberately minimal holding page for routes whose sections have not
 * been designed yet. It exists so every navigation and CTA destination is
 * real and navigable, without pretending the section is built.
 */
export function PlaceholderPage({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <main id="main" className="flex min-h-dvh flex-col">
      <SiteHeader />

      <section className="paper-grain flex flex-1 items-center">
        <div className="mx-auto w-full max-w-[100rem] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="max-w-[42rem]">
            <p className="eyebrow flex items-center gap-3 text-[0.5625rem] text-muted-foreground">
              <span aria-hidden className="h-px w-8 bg-champagne" />
              {eyebrow}
            </p>

            <h1 className="mt-6 font-serif text-[clamp(2.4rem,5.2vw,3.75rem)] font-light leading-[1.02] tracking-[-0.01em] text-balance text-espresso">
              {title}
            </h1>

            <p className="mt-6 max-w-[32rem] text-pretty leading-[1.75] text-espresso/70">
              {description}
            </p>

            <p className="mt-8 flex items-center gap-3 text-[0.6875rem] uppercase tracking-[0.22em] text-muted-foreground">
              <span aria-hidden className="size-1 rounded-full bg-champagne" />
              In development — coming in the next stage
            </p>

            <Link
              href="/"
              className="group mt-12 inline-flex items-center gap-3 border-b border-espresso/25 pb-2 text-[0.6875rem] uppercase tracking-[0.22em] text-espresso transition-colors duration-300 hover:border-espresso/70"
            >
              <ArrowLeft
                aria-hidden
                className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1"
                strokeWidth={1.4}
              />
              Return to the house
            </Link>
          </div>
        </div>
      </section>

      {children}

      <footer className="border-t border-espresso/10">
        <div className="mx-auto flex max-w-[100rem] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <p className="eyebrow text-[0.5rem] text-muted-foreground">
            {SITE.name}
          </p>
          <p className="eyebrow text-[0.5rem] text-muted-foreground">
            {SITE.tagline}
          </p>
        </div>
      </footer>
    </main>
  );
}
