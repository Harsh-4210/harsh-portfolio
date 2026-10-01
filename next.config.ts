import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray lockfile in the parent folder otherwise confuses root detection.
  turbopack: { root: __dirname },
};

export default nextConfig;
