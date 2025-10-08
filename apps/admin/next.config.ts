import { NextConfig } from "next";

const nextConfig: NextConfig = {
    transpilePackages: ["@furever/ui"],
    experimental: {
        serverComponentsHmrCache: false, // defaults to true
    },
    images: {
        remotePatterns: [
            {
                hostname: process.env.IMAGE_HOSTNAME || "localhost",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
