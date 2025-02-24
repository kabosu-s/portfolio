import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ekilabo.g.kuroco-img.app',
      },
    ],
  },
};

export default nextConfig;
