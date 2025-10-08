import { NextConfig } from "next";

const nextConfig: NextConfig = {
    transpilePackages: ["@furever/ui"],
    experimental: {
        serverComponentsHmrCache: false, // defaults to true
    },
    images: {
        domains: ["localhost", process.env.IMAGE_HOSTNAME || "localhost"],
    },
};

export default nextConfig;
