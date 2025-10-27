"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const AUTH_IMAGES: { src: string; alt: string }[] = [
    {
        src: "/images/auth/image-1.jpg",
        alt: "Pet care illustration",
    },
    {
        src: "/images/auth/image-2.jpg",
        alt: "Pet care illustration",
    },
    {
        src: "/images/auth/image-3.jpg",
        alt: "Pet care illustration",
    },
    {
        src: "/images/auth/image-4.jpg",
        alt: "Pet care illustration",
    },
];

type AuthPagesHeroSectionProps = {
    title: string;
    description: string;
};

export function AuthPagesHeroSection({ description, title }: AuthPagesHeroSectionProps) {
    const [currentImage, setCurrentImage] = useState<string>(AUTH_IMAGES[0]?.src || "");
    const [currentAlt, setCurrentAlt] = useState<string>(AUTH_IMAGES[0]?.alt || "");
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % AUTH_IMAGES.length);
            setCurrentImage(AUTH_IMAGES[currentIndex]?.src || "");
            setCurrentAlt(AUTH_IMAGES[currentIndex]?.alt || "");
        }, 3000);
        return () => interval && clearInterval(interval);
    }, [currentIndex]);

    return (
        <div className="relative flex h-full w-full flex-col items-center justify-center bg-[#F5FAF5] text-center">
            <div className="relative h-full w-full">
                <Image src={currentImage} alt={currentAlt} fill className="mx-auto object-cover" />
                <div className="absolute bottom-0 left-0 right-0 h-full w-full bg-gradient-to-t from-black/80 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 top-0 flex w-full flex-col items-start justify-center pl-10 text-left">
                {/* Main Heading */}
                <h1 className="font-nunito mb-4 max-w-[400px] text-[32px] font-extrabold leading-tight text-white">{title}</h1>

                {/* Subtitle */}
                <p className="font-nunito max-w-[450px] text-[20px] leading-relaxed text-white opacity-80">{description}</p>

                {/* Decorative Elements */}
                <div className="absolute right-8 top-8 h-12 w-12 rounded-full bg-white/20"></div>
                <div className="absolute right-12 top-20 h-8 w-8 rounded-full bg-white/30"></div>
                <div className="absolute bottom-20 left-16 h-6 w-6 rounded-full bg-white/25"></div>
            </div>
        </div>
    );
}
