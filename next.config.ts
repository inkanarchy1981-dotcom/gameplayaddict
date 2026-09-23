import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep build parallelism within shared-hosting process/memory limits.
  experimental: { cpus: 2 },
  typescript: {
    tsconfigPath: "tsconfig.namecheap.json",
  },
};

export default nextConfig;
