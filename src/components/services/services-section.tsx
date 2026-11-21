import { ScrollReveal } from "@/components/about/scroll-reveal";
import { getImage } from "@/lib/images";
import { ServiceCard } from "./service-card";
import { SERVICES } from "./services-data";
import "./services.css";

export function ServicesSection() {
  const [studio, ...otherServices] = SERVICES;

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="services-section relative bg-background text-espresso"
    >
      <ScrollReveal>
        <div className="mx-auto max-w-[100rem] px-5 pb-24 sm:px-8 sm:pb-32 xl:px-12 xl:pb-40">
          <div className="border-t border-espresso/15 pt-6" data-reveal>
            <div className="flex items-center justify-between gap-5">
              <h2
                id="services-heading"
                className="eyebrow text-[0.625rem] leading-relaxed text-muted-foreground"
              >
                Our Services
              </h2>
              <span aria-hidden className="h-px w-10 bg-champagne sm:w-16" />
            </div>
            <div className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.65fr)] lg:items-end lg:gap-16">
              <p className="max-w-[46rem] font-serif text-[clamp(2.8rem,5vw,5rem)] font-light leading-[0.98] tracking-[-0.015em]">
                Creative Possibilities,{" "}
                <span className="italic">Thoughtfully Directed.</span>
              </p>
              <p className="max-w-[28rem] text-[0.95rem] leading-[1.9] text-muted-foreground sm:text-base lg:pb-1">
                From AI-powered visual experiences to creative education and
                digital resources, discover the services designed to help you
                imagine, create and grow.
              </p>
            </div>
          </div>

          <div className="mt-12 sm:mt-16">
            <ServiceCard
              service={studio}
              index={0}
              image={getImage("image-07")}
              featured
            />
            <div className="mt-4 grid gap-4 lg:grid-cols-2 sm:mt-5 sm:gap-5">
              {otherServices.map((service, index) => (
                <ServiceCard
                  key={service.href}
                  service={service}
                  index={index + 1}
                  image={index === 0 ? getImage("image-08") : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
