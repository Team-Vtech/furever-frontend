import { NextConfig } from "next";

const nextConfig: NextConfig = {
    transpilePackages: ["@furever/ui"],
    images: {
        domains: ["localhost", process.env.IMAGE_HOSTNAME || "localhost"],
    },
    async rewrites() {
        return [
            {
                source: "/storage/:path*",
                destination: "http://localhost:8000/storage/:path*",
            },
        ];
    },
};

export default nextConfig;
