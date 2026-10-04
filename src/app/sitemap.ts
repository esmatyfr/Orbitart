import type { MetadataRoute } from "next";
import { sitePages } from "@/content/site-pages";
import { deployment } from "@/lib/site-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!deployment.indexable) return [];
  return Object.keys(sitePages).map(path => ({ url: new URL(path, deployment.siteOrigin).href }));
}
