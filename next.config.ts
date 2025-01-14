import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  "rules": {
  "@typescript-eslint/no-unused-vars": "warn",
  "next/no-img-element": "warn",
  "jsx-a11y/alt-text": "warn"
}

};

export default nextConfig;
