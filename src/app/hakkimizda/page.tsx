import type { Metadata } from "next";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Orbitart'ın 3D tasarım, tarama ve katmanlı üretime yaklaşımını keşfedin.",
};

const values = [
  ["Detay", "Modelden son yüzeye kadar her aşamada ürünü taşıyan küçük kararları önemsiyoruz."],
  ["Şeffaflık", "Teknik sınırları, seçenekleri ve üretim kararlarını proje başında açıkça konuşuyoruz."],
  ["Merak", "Yeni yöntemleri yalnızca yeni oldukları için değil, daha iyi bir sonuç ürettikleri zaman kullanıyoruz."],
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Orbitart hakkında"
        title="Dijital zanaat ile fiziksel üretimin kesişimindeyiz."
        description="Orbitart; tarama, modelleme, 3D baskı ve son işlemi tek bir yaratıcı üretim yaklaşımında buluşturur."
      />

      <section className="py-20 sm:py-28">
        <div className="site-container grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="Yaklaşımımız"
            title="Teknolojiyi gösteri için değil, iyi fikirleri mümkün kılmak için kullanıyoruz."
          />
          <div className="space-y-6 text-base leading-8 text-zinc-400">
            <p>
              Her proje bir nesneyle, bir ihtiyaçla veya henüz tam biçimini
              bulmamış bir fikirle başlar. Önce doğru soruları sorar, ardından
              fikri üretilebilir bir dijital modele dönüştürürüz.
            </p>
            <p>
              Tarama, tasarım ve baskıyı birbirinden kopuk hizmetler olarak
              değil; aynı sonuca çalışan bir bütün olarak ele alırız. Bu sayede
              ölçü, materyal ve yüzey kararları daha ilk aşamadan kontrol altında
              kalır.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/8 bg-white/[0.025] py-20 sm:py-28">
        <div className="site-container">
          <SectionHeading eyebrow="Değerlerimiz" title="Üretim biçimimizi belirleyen üç ilke." />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {values.map(([title, description], index) => (
              <article key={title} className="service-card">
                <span className="text-xs font-bold text-violet-300">0{index + 1}</span>
                <h2 className="mt-12 text-2xl font-semibold text-white">{title}</h2>
                <p className="mt-4 text-sm leading-6 text-zinc-400">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
