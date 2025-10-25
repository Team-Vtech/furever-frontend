import { Metadata } from "next";

export const adminMetadata: Metadata = {
    metadataBase: new URL("http://localhost:3002"),
    alternates: {
        canonical: "/",
        languages: {
            "en-US": "/en-US",
        },
    },

    title: {
        default: "Furever Admin Dashboard",
        template: "%s | Furever Admin",
    },
    description: "Furever Admin Dashboard - Manage your pet care services, bookings, providers, and more.",
    openGraph: {
        title: {
            default: "Furever Admin Dashboard",
            template: "%s | Furever Admin",
        },
        description: "Furever Admin Dashboard - Manage your pet care services, bookings, providers, and more.",
        images: [
            {
                url: "/images/admin-banner.png",
                width: 1200,
                height: 630,
                alt: "Furever Admin Dashboard",
            },
        ],
        siteName: "Furever Admin",
    },
    twitter: {
        title: {
            default: "Furever Admin Dashboard",
            template: "%s | Furever Admin",
        },
        description: "Furever Admin Dashboard - Manage your pet care services, bookings, providers, and more.",
        card: "summary_large_image",
        images: ["/images/admin-banner.png"],
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
    keywords: ["pet care", "admin dashboard", "booking management", "service providers", "pet services", "admin panel"],
    creator: "Furever Team",
    authors: [
        {
            name: "Furever Team",
            url: "https://furever.app",
        },
    ],
    appleWebApp: {
        capable: true,
        title: "Furever Admin",
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
