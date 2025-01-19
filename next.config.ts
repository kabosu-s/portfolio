import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'export',
  // SSGではnext/imageが利用できないためunoptimizedで割愛
  images: {
    unoptimized: true,
  }
};

export default nextConfig;
