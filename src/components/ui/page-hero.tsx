import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/8 py-20 sm:py-28 lg:py-32">
      <div className="page-glow" aria-hidden="true" />
      <div className="site-container relative">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-violet-300">
          {eyebrow}
        </p>
        <h1 className="max-w-5xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-zinc-400">
          {description}
        </p>
        {children ? <div className="mt-9">{children}</div> : null}
      </div>
    </section>
  );
}
