import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // REMOVING basePath to stop the loop
  // We will let the Portfolio handle the folder logic
};

export default nextConfig;
