import { httpsUrl, whatsappLink } from "@/lib/links";
import { sitePages } from "@/content/site-pages";

const publicValue = (value: string | undefined, fallback: string) => httpsUrl(value?.trim() || fallback);
const whatsappMessage = "Merhaba Orbitart, 3D baskı, tarama veya özel tasarım projem hakkında bilgi almak istiyorum.";
const whatsapp = whatsappLink(process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim() || "https://wa.me/905438901310", whatsappMessage);

export const siteConfig = {
  name: "Orbitart 3D",
  shortName: "Orbitart",
  description: sitePages["/"].description,
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
  whatsappNumber: whatsapp.number === "905438901310" ? "+90 543 890 13 10" : `+${whatsapp.number}`,
  whatsappUrl: whatsapp.href,
  whatsappMessage,
} as const;
