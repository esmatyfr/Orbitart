import type { Metadata } from "next";

import { ProductShowcase } from "@/components/products/product-showcase";
import { PageHero } from "@/components/ui/page-hero";
import { allShowcaseItems } from "@/content/showcase";

export const metadata: Metadata = {
  title: "Vitrin",
  description:
    "Orbitart'ın figür, büst, dekoratif obje ve özel üretim çalışmalarından oluşan fotoğraf vitrini.",
};

export default function ShowcasePage() {
  return (
    <>
      <PageHero
        compact
        animated
        title="Üretimlerimizi yakından inceleyin."
        description="Figürlerden büstlere, dekoratif objelerden özel tasarımlara uzanan çalışmalarımızı gerçek ürün fotoğraflarıyla bir araya getirdik."
      />

      <ProductShowcase
        eyebrow="Tüm çalışmalar"
        title="Her projede farklı bir karakter, aynı üretim disiplini."
        items={allShowcaseItems}
        variant="grid"
        scrollReveal
        compact
      />
    </>
  );
}
