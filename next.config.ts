import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/image/**',
      },
      {
        protocol: 'https',
        hostname: 'www.animatedimages.org',
        pathname: '/data/media/**',
      },
      {
        protocol: 'https',
        hostname: 'api.badgr.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.credly.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'learn.microsoft.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
