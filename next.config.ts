import type { NextConfig } from "next";
import { securityHeaders } from "./src/lib/security-headers";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  // Same-Wi-Fi phone testing; keep this limited to the development computer.
  allowedDevOrigins: ["192.168.1.105"],
  headers() {
    return [{ source: "/:path*", headers: securityHeaders(process.env) }];
  },
};

export default nextConfig;
