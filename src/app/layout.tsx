import type { Metadata } from "next";

import { FloatingSocialLinks } from "@/components/layout/floating-social-links";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/content/site-config";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.storeUrl),
  title: {
    default: "Orbitart 3D | Tasarım, Tarama ve Üretim",
    template: "%s | Orbitart 3D",
  },
  description: siteConfig.description,
  openGraph: {
    title: "Orbitart 3D",
    description: siteConfig.description,
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" data-scroll-behavior="smooth">
      <body className="min-h-screen bg-[#09080f] text-zinc-100 antialiased">
        <a className="skip-link" href="#ana-icerik">
          Ana içeriğe geç
        </a>
        <SiteHeader />
        <main id="ana-icerik">{children}</main>
        <FloatingSocialLinks />
        <SiteFooter />
      </body>
    </html>
  );
}
