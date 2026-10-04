import { pageMetadata } from "@/lib/site-metadata";

import { ProductShowcase } from "@/components/products/product-showcase";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { motionSettings } from "@/content/motion";
import { aboutShowcaseItems } from "@/content/showcase";

export const metadata = pageMetadata("/hakkimizda");

const values = [
  [
    "Hassasiyet ve Detay",
    "Üretilen her parçanın dijital modeldeki ölçülere ve geometrik detaylara sadık kalmasını sağlıyoruz. Tasarım aşamasından son yüzey işlemine kadar her teknik detayı titizlikle değerlendiriyoruz.",
  ],
  [
    "Süreç Şeffaflığı",
    "Üretimin fiziksel sınırlarını gerçekçi şekilde analiz ediyoruz. Hangi malzemenin uygun olacağı, üretim süreleri ve teknik kısıtlamalar konularında proje başında açık iletişim kuruyoruz.",
  ],
  [
    "Sürekli Gelişim",
    "Yeni üretim yöntemlerini yakından takip ediyoruz. Yeni bir teknolojiyi, projenize ölçülebilir bir kalite, hız veya dayanıklılık kattığı durumlarda üretim hattımıza entegre ediyoruz.",
  ],
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Hakkımızda"
        animated
        title="Fikirden Üretime Bütüncül 3D Çözümler."
        description="Orbitart olarak; 3D tarama, dijital modelleme ve katmanlı imalat (3D baskı) süreçlerini tek bir merkezde birleştiriyoruz. İhtiyacınıza en uygun malzeme ve üretim teknolojisini belirleyerek, projelerinizi dijital ortamdan fiziksel formuna taşıyoruz."
      />

      <section className="py-20 sm:py-28">
        <div className="site-container grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal direction="fade" profile="secondary"><SectionHeading
            eyebrow="Yaklaşımımız"
            title="Üretim Sürecine Mühendislik ve Tasarım Odaklı Yaklaşım."
          /></Reveal>
          <Reveal direction="fade" profile="secondary"><div className="space-y-6 text-base leading-8 text-zinc-400">
            <p>
              Her proje; bir ihtiyacın tespiti veya üretilmesi gereken bir form
              ile başlar. Sürecimiz, fikrin doğru analiz edilmesi ve üretilebilir
              bir dijital modele dönüştürülmesiyle ilerler.
            </p>
            <p>
              Tarama, tasarım ve 3D baskı aşamalarını birbirini tamamlayan
              bütüncül bir iş akışı olarak kurguluyoruz. Bu sayede ölçü
              toleransları, malzeme dayanıklılığı ve yüzey kararları daha tasarım
              aşamasındayken netleştirilir.
            </p>
          </div></Reveal>
        </div>
      </section>

      <section className="border-y border-white/8 bg-white/[0.025] py-20 sm:py-28">
        <div className="site-container">
          <SectionHeading eyebrow="Değerlerimiz" title="Üretim biçimimizi belirleyen üç ilke." />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {values.map(([title, description], index) => (
              <Reveal key={title} profile="secondary" delay={index * motionSettings.secondary.rowDelay}><article className="service-card h-full">
                <span className="text-xs font-bold text-violet-300">0{index + 1} |</span>
                <h2 className="mt-12 text-2xl font-semibold text-white">{title}</h2>
                <p className="mt-4 text-sm leading-6 text-zinc-400">{description}</p>
              </article></Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProductShowcase
        eyebrow="Detay vitrini"
        title="Üretim yaklaşımımızı sonuçlarda görün."
        items={aboutShowcaseItems}
        variant="grid"
        scrollReveal
        viewAllHref="/vitrin"
      />
    </>
  );
}
