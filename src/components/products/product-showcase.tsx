import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";

import type { ShowcaseItem } from "@/content/showcase";

type ProductShowcaseProps = {
  eyebrow: string;
  title: string;
  description?: string;
  items: readonly ShowcaseItem[];
  variant?: "mosaic" | "grid";
  viewAllHref?: Route;
  scrollReveal?: boolean;
  compact?: boolean;
};

const mosaicLayouts = [
  "col-span-2 row-span-2 sm:col-span-4 lg:col-span-5",
  "col-span-1 sm:col-span-2 lg:col-span-3",
  "col-span-1 sm:col-span-2 lg:col-span-4",
  "col-span-1 sm:col-span-2 lg:col-span-3",
  "col-span-1 sm:col-span-2 lg:col-span-4",
  "col-span-2 sm:col-span-4 lg:col-span-5",
] as const;

function ShowcaseFigure({ item, isMosaic, featured = false, className = "", accentOnHover = false }: {
  item: ShowcaseItem;
  isMosaic: boolean;
  featured?: boolean;
  className?: string;
  accentOnHover?: boolean;
}) {
  return (
    <figure className={`group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-950 ${accentOnHover ? "transition-[border-color,box-shadow] duration-300 hover:border-violet-400/50 hover:shadow-[0_0_24px_#8b5cf61a] motion-reduce:transition-none" : ""} ${className}`}>
      <Image src={item.image} alt={item.imageAlt} fill
        sizes={isMosaic ? "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 42vw" : "(max-width: 1023px) 50vw, 25vw"}
        className={`${featured ? "object-contain object-center" : "object-cover object-center"} transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transform-none ${accentOnHover ? "motion-reduce:scale-100" : ""}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-transparent" aria-hidden="true" />
      <figcaption className={`absolute inset-x-0 bottom-0 ${accentOnHover ? "p-3 min-[360px]:p-4 sm:p-5" : "p-4 sm:p-5"}`}>
        <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-violet-200">{item.category}</span>
        <h3 className={`mt-1 font-semibold text-white ${accentOnHover ? "text-sm min-[360px]:text-base sm:text-lg" : "text-base sm:text-lg"}`}>{item.name}</h3>
      </figcaption>
    </figure>
  );
}

export function ProductShowcase({
  eyebrow,
  title,
  description,
  items,
  variant = "mosaic",
  viewAllHref,
  scrollReveal = false,
  compact = false,
}: ProductShowcaseProps) {
  const isMosaic = variant === "mosaic";
  const featured = items[0];
  const splitReveal = scrollReveal && isMosaic && items.length === 5 && featured;
  const galleryReveal = scrollReveal && !isMosaic;

  const heading = (
        <div className={`grid gap-6 ${description ? "lg:grid-cols-[0.9fr_1.1fr] lg:items-end" : ""}`}>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-violet-300">
              {eyebrow}
            </p>
            <h2
              id={`${variant}-showcase-title`}
              className={`mt-4 ${description ? "max-w-2xl text-balance" : "max-w-none text-wrap"} text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl`}
            >
              {title}
            </h2>
          </div>
          {description ? <p className="max-w-2xl text-pretty text-sm leading-7 text-zinc-400 lg:justify-self-end">
            {description}
          </p> : null}
        </div>
  );

  return (
    <section className={`${compact ? "pb-16 pt-10 sm:pb-24 sm:pt-14" : "py-20 sm:py-28"} ${scrollReveal ? "overflow-x-clip" : ""}`} aria-labelledby={`${variant}-showcase-title`}>
      <div className="site-container">
        {galleryReveal ? <Reveal direction="fade" profile="secondary">{heading}</Reveal> : heading}
        <div
          className={
            isMosaic
              ? "mt-12 grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] sm:grid-cols-4 lg:auto-rows-[15rem] lg:grid-cols-12"
              : "mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4"
          }
        >
          {splitReveal ? <>
            <Reveal direction="left" className={mosaicLayouts[0]}>
              <ShowcaseFigure item={featured} isMosaic featured className="h-full" />
            </Reveal>
            <Reveal direction="right" className="col-span-2 row-span-2 grid grid-cols-2 gap-3 sm:col-span-4 sm:grid-cols-4 lg:col-span-7 lg:grid-cols-7">
              {items.slice(1).map((item, index) => <ShowcaseFigure key={item.slug} item={item} isMosaic
                className={index % 2 === 0 ? "col-span-1 sm:col-span-2 lg:col-span-3" : "col-span-1 sm:col-span-2 lg:col-span-4"} />)}
            </Reveal>
          </> : galleryReveal ? items.map((item, index) => (
            <Reveal key={item.slug} className="aspect-[4/5]" profile="secondary" staggerIndex={index}>
              <ShowcaseFigure item={item} isMosaic={false} className="h-full" accentOnHover />
            </Reveal>
          )) : items.map((item, index) => (
            <ShowcaseFigure key={item.slug} item={item} isMosaic={isMosaic} featured={isMosaic && index === 0}
              className={isMosaic ? (mosaicLayouts[index] ?? "col-span-1 sm:col-span-2 lg:col-span-3") : "aspect-[4/5]"} />
          ))}
        </div>

        {viewAllHref ? (
          <div className="mt-5 flex justify-end">
            <Link
              href={viewAllHref}
              className="rounded-sm text-sm font-semibold text-violet-200 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
            >
              Tüm vitrini gör <span aria-hidden="true">→</span>
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
