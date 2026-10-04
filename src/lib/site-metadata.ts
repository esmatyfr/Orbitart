import type { Metadata } from "next";
import { sitePages } from "@/content/site-pages";
import { deploymentSettings } from "@/lib/deployment-settings";

export const deployment = deploymentSettings(process.env);

export function pageMetadata(path: keyof typeof sitePages): Metadata {
  const page = sitePages[path];
  const title = path === "/" ? page.title : `${page.title} | Orbitart 3D`;
  const url = new URL(path, deployment.siteOrigin).href;
  const image = {
    url: new URL("/images/brand/orbitart-social.png", deployment.imageOrigin).href,
    width: 1200, height: 630, alt: "Orbitart 3D Studio — Tasarım, Tarama, Üretim",
  };
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    robots: { index: deployment.indexable, follow: deployment.indexable },
    openGraph: { title, description: page.description, url, siteName: "Orbitart 3D", locale: "tr_TR", type: "website", images: [image] },
    twitter: { card: "summary_large_image", title, description: page.description, images: [image.url] },
  };
}
