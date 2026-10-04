import type { Metadata } from "next";

import { FloatingSocialLinks } from "@/components/layout/floating-social-links";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/content/site-config";
import { deployment, pageMetadata } from "@/lib/site-metadata";
import "@/styles/globals.css";

export const metadata: Metadata = {
  ...pageMetadata("/"),
  metadataBase: new URL(deployment.imageOrigin),
  title: {
    default: "Orbitart 3D | Tasarım, Tarama ve Üretim",
    template: "%s | Orbitart 3D",
  },
  applicationName: siteConfig.name,
  icons: {
    icon: [{ url: "/images/brand/orbitart-icon.svg", type: "image/svg+xml" }, { url: "/images/brand/orbitart-icon.png", type: "image/png", sizes: "32x32" }],
    apple: [{ url: "/images/brand/orbitart-apple-icon.png", sizes: "180x180", type: "image/png" }],
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
