import Link from "next/link";

import { siteConfig } from "@/content/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-black/20 py-12 sm:py-16">
      <div className="site-container grid gap-10 md:grid-cols-[1.2fr_1.6fr]">
        <div>
          <p className="text-lg font-black tracking-[0.2em] text-white">ORBITART</p>
          <p className="mt-4 max-w-md text-sm leading-6 text-zinc-400">
            Fikirleri tarama, tasarım ve katmanlı üretimle fiziksel dünyaya
            taşıyan yaratıcı 3D stüdyo.
          </p>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
            {siteConfig.location}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:gap-12">
          <div>
            <h2 className="text-sm font-semibold text-white">Keşfet</h2>
            <ul className="mt-4 space-y-3 text-sm text-zinc-400">
              <li><Link className="hover:text-white" href="/vitrin">Vitrin</Link></li>
              <li><Link className="hover:text-white" href="/hakkimizda">Hakkımızda</Link></li>
              <li><Link className="hover:text-white" href="/hizmetlerimiz">Hizmetlerimiz</Link></li>
              <li><Link className="hover:text-white" href="/iletisim">İletişim</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Bağlantılar</h2>
            <ul className="mt-4 space-y-3 text-sm text-zinc-400">
              <li>
                <a href={siteConfig.storeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Online mağaza
                </a>
              </li>
              <li>
                <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Instagram
                </a>
              </li>
              <li>
                <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="site-container mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-6 text-xs text-zinc-500">
        <p>© {new Date().getFullYear()} Orbitart. Tüm hakları saklıdır.</p>
        <Link href={siteConfig.modelCreditsPath} className="inline-flex min-h-11 items-center rounded-sm hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300">Model kaynakları</Link>
      </div>
    </footer>
  );
}
