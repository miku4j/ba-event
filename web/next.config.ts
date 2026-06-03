import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["api-nginx", "web", "localhost"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wikia.nocookie.net",
        pathname: "/blue-archive/images/**",
      },
    ],
  },
};

export default nextConfig;
