"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  X,
} from "lucide-react";
import {
  GALLERY_IMAGES,
  imageDisplayCode,
  type GalleryImage,
} from "./gallery-data";

function Photograph({
  image,
  detail = false,
}: {
  image: GalleryImage;
  detail?: boolean;
}) {
  const [failed, setFailed] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div
      className={`relative grid place-items-center bg-beige ${detail ? "min-h-[15rem] lg:min-h-[30rem]" : "aspect-[4/5]"}`}
    >
      {failed ? (
        <p className="px-5 text-center text-sm leading-relaxed text-muted-foreground">
          Image unavailable. Please try again later.
        </p>
      ) : (
        // A plain image and object-contain preserve the whole original file.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image.src}
          alt={image.alt}
          loading={detail ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`${loaded ? "gallery-image-loaded" : ""} ${detail ? "max-h-[65vh] w-full object-contain" : "absolute inset-0 size-full object-contain"}`}
        />
      )}
    </div>
  );
}

function ImageDetails({ image }: { image: GalleryImage }) {
  const code = imageDisplayCode(image);
  const [promptStatus, setPromptStatus] = React.useState("");
  const [codeStatus, setCodeStatus] = React.useState("");

  async function copyText(
    text: string,
    setStatus: (message: string) => void,
    successMessage: string,
  ) {
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(text);
      setStatus(successMessage);
    } catch {
      setStatus("Could not copy. Please select and copy the text manually.");
    }
  }

  const buttonClass =
    "inline-flex items-center gap-2 border border-espresso/25 px-4 py-3 text-[0.625rem] font-medium uppercase tracking-[0.13em] text-espresso transition-colors hover:border-champagne disabled:cursor-not-allowed disabled:opacity-45";

  return (
    <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
      <Photograph key={image.id} image={image} detail />
      <div className="min-w-0">
        <p className="eyebrow text-[0.5625rem] leading-relaxed text-muted-foreground">
          Creative category · {image.category}
        </p>
        <Dialog.Title className="mt-4 font-serif text-[clamp(2rem,4vw,3.3rem)] font-light leading-[1.05]">
          {image.title}
        </Dialog.Title>
        <Dialog.Description className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Original photography from the Maison Mistyy archive.
        </Dialog.Description>

        <div className="mt-8 border-t border-espresso/15 pt-6">
          <h4 className="eyebrow text-[0.625rem] leading-relaxed">
            AI Image Generation Prompt
          </h4>
          <p className="mt-4 whitespace-pre-wrap text-sm leading-[1.8] text-muted-foreground">
            {image.prompt ||
              "Review required: this photograph must be visually inspected before its image-generation prompt can be prepared."}
          </p>
          <button
            type="button"
            className={`${buttonClass} mt-5`}
            disabled={!image.prompt}
            onClick={() =>
              image.prompt &&
              copyText(image.prompt, setPromptStatus, "Prompt copied successfully.")
            }
          >
            {promptStatus === "Prompt copied successfully." ? (
              <Check aria-hidden size={14} />
            ) : (
              <Copy aria-hidden size={14} />
            )}{" "}
            Copy Image Prompt
          </button>
          <p
            className="mt-2 min-h-5 text-xs text-muted-foreground"
            role="status"
          >
            {promptStatus ||
              (!image.prompt ? "Prompt copying is unavailable until review is complete." : "")}
          </p>
        </div>

        <div className="mt-6 border-t border-espresso/15 pt-6">
          <h4 className="eyebrow text-[0.625rem] leading-relaxed">
            JavaScript Image-Display Code
          </h4>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Display the original image on a web page. This code does not
            generate images; image generation requires a connected service or API.
          </p>
          <pre className="mt-4 max-h-48 overflow-auto whitespace-pre-wrap break-all border border-espresso/10 bg-background p-4 text-xs leading-relaxed text-espresso/80">
            <code>{code}</code>
          </pre>
          <button
            type="button"
            className={`${buttonClass} mt-5`}
            onClick={() => copyText(code, setCodeStatus, "JavaScript code copied successfully.")}
          >
            {codeStatus === "JavaScript code copied successfully." ? (
              <Check aria-hidden size={14} />
            ) : (
              <Copy aria-hidden size={14} />
            )}{" "}
            Copy JavaScript Code
          </button>
          <p
            className="mt-2 min-h-5 text-xs text-muted-foreground"
            role="status"
          >
            {codeStatus}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FeaturedGallery() {
  const [category, setCategory] = React.useState("all");
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const lastTrigger = React.useRef<HTMLButtonElement | null>(null);
  const categories = Array.from(
    new Set(GALLERY_IMAGES.map((image) => image.category)),
  );
  const visible =
    category === "all"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((image) => image.category === category);
  const selectedIndex = visible.findIndex((image) => image.id === activeId);
  const selected = visible[selectedIndex];

  return (
    <Dialog.Root
      open={Boolean(selected)}
      onOpenChange={(open) => {
        if (!open) setActiveId(null);
      }}
    >
      <div className="mt-12 flex flex-wrap items-end justify-between gap-5 border-b border-espresso/15 pb-5 sm:mt-16">
        <p className="eyebrow text-[0.5625rem] leading-relaxed text-muted-foreground">
          Selected works · {String(visible.length).padStart(2, "0")}
        </p>
        <label className="flex flex-wrap items-center gap-3 text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
          Creative category
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="max-w-full border border-espresso/20 bg-background px-3 py-2 text-xs normal-case tracking-normal text-espresso"
          >
            <option value="all">All categories</option>
            {categories.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-7 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8">
        {visible.map((image) => (
          <article key={image.id} className="min-w-0">
            <button
              type="button"
              className="group block w-full text-left"
              onClick={(event) => {
                lastTrigger.current = event.currentTarget;
                setActiveId(image.id);
              }}
              aria-label={`View details for ${image.title}`}
            >
              <Photograph image={image} />
              <span className="mt-4 flex items-start justify-between gap-4 border-b border-espresso/12 pb-4 transition-colors duration-500 group-hover:border-champagne">
                <span>
                  <span className="block font-serif text-2xl font-light leading-tight">
                    {image.title}
                  </span>
                  <span className="eyebrow mt-2 block text-[0.5rem] leading-relaxed text-muted-foreground">
                    {image.category}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="mt-1 size-4 shrink-0 text-champagne transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  strokeWidth={1.3}
                />
              </span>
            </button>
          </article>
        ))}
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-espresso/55" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 max-h-[90dvh] w-[min(94vw,72rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-ivory p-5 shadow-[0_24px_90px_-20px_rgba(53,37,31,0.5)] sm:p-8 lg:p-10"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            lastTrigger.current?.focus();
          }}
        >
          {selected && (
            <>
              <div className="mb-6 flex items-center justify-between gap-4 border-b border-espresso/15 pb-4">
                <span className="eyebrow text-[0.5625rem] leading-relaxed text-muted-foreground">
                  Selected work · {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                  {String(visible.length).padStart(2, "0")}
                </span>
                <Dialog.Close
                  className="grid size-10 place-items-center text-espresso transition-colors hover:text-champagne"
                  aria-label="Close image details"
                >
                  <X aria-hidden size={20} strokeWidth={1.3} />
                </Dialog.Close>
              </div>
              <ImageDetails key={selected.id} image={selected} />
              <div className="mt-7 flex items-center justify-between gap-4 border-t border-espresso/15 pt-5">
                <button
                  type="button"
                  disabled={selectedIndex === 0}
                  onClick={() => setActiveId(visible[selectedIndex - 1].id)}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] transition-colors hover:text-champagne disabled:opacity-35"
                >
                  <ArrowLeft aria-hidden size={15} /> Previous
                </button>
                <button
                  type="button"
                  disabled={selectedIndex === visible.length - 1}
                  onClick={() => setActiveId(visible[selectedIndex + 1].id)}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] transition-colors hover:text-champagne disabled:opacity-35"
                >
                  Next <ArrowRight aria-hidden size={15} />
                </button>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
