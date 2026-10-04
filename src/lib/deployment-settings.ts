type DeploymentEnvironment = {
  NODE_ENV?: string;
  VERCEL_ENV?: string;
  VERCEL_URL?: string;
  SITE_URL?: string;
};

export function deploymentSettings(env: DeploymentEnvironment) {
  const site = new URL(env.SITE_URL?.trim() || "https://orbitartt.com");
  if (site.protocol !== "https:" || site.username || site.password || site.pathname !== "/" || site.search || site.hash) {
    throw new Error("SITE_URL yalnız HTTPS site origin'i olmalı; yol veya kimlik bilgisi içeremez.");
  }
  const preview = env.VERCEL_ENV === "preview" || env.VERCEL_ENV === "development" || env.NODE_ENV === "development";
  const imageBase = preview && env.VERCEL_URL ? new URL(`https://${env.VERCEL_URL}`) : site;
  if (imageBase.username || imageBase.password || imageBase.pathname !== "/" || imageBase.search || imageBase.hash) {
    throw new Error("Vercel önizleme adresi geçersiz.");
  }
  return { siteOrigin: site.origin, imageOrigin: imageBase.origin, indexable: !preview };
}
