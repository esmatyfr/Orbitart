import type { SceneId } from "@/types/scene";

export type ProductStatus = "draft" | "review" | "published";

type ProductBase = {
  slug: string;
  name: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  storeUrl: string;
  scene: SceneId;
};

export type DraftProduct = ProductBase & {
  status: "draft" | "review";
  model: string | null;
};

export type PublishedProduct = ProductBase & {
  status: "published";
  model: string | null;
};

export type Product = DraftProduct | PublishedProduct;

export function isPublishedProduct(
  product: Product,
): product is PublishedProduct {
  return product.status === "published";
}
