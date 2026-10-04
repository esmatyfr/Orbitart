import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  // Same-Wi-Fi phone testing; keep this limited to the development computer.
  allowedDevOrigins: ["192.168.1.105"],
};

export default nextConfig;
