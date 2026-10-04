import { pageMetadata } from "@/lib/site-metadata";

import { ProductShowcase } from "@/components/products/product-showcase";
import { PageHero } from "@/components/ui/page-hero";
import { allShowcaseItems } from "@/content/showcase";

export const metadata = pageMetadata("/vitrin");

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
