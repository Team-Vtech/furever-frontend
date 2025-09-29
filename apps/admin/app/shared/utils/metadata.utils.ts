import { Metadata } from "next";

export const sharedMetadata: Metadata = {
    metadataBase: new URL("http://localhost:3000"),
    alternates: {
        canonical: "/",
        languages: {
            "en-US": "/en-US",
        },
    },

    title: {
        default: "Welcome to  Loqui",
        template: "%s | Loqui",
    },
    description:
        "Connect with friends in a more meaningful way. Share moments, exchange messages, and build relationships on a platform designed for genuine connections.",
    openGraph: {
        title: {
            default: "Welcome to  Loqui",
            template: "%s | Loqui",
        },
        description:
            "Connect with friends in a more meaningful way. Share moments, exchange messages, and build relationships on a platform designed for genuine connections.",
        images: [
            {
                url: "/images/web-images/loqui-banner.png",
                width: 1200,
                height: 630,
                alt: "Loqui Banner",
            },
        ],
        siteName: "Loqui",
    },
    twitter: {
        title: {
            default: "Welcome to  Loqui",
            template: "%s | Loqui",
        },
        description:
            "Connect with friends in a more meaningful way. Share moments, exchange messages, and build relationships on a platform designed for genuine connections.",
        card: "summary_large_image",
        images: ["/images/web-images/loqui-banner.png"],
        creator: "@itsyanal", // Replace with your Twitter handle
    },
    icons: [
        {
            url: "/favicon.ico",
            sizes: "any",
            rel: "icon",
        },
        {
            url: "/images/icons/icon-72x72.png",
            sizes: "72x72",
            rel: "icon",
        },
        {
            url: "/images/icons/icon-96x96.png",
            sizes: "96x96",
            rel: "icon",
        },
        {
            url: "/images/icons/icon-128x128.png",
            sizes: "128x128",
            rel: "icon",
        },
        {
            url: "/images/icons/icon-144x144.png",
            rel: "icon",
            sizes: "144x144",
        },
        {
            url: "/images/icons/icon-152x152.png",
            rel: "icon",
            sizes: "152x152",
        },
        {
            url: "/images/icons/icon-192x192.png",
            rel: "icon",
            sizes: "192x192",
        },
        {
            url: "/images/icons/icon-384x384.png",
            rel: "icon",
            sizes: "384x384",
        },
        {
            url: "/images/icons/icon-512x512.png",
            rel: "icon",
            sizes: "512x512",
        },
    ],
    manifest: "/manifest.json",
    keywords: ["social media", "connect with friends", "messaging app", "share moments", "build relationships", "genuine connections"],
    creator: "Loqui Team",
    authors: [
        {
            name: "Loqui Team",
            url: "https://loqui.app",
        },
    ],
    appleWebApp: {
        capable: true,
        title: "Loqui",
        statusBarStyle: "black-translucent",
        startupImage: [
            {
                url: "/images/icons/icon-192x192.png",
                media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)",
            },
            {
                url: "/images/icons/icon-512x512.png",
                media: "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)",
            },
        ],
    },
    robots: {
        index: true,
        follow: true,
        noarchive: true,
        nosnippet: false,
        noimageindex: false,
    },
};
