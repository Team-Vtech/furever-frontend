import Image from "next/image";

export function LoginHeroSection() {
  return (
    <div className="bg-[#F5FAF5] w-full h-full flex flex-col items-center justify-center text-center px-8 py-12 relative">
      {/* Pet Image */}
      <div className="mb-8">
        <Image
          src="/pet-hero-image-4525b6.png"
          alt="Pet care illustration"
          width={160}
          height={120}
          className="mx-auto"
        />
      </div>

      {/* Main Heading */}
      <h1 className="text-[32px] font-extrabold text-[#19191F] font-nunito leading-tight mb-4 max-w-[400px]">
        Your Pet&apos;s Best Life Starts Here
      </h1>

      {/* Subtitle */}
      <p className="text-[20px] text-[#19191F] opacity-80 font-nunito leading-relaxed max-w-[450px]">
        Manage bookings, health records, and connect with trusted pet services.
      </p>

      {/* Decorative Elements */}
      <div className="absolute top-8 left-8 w-12 h-12 bg-white/20 rounded-full"></div>
      <div className="absolute top-20 right-12 w-8 h-8 bg-white/30 rounded-full"></div>
      <div className="absolute bottom-20 left-16 w-6 h-6 bg-white/25 rounded-full"></div>
    </div>
  );
}
