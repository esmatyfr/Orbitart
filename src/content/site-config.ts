const publicValue = (value: string | undefined, fallback: string) =>
  value?.trim() || fallback;

export const siteConfig = {
  name: "Orbitart 3D",
  shortName: "Orbitart",
  description:
    "3D baskı, 3D tarama ve özel tasarım çözümleriyle fikirleri fiziksel üretime dönüştüren yaratıcı stüdyo.",
  location: "Bodrum, Muğla",
  modelCreditsPath: "/model-kaynaklari",
  storeUrl: publicValue(
    process.env.NEXT_PUBLIC_STORE_URL,
    "https://orbitart.com.tr",
  ),
  instagramUrl: publicValue(
    process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    "https://www.instagram.com/orbitart_3d/",
  ),
  whatsappNumber: "+90 543 890 13 10",
  whatsappUrl: publicValue(
    process.env.NEXT_PUBLIC_WHATSAPP_URL,
    "https://wa.me/905438901310",
  ),
} as const;
