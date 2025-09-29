import Image from "next/image";

export function LoginHeroSection() {
    return (
        <div className="relative flex h-full w-full flex-col items-center justify-center bg-[#F5FAF5] px-8 py-12 text-center">
            {/* Pet Image */}
            <div className="mb-8">
                <Image src="/pet-hero-image-4525b6.png" alt="Pet care illustration" width={160} height={120} className="mx-auto" />
            </div>

            {/* Main Heading */}
            <h1 className="font-nunito mb-4 max-w-[400px] text-[32px] font-extrabold leading-tight text-[#19191F]">
                Your Pet&apos;s Best Life Starts Here
            </h1>

            {/* Subtitle */}
            <p className="font-nunito max-w-[450px] text-[20px] leading-relaxed text-[#19191F] opacity-80">
                Manage bookings, health records, and connect with trusted pet services.
            </p>

            {/* Decorative Elements */}
            <div className="absolute left-8 top-8 h-12 w-12 rounded-full bg-white/20"></div>
            <div className="absolute right-12 top-20 h-8 w-8 rounded-full bg-white/30"></div>
            <div className="absolute bottom-20 left-16 h-6 w-6 rounded-full bg-white/25"></div>
        </div>
    );
}
