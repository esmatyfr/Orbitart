import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import { HeaderSurface } from "@/components/layout/header-surface";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { siteConfig } from "@/content/site-config";

const navigation = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/vitrin", label: "Vitrin" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/hizmetlerimiz", label: "Hizmetlerimiz" },
  { href: "/iletisim", label: "İletişim" },
] as const satisfies readonly { href: Route; label: string }[];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50">
      <HeaderSurface />
      <div className="header-container relative grid min-h-18 grid-cols-[auto_1fr_auto] items-center gap-3 lg:gap-6">
        <Link
          href="/"
          className="flex min-h-11 items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
          aria-label="Orbitart ana sayfa"
        >
          <Image
            src="/images/brand/orbitart-orbital-logo.svg"
            alt=""
            width={1300}
            height={256}
            className="h-auto w-[200px] sm:w-[224px]"
            loading="eager"
            unoptimized
          />
        </Link>

        <nav className="hidden items-center justify-self-center gap-5 lg:flex xl:gap-7" aria-label="Ana menü">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-sm text-sm font-medium text-zinc-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-2">
          <a
            href={siteConfig.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center justify-center rounded-full bg-violet-500 px-5 text-sm font-bold text-white transition-colors hover:bg-violet-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300 sm:inline-flex"
          >
            Mağazaya Git
          </a>

          <MobileNavigation>
            <nav
              className="absolute right-0 top-14 w-[min(21rem,calc(100vw-2.5rem))] rounded-3xl border border-white/10 bg-[#11101a] p-4"
              aria-label="Mobil menü"
            >
              <div className="grid gap-1">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-2xl px-4 py-3 text-base font-medium text-zinc-200 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-violet-300"
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href={siteConfig.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 rounded-2xl bg-violet-500 px-4 py-3 text-center text-sm font-bold text-white hover:bg-violet-400 focus-visible:outline-2 focus-visible:outline-violet-300"
                >
                  Mağazaya Git
                </a>
              </div>
            </nav>
          </MobileNavigation>
        </div>
      </div>
    </header>
  );
}
