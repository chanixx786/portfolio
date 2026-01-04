import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  experimental: {
    allowedDevOrigins: ["http://192.168.1.44"]
  } as any
  /* config options here */
};

export default withFlowbiteReact(nextConfig);