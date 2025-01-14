import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['src'], // Paths to scan for linting
  },
};

export default nextConfig;
