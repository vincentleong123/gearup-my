import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  turbopack: { root: process.cwd() },
  experimental: {
    rootParams: true,
  },
};

export default nextConfig;
