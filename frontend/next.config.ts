import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    allowedDevOrigins: ["http://192.168.1.44"]
  } as any
  /* config options here */
};

export default nextConfig;

