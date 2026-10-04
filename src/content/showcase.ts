import { products } from "@/content/products";

// Fotoğraf portföyü için verilen onay, ürünün mağaza yayın durumundan ayrıdır.
// Yeni bir ürün kaydı bu listeye açıkça eklenmedikçe galeride görünmez.
const publishedPhotoSlugs = new Set([
  "noel-baba-ren-geyigi-led-dekor",
  "ciri-diorama",
  "hollow-knight-figur",
  "marcus-aurelius-bustu",
  "forest-dragon-bustu",
  "lotus-buda-tutsuluk",
  "yuzuklerin-efendisi-masa-susu",
  "link-bustu",
  "sevimli-kedi-anahtarlik",
  "el-figurlu-saksi",
  "modern-ikili-vazo",
  "hayalet-kedi-figur",
  "sauron-figur",
  "tavsan-kafatasi-anahtarlik-mavi",
  "tavsan-kafatasi-anahtarlik-gri",
  "tavsan-kafatasi-anahtarlik-pembe",
  "noel-sapkali-balik-anahtarlik",
  "spider-man-venom-bustu",
  "fantastik-karambit",
  "lilith-bustu",
  "samuray-savasci-diorama",
  "karanlik-orman-buyucusu-diorama",
  "tenjin-samuray-bustu",
  "kutuda-kedi-anahtarlik",
  "mavi-canavar-iskelet-anahtarlik",
  "kutuda-foklar-anahtarlik",
  "luffy-gear-5-figur",
  "satoru-gojo-kor-bantli-figur",
  "satoru-gojo-figur",
  "chun-li-figur",
]);

const toShowcaseItem = (product: (typeof products)[number]) => ({
  slug: product.slug,
  name: product.name,
  category: product.category,
  image: product.image,
  imageAlt: product.imageAlt,
});

const selectShowcaseItems = (slugs: readonly string[]) =>
  slugs.map((slug) => {
    const product = products.find(
      (item) => item.slug === slug && publishedPhotoSlugs.has(item.slug),
    );

    if (!product) {
      throw new Error(`Vitrin ürünü bulunamadı: ${slug}`);
    }

    return toShowcaseItem(product);
  });

export type ShowcaseItem = ReturnType<typeof selectShowcaseItems>[number];

export const allShowcaseItems: readonly ShowcaseItem[] = products
  .filter((product) => publishedPhotoSlugs.has(product.slug))
  .map(toShowcaseItem);

export const homeShowcaseItems: readonly ShowcaseItem[] = selectShowcaseItems([
  "ciri-diorama",
  "forest-dragon-bustu",
  "lotus-buda-tutsuluk",
  "modern-ikili-vazo",
  "hollow-knight-figur",
]);

export const aboutShowcaseItems: readonly ShowcaseItem[] = selectShowcaseItems([
  "marcus-aurelius-bustu",
  "link-bustu",
  "samuray-savasci-diorama",
  "spider-man-venom-bustu",
]);
