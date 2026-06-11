import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Consolidate www onto the canonical apex domain
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.jdradiator.com" }],
        destination: "https://jdradiator.com/:path*",
        permanent: true,
      },
      // Legacy downloads page superseded by the documents center
      {
        source: "/:lang(en|ru|mn|es)/downloads",
        destination: "/:lang/documents",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
