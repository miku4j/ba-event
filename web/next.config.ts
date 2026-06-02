import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["api-nginx", "web", "localhost"],
};

export default nextConfig;
