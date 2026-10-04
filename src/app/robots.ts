import type { MetadataRoute } from "next";
import { deployment } from "@/lib/site-metadata";

export default function robots(): MetadataRoute.Robots {
  return deployment.indexable
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${deployment.siteOrigin}/sitemap.xml` }
    : { rules: { userAgent: "*", disallow: "/" } };
}
