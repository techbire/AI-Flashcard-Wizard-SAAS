import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'startup-template-sage.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'saas-magicui.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh',
      },
    ],
  },
  
  // Suppress development warnings for better development experience
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Experimental features for better performance and compatibility
  experimental: {
    optimizePackageImports: ['@clerk/nextjs', 'firebase', '@google/generative-ai'],
  },
  
  // Webpack configuration for better Firebase support
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  }
};

export default nextConfig;
