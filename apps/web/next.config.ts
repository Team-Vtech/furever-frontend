import { NextConfig } from "next";

const nextConfig: NextConfig = {
    transpilePackages: ["@furever/ui"],
    images: {
        domains: ["localhost", process.env.IMAGE_HOSTNAME || "localhost"],
    },
};

export default nextConfig;
