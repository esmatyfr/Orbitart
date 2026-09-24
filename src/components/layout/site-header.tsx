import Link from "next/link";

import { siteConfig } from "@/content/site-config";

const navigation = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/hizmetlerimiz", label: "Hizmetlerimiz" },
  { href: "/iletisim", label: "İletişim" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#09080f]/88 backdrop-blur-xl">
      <div className="site-container grid min-h-18 grid-cols-[auto_1fr_auto] items-center gap-3 lg:gap-6">
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
          aria-label="Orbitart ana sayfa"
        >
          <span className="brand-mark" aria-hidden="true">
            O
          </span>
          <span className="leading-none">
            <span className="block text-sm font-black tracking-[0.2em] text-white">
              ORBITART
            </span>
            <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.24em] text-violet-300">
              3D Studio
            </span>
          </span>
        </Link>

        <nav className="hidden items-center justify-self-center gap-7 lg:flex" aria-label="Ana menü">
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

          <details className="mobile-navigation relative lg:hidden">
            <summary className="flex size-11 cursor-pointer list-none items-center justify-center rounded-full border border-white/15 bg-white/5 text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300">
              <span className="sr-only">Menüyü aç</span>
              <span className="menu-icon" aria-hidden="true" />
            </summary>
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
          </details>
        </div>
      </div>
    </header>
  );
}
