import { pageMetadata } from "@/lib/site-metadata";
import Link from "next/link";

import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { servicePaths } from "@/content/service-paths";

export const metadata = pageMetadata("/hizmetlerimiz");

const services = [
  {
    id: "01",
    title: "3D Baskı ve Prototipleme",
    summary:
      "Dijital verileri, kullanım amacına uygun tolerans ve malzeme seçenekleriyle fiziksel ürünlere dönüştürüyoruz.",
    items: [
      "Endüstriyel Prototip ve Özel Parça Üretimi",
      "Figür ve Dekoratif Obje Üretimi",
      "Amaca Uygun Malzeme ve Katman Çözünürlüğü Seçimi",
      "Yüzey Kalitesini Artıran Son İşlemler",
    ],
  },
  {
    id: "02",
    title: "Yüksek Çözünürlüklü 3D Tarama",
    summary:
      "Mevcut fiziksel objelerin form ve yüzey detaylarını tarayarak tersine mühendislik, arşivleme ve dijital modelleme için referans veri oluşturuyoruz. Gerekli doğruluk ve üretime hazırlık proje özelinde değerlendirilir.",
    items: [
      "Hassas Parça ve Obje Taraması",
      "Tersine Mühendislik İçin Referans Veri Oluşturma",
      "Fiziksel Ürünlerin Dijital Arşivlenmesi",
      "Taranan Verilerin 3D Baskıya Hazırlanması",
    ],
  },
  {
    id: "03",
    title: "3D Modelleme ve Özel Tasarım",
    summary:
      "Üretim kısıtlamalarını ve malzeme dinamiklerini göz önünde bulundurarak, fikrinizi doğrudan üretilebilir 3D modellere dönüştürüyoruz.",
    items: [
      "İhtiyaca Yönelik Konsept Geliştirme",
      "Profesyonel 3D Modelleme",
      "Üretilebilirlik ve Tolerans Kontrolü",
      "Müşteri Onaylı Revizyon ve Sunum Süreci",
    ],
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Hizmetlerimiz"
        animated
        title="Fikirden Fiziksel Ürüne Entegre Üretim"
        description="İhtiyacınızın tekil bir 3D baskı, hassas bir dijital tarama veya uçtan uca özel bir üretim çözümü olup olmadığını analiz ediyor; en doğru teknolojiyi sürece dahil ediyoruz."
      >
        <Link
          href="/iletisim"
          className="inline-flex min-h-11 items-center rounded-full bg-violet-500 px-5 text-sm font-bold text-white hover:bg-violet-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
        >
          Projenizi Konuşalım
        </Link>
      </PageHero>

      <section className="site-container grid gap-5 overflow-x-clip pt-12 md:grid-cols-2" aria-label="Hizmet alanları">
        {servicePaths.map((path, index) => <Reveal key={path.id} profile="secondary" direction={index === 0 ? "left" : "right"}><article id={path.id} className="h-full scroll-mt-28 rounded-3xl border border-violet-400/20 bg-violet-500/5 p-7 transition-colors duration-300 hover:border-violet-400/45 hover:bg-violet-500/10 motion-reduce:transition-none">
          <h2 className="text-2xl font-semibold text-white">{path.title}</h2>
          <p className="mt-4 text-sm leading-7 text-zinc-300">{path.detail}</p>
          <Link href="/iletisim" className="mt-5 inline-flex min-h-11 items-center rounded text-sm text-violet-200 underline focus-visible:outline-2 focus-visible:outline-offset-4">Projenizi konuşalım</Link>
        </article></Reveal>)}
      </section>

      <section className="py-20 sm:py-28">
        <div className="site-container space-y-5">
          {services.map((service) => (
            <Reveal key={service.id} profile="secondary"><article className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 transition-colors duration-300 hover:border-violet-400/30 hover:bg-violet-500/[0.055] motion-reduce:transition-none sm:p-9 lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-violet-300">{service.id}</span>
                <h2 className="mt-7 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">{service.title}</h2>
                <p className="mt-4 max-w-lg text-base leading-7 text-zinc-400">{service.summary}</p>
              </div>
              <ul className="mx-auto grid w-full max-w-2xl self-center gap-3 sm:grid-cols-2">
                {service.items.map((item) => (
                  <li key={item} className="flex min-h-14 items-center gap-3 rounded-2xl border border-white/8 bg-black/20 px-4 text-sm text-zinc-300">
                    <span className="size-1.5 rounded-full bg-violet-400" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </article></Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
