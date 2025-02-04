import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.b2bpic.net",
      },
    ],
  },
};

export default nextConfig;
