import { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@furever/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.IMAGE_HOSTNAME || "localhost",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
