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
    title: "3D Baskı",
    summary: "Dijital modeli fiziksel ürüne dönüştüren kontrollü üretim.",
    items: ["Figür ve dekoratif obje", "Prototip ve özel parça", "Malzeme ve katman ayarı", "Yüzey ve son işlem"],
  },
  {
    id: "02",
    title: "3D Tarama",
    summary: "Mevcut nesnenin formunu yeniden kullanılabilir dijital veriye dönüştürme.",
    items: ["Nesne ve parça tarama", "Dijital arşiv", "Tersine mühendislik başlangıcı", "Baskıya hazırlık"],
  },
  {
    id: "03",
    title: "Özel Tasarım",
    summary: "Fikre, kullanıma ve üretim yöntemine göre geliştirilen özgün modeller.",
    items: ["Konsept geliştirme", "3D modelleme", "Üretilebilirlik kontrolü", "Revizyon ve sunum"],
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Hizmetlerimiz"
        title="Fikirden fiziksel sonuca uzanan tek üretim hattı."
        description="İhtiyacın yalnızca bir baskı mı, doğru bir dijital model mi yoksa bütün süreci kapsayan özel bir çözüm mü olduğunu birlikte belirliyoruz."
      >
        <Link
          href="/iletisim"
          className="inline-flex min-h-11 items-center rounded-full bg-violet-500 px-5 text-sm font-bold text-white hover:bg-violet-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
        >
          Projeni konuşalım
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
              <ul className="grid content-start gap-3 sm:grid-cols-2">
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
