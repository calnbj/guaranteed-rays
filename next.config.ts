import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This is the core logic for the /rays subdirectory
  async rewrites() {
    return [
      {
        source: '/rays/:path*',
        destination: 'https://guaranteed-rays.vercel.app/:path*',
      },
    ];
  },
};

export default nextConfig;
