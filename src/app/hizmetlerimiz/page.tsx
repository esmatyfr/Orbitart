import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = {
  title: "Hizmetlerimiz",
  description:
    "Orbitart 3D baskı, 3D tarama ve özel tasarım hizmetlerini inceleyin.",
};

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
      "Mevcut fiziksel objeleri milimetrik hassasiyetle tarayarak tersine mühendislik, arşivleme ve üretime hazır dijital verilere çeviriyoruz.",
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

      <section className="py-20 sm:py-28">
        <div className="site-container space-y-5">
          {services.map((service) => (
            <article key={service.id} className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 sm:p-9 lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-violet-300">{service.id}</span>
                <h2 className="mt-7 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">{service.title}</h2>
                <p className="mt-4 max-w-lg text-base leading-7 text-zinc-400">{service.summary}</p>
              </div>
              <ul className="grid w-full max-w-2xl content-start gap-3 sm:grid-cols-2 lg:justify-self-center">
                {service.items.map((item) => (
                  <li key={item} className="flex min-h-14 items-center gap-3 rounded-2xl border border-white/8 bg-black/20 px-4 text-sm text-zinc-300">
                    <span className="size-1.5 rounded-full bg-violet-400" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
