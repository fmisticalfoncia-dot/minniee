"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Content stays visible without JavaScript or IntersectionObserver. */
export function ScrollReveal({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = root.current;
    if (!container || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = Array.from(
      container.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.removeAttribute("data-reveal-pending");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" },
    );

    items.forEach((item) => {
      // Do not hide content that is already visible when hydration completes.
      if (item.getBoundingClientRect().top > window.innerHeight) {
        item.setAttribute("data-reveal-pending", "");
        observer.observe(item);
      }
    });

    return () => {
      observer.disconnect();
      items.forEach((item) => item.removeAttribute("data-reveal-pending"));
    };
  }, []);

  return <div ref={root}>{children}</div>;
}
