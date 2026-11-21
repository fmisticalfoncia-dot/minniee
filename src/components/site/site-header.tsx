"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { PRIMARY_NAV, SITE, UTILITY_NAV } from "@/lib/site";
import { BrandMark } from "@/components/site/brand-mark";
import { UtilityActions } from "@/components/site/utility-actions";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/**
 * Premium editorial navigation: a slim announcement rule, the wordmark
 * between hairline ornaments, a centred link rail, and utility actions.
 * Below `xl` the rail collapses into an accessible slide-out drawer rather
 * than compressing eight links into the bar.
 */
export function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  // Every link in the drawer closes it as it navigates; Escape and the
  // overlay are handled by the dialog primitive.
  const close = React.useCallback(() => setOpen(false), []);

  return (
    <header className="sticky top-0 z-40 border-b border-espresso/10 bg-ivory/85 backdrop-blur-md">
      {/* Slim house rule — restrained, editorial, never a marketing banner. */}
      <div className="hidden border-b border-espresso/8 lg:block">
        <div className="mx-auto flex h-9 max-w-[100rem] items-center justify-between px-8 xl:px-12">
          <p className="eyebrow text-[0.5625rem] text-muted-foreground">
            {SITE.location}
          </p>
          <p className="eyebrow text-[0.5625rem] text-muted-foreground">
            Creative Direction · AI · Education
          </p>
        </div>
      </div>

      <div className="relative mx-auto flex h-[4.5rem] max-w-[100rem] items-center justify-between gap-6 px-5 sm:px-8 lg:h-20 xl:px-12">
        <BrandMark className="shrink-0 sm:hidden min-[1440px]:inline-flex" />
        <BrandMark
          monogram
          className="hidden shrink-0 sm:inline-flex min-[1440px]:hidden"
        />

        <nav
          aria-label="Primary"
          className="hidden flex-1 justify-center min-[1440px]:flex"
        >
          <ul className="flex items-center gap-3.5 2xl:gap-6">
            {PRIMARY_NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative inline-flex flex-col items-center py-2 text-[0.6875rem] font-normal uppercase tracking-[0.125em] transition-colors duration-300",
                      active
                        ? "text-espresso"
                        : "text-espresso/65 hover:text-espresso",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-champagne transition-transform duration-500 ease-out",
                        active
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <UtilityActions className="hidden md:flex" />

          <span
            aria-hidden
            className="mx-2 hidden h-5 w-px bg-espresso/12 md:block"
          />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className="group inline-flex size-10 items-center justify-center text-espresso/80 transition-colors duration-300 hover:text-espresso focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-espresso/50 min-[1440px]:hidden"
            >
              <Menu className="size-5" strokeWidth={1.15} />
            </SheetTrigger>

            <SheetContent side="right" className="px-0">
              <SheetHeader className="border-b border-espresso/10 pb-7">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <BrandMark size="lg" />
              </SheetHeader>

              <div className="flex-1 overflow-y-auto overscroll-contain">
                <nav aria-label="Primary — mobile" className="px-7 py-7">
                  <ul className="flex flex-col">
                    {PRIMARY_NAV.map((item, index) => {
                      const active =
                        item.href === "/"
                          ? pathname === "/"
                          : pathname.startsWith(item.href);
                      return (
                        <li
                          key={item.href}
                          className="border-b border-espresso/8"
                        >
                          <Link
                            href={item.href}
                            aria-current={active ? "page" : undefined}
                            onClick={close}
                            className={cn(
                              "group flex items-baseline justify-between py-4 transition-colors duration-300",
                              active
                                ? "text-espresso"
                                : "text-espresso/70 hover:text-espresso",
                            )}
                          >
                            <span className="font-serif text-[1.6rem] font-light leading-none tracking-[0.01em]">
                              {item.label}
                            </span>
                            <span className="eyebrow text-[0.5rem] text-champagne">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <div className="px-7 pb-8">
                  <p className="eyebrow mb-4 text-[0.5625rem] text-muted-foreground">
                    Account
                  </p>
                  <ul className="flex flex-col gap-1">
                    {UTILITY_NAV.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={close}
                          className="flex items-center justify-between py-2.5 text-sm tracking-[0.02em] text-espresso/75 transition-colors hover:text-espresso"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-espresso/10 px-7 py-6">
                <p className="font-serif text-lg italic leading-snug text-espresso/70">
                  {SITE.tagline}
                </p>
                <p className="eyebrow mt-4 text-[0.5rem] text-muted-foreground">
                  {SITE.location}
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
