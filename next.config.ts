import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },

  // Netlify answered www.pmos.digital with a 301 to the apex. Railway serves
  // every custom domain attached to a service without redirecting between
  // them, so both hostnames would answer 200 and the site would exist twice.
  // The host pattern captures whatever follows "www.", so this holds if the
  // domain ever changes, and it never matches the *.up.railway.app hostname
  // or localhost.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www\\.(?<apex>.*)" }],
        destination: "https://:apex/:path*",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
