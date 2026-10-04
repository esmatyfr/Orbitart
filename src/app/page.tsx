import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";

import { ProductShowcase } from "@/components/products/product-showcase";
import { HomeExperience } from "@/components/three/home-experience";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { heroShowcase } from "@/content/hero-showcase";
import { publishedModelAssets } from "@/content/model-assets";
import { homeShowcaseItems } from "@/content/showcase";
import { servicePaths } from "@/content/service-paths";
import { ScanProcessSteps } from "@/components/ui/scan-process-steps";

const workProcess = [
  ["Talebinizi paylaşın", "Fikrinizi, varsa numune veya dosyanızı ve kullanım amacınızı bize iletin."],
  ["Birlikte değerlendirelim", "Kapsamı, malzemeyi, teslim süresini ve teklifi netleştirip onayınıza sunalım."],
  ["Üretim ve teslim", "Onaylanan planla ilerleyelim; son kontrol ve teslim bilgilerini sizinle paylaşalım."],
] as const;

export default function HomePage() {
  const modelsPublished = heroShowcase.every((item) =>
    publishedModelAssets.some((asset) => asset.id === item.assetId),
  );

  return (
    <>
      <HomeExperience
        enable3D={process.env.NODE_ENV === "development" || modelsPublished}
        processSteps={<ScanProcessSteps />}
      >
        <div className="story-services">
            {servicePaths.map((service) => (
              <article key={service.number} data-story-card={Number(service.number)} className="story-card service-card group">
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
                  href={`/hizmetlerimiz#${service.id}`}
                  className="mt-7 inline-flex rounded-sm text-sm font-semibold text-violet-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
                >
                  Detayları gör <span aria-hidden="true" className="ml-2">→</span>
                </Link>
              </article>
            ))}
        </div>
      </HomeExperience>

      <ProductShowcase
        eyebrow="Üretim vitrini"
        title="Detay, karakter ve yüzey kalitesi bir arada."
        description="Koleksiyon figürlerinden dekoratif objelere uzanan seçilmiş çalışmalarımızı gerçek ürün fotoğraflarıyla inceleyin. Her parça, dijital modelden son yüzey işlemine kadar kontrollü bir üretim sürecinden geçer."
        items={homeShowcaseItems}
        viewAllHref="/vitrin"
        scrollReveal
      />

      <Reveal direction="fade">
      <section className="border-y border-white/8 bg-white/[0.025] py-20 sm:py-28">
        <div className="site-container grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Nasıl çalışıyoruz?"
            title="Kontrollü, şeffaf ve üretime odaklı."
            description="Her proje aynı kalıba girmez. Süreci fikrin ihtiyaçlarına göre kurar, kritik kararları üretimden önce netleştiririz."
          />
          <ol className="divide-y divide-white/10 border-t border-white/10">
            {workProcess.map(([title, description], index) => (
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

      </Reveal>
      <Reveal direction="fade">
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
      </Reveal>
    </>
  );
}
