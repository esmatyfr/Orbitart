type SecurityEnvironment = {
  NODE_ENV?: string;
  VERCEL_ENV?: string;
};

export function securityHeaders(env: SecurityEnvironment) {
  const headers = [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), xr-spatial-tracking=()",
    },
  ];

  // Development needs HMR; do not carry its eval/WebSocket permissions into a build.
  if (env.NODE_ENV !== "production") return headers;
  const preview = env.VERCEL_ENV === "preview";
  // Next's static bootstrap and Motion styles require inline content. Nonces
  // would force dynamic rendering. No eval, wildcard or third-party production scripts.
  const directives = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${preview ? " https://vercel.live" : ""}`,
    `style-src 'self' 'unsafe-inline'${preview ? " https://vercel.live" : ""}`,
    `img-src 'self' blob: data:${preview ? " https://vercel.live https://vercel.com" : ""}`,
    `font-src 'self'${preview ? " https://vercel.live https://assets.vercel.com" : ""}`,
    // GLTFLoader uses ImageBitmapLoader.fetch for embedded texture blob URLs.
    `connect-src 'self' blob:${preview ? " https://vercel.live wss://ws-us3.pusher.com" : ""}`,
    `frame-src ${preview ? "https://vercel.live" : "'none'"}`,
    "worker-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'none'",
    "frame-ancestors 'none'",
  ];
  // Keep local HTTP/LAN builds usable; Vercel deployments are HTTPS.
  if (env.VERCEL_ENV === "production" || preview) directives.push("upgrade-insecure-requests");
  headers.push({ key: "Content-Security-Policy", value: directives.join("; ") + ";" });
  return headers;
}
