import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button-link";
import { InstagramIcon, ShopIcon, WhatsAppIcon } from "@/components/ui/icons";
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "3D baskı, tarama veya özel tasarım projeniz için Orbitart ile iletişime geçin.",
};

export default function ContactPage() {
  return (
    <section className="py-10 sm:py-16">
      <div className="site-container grid gap-5 md:grid-cols-3">
        <article className="contact-card flex flex-col">
          <span className="contact-icon">
            <WhatsAppIcon className="size-6" />
          </span>
          <h2 className="mt-8 text-2xl font-semibold text-white">WhatsApp</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            {siteConfig.whatsappNumber}
          </p>
          <div className="mt-auto pt-8">
            <ButtonLink href={siteConfig.whatsappUrl} external>Mesaj gönder</ButtonLink>
          </div>
        </article>

        <article className="contact-card flex flex-col">
          <span className="contact-icon">
            <InstagramIcon className="size-6" />
          </span>
          <h2 className="mt-8 text-2xl font-semibold text-white">Instagram</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            @orbitart_3d
          </p>
          <div className="mt-auto pt-8">
            <ButtonLink href={siteConfig.instagramUrl} variant="secondary" external>
              Profili aç
            </ButtonLink>
          </div>
        </article>

        <article className="contact-card flex flex-col">
          <span className="contact-icon">
            <ShopIcon className="size-6" />
          </span>
          <h2 className="mt-8 text-2xl font-semibold text-white">Online mağaza</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            orbitart.com.tr
          </p>
          <div className="mt-auto pt-8">
            <ButtonLink href={siteConfig.storeUrl} variant="secondary" external>
              Mağazaya git
            </ButtonLink>
          </div>
        </article>
      </div>

      <div className="site-container mt-12">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-violet-300">İyi bir başlangıç için</p>
          <div className="mt-6 grid gap-5 text-sm leading-6 text-zinc-400 sm:grid-cols-3">
            <p><strong className="block text-white">01 · Görsel</strong> Varsa ürünün veya fikrin referans fotoğrafını ekle.</p>
            <p><strong className="block text-white">02 · Ölçü</strong> Yaklaşık en, boy ve yükseklik bilgisini paylaş.</p>
            <p><strong className="block text-white">03 · Amaç</strong> Ürünün nerede ve nasıl kullanılacağını belirt.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
