import type { Metadata } from "next";

import { modelAssets } from "@/content/model-assets";

export const metadata: Metadata = {
  title: "Model kaynakları ve lisanslar",
  description: "Ana sayfadaki temsili 3D modellerin üretici, kaynak, lisans ve değişiklik bilgileri.",
};

export default function ModelCreditsPage() {
  return (
    <section aria-labelledby="model-sources-title" className="site-container py-12 sm:py-20">
      <h1 id="model-sources-title" className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">Model kaynakları ve lisanslar</h1>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-300">Ana sayfadaki modeller hizmetleri temsil eder. Gerçek ürün fotoğraflarından ayrı bir seçkidir; harici modeller Orbitart&apos;ın özgün üretimi veya satış ürünü olarak sunulmaz.</p>
      <ul className="mt-8 grid gap-5 md:grid-cols-2">
        {modelAssets.map(asset => <li key={asset.id} className="rounded-3xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white">{asset.name}</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-300">{asset.attribution ?? asset.modifications}</p>
          {asset.sourceUrl && <div className="mt-4 flex flex-wrap gap-5 text-sm text-violet-200">
            <a href={asset.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded underline focus-visible:outline-2 focus-visible:outline-offset-4">Kaynak ve üretici</a>
            {asset.licenseUrl && <a href={asset.licenseUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded underline focus-visible:outline-2 focus-visible:outline-offset-4">{asset.licenseName}</a>}
          </div>}
          {asset.id === "a4-blade-of-chaos" && <p className="mt-4 text-xs leading-6 text-zinc-400">Kaynak sanatçı God of War konseptlerine dayandığını ve bu konseptlerin hakları konusunda belirsizlik bulunduğunu belirtir. Modelin CC BY lisans kaydı, ilgili karakter ve konsept haklarına sahip olunduğu iddiası değildir.</p>}
        </li>)}
      </ul>
    </section>
  );
}
