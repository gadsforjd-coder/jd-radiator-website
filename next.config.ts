import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/ua/:path*",
        destination: "http://34.143.221.68/umami/:path*",
      },
    ];
  },
};

export default nextConfig;
