import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // ❌ WARNING: This ignores all type errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
