import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/content/site-config";

const services = [
  {
    number: "01",
    title: "3D Baskı",
    description:
      "Figür, prototip ve özel parçaları ihtiyaca uygun malzeme ve detay seviyesinde üretiyoruz.",
  },
  {
    number: "02",
    title: "3D Tarama",
    description:
      "Nesneleri dijital modele dönüştürerek yeniden üretim, arşivleme ve tasarım süreçlerine hazırlıyoruz.",
  },
  {
    number: "03",
    title: "Özel Tasarım",
    description:
      "Fikrinizi teknik olarak üretilebilir, karakterli ve size özel bir 3D tasarıma dönüştürüyoruz.",
  },
] as const;

const process = [
  ["Keşif", "İhtiyacı, ölçüyü ve kullanım senaryosunu birlikte netleştiriyoruz."],
  ["Dijital üretim", "Modeli hazırlıyor, kontrol ediyor ve doğru üretim yöntemini seçiyoruz."],
  ["Son dokunuş", "Baskı, yüzey işlemi ve kalite kontrolüyle ürünü tamamlıyoruz."],
] as const;

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/8 py-16 sm:py-24 lg:py-28">
        <div className="hero-grid" aria-hidden="true" />
        <div className="site-container relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-violet-300">
              3D Tasarım · Tarama · Üretim
            </p>
            <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[0.96] tracking-[-0.06em] text-white sm:text-6xl lg:text-[5.4rem]">
              Fikri modele, modeli gerçeğe dönüştürüyoruz.
            </h1>
            <p className="mt-7 max-w-xl text-pretty text-lg leading-8 text-zinc-400">
              Orbitart, dijital tasarım ile fiziksel üretim arasındaki boşluğu;
              detay, yaratıcılık ve çağdaş teknolojiyle kapatır.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/hizmetlerimiz">Hizmetleri keşfet</ButtonLink>
              <ButtonLink href={siteConfig.storeUrl} variant="secondary" external>
                Mağazayı ziyaret et
              </ButtonLink>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              <span>Yerel üretim</span>
              <span>Kişiye özel çözüm</span>
              <span>Dijitalden fiziksele</span>
            </div>
          </div>

          <div className="orbital-stage" aria-label="Faz 2 için hazırlanan 3D ürün deneyimi alanı">
            <div className="orbital-ring orbital-ring-one" aria-hidden="true" />
            <div className="orbital-ring orbital-ring-two" aria-hidden="true" />
            <div className="orbital-ring orbital-ring-three" aria-hidden="true" />
            <div className="orbital-core">
              <span>ORBIT</span>
              <strong>3D</strong>
            </div>
            <span className="orbit-label orbit-label-top">SCAN / DESIGN</span>
            <span className="orbit-label orbit-label-bottom">PRINT / FINISH</span>
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400 backdrop-blur">
              <span>3D deneyim alanı</span>
              <span className="text-violet-300">Faz 2</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="site-container">
          <SectionHeading
            eyebrow="Neler yapıyoruz?"
            title="Tek bir fikirden, dokunabileceğiniz bir sonuca."
            description="Tarama, tasarım ve üretimi aynı yaratıcı süreçte birleştirerek kişisel projelerden özel parçalara kadar farklı ihtiyaçlara çözüm üretiyoruz."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {services.map((service) => (
              <article key={service.number} className="service-card group">
                <span className="text-xs font-bold tracking-[0.2em] text-violet-300">
                  {service.number}
                </span>
                <h3 className="mt-16 text-2xl font-semibold tracking-[-0.03em] text-white">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-zinc-400">
                  {service.description}
                </p>
                <Link
                  href="/hizmetlerimiz"
                  className="mt-7 inline-flex rounded-sm text-sm font-semibold text-violet-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
                >
                  Detayları gör <span aria-hidden="true" className="ml-2">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/8 bg-white/[0.025] py-20 sm:py-28">
        <div className="site-container grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Nasıl çalışıyoruz?"
            title="Kontrollü, şeffaf ve üretime odaklı."
            description="Her proje aynı kalıba girmez. Süreci fikrin ihtiyaçlarına göre kurar, kritik kararları üretimden önce netleştiririz."
          />
          <ol className="divide-y divide-white/10 border-t border-white/10">
            {process.map(([title, description], index) => (
              <li key={title} className="grid gap-4 py-7 sm:grid-cols-[4rem_1fr]">
                <span className="text-sm font-bold text-violet-300">0{index + 1}</span>
                <div>
                  <h3 className="text-xl font-semibold text-white">{title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="site-container rounded-[2rem] border border-violet-400/20 bg-violet-500/10 px-6 py-12 sm:px-10 lg:flex lg:items-end lg:justify-between lg:gap-10 lg:px-14 lg:py-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-300">Bir fikrin mi var?</p>
            <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              Birlikte üretilebilir hale getirelim.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-300">
              Projenin amacı, ölçüsü ve kullanım alanıyla başlayalım; doğru yolu birlikte seçelim.
            </p>
          </div>
          <div className="mt-8 lg:mt-0">
            <ButtonLink href="/iletisim">İletişime geç</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
