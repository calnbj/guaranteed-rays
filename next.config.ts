import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This tells Next.js to prefix all its internal links with /rays
  basePath: '/rays',
  assetPrefix: '/rays',
};

export default nextConfig;
