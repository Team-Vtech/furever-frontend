import Image from "next/image";

export function ProviderRegistrationHero() {
    return (
        <div className="mb-8 w-full">
            {/* Header Section */}
            <div className="mb-6 text-center">
                <h1 className="font-quicksand mb-4 text-[48px] font-bold text-[#171A1F]">Join Fureverly as a Provider</h1>
                <p className="font-quicksand mx-auto max-w-2xl text-[18px] leading-relaxed text-[#565D6D]">
                    Partner with Fureverly to expand your reach and connect with pet owners seeking top-notch services. Complete the form below to get
                    started!
                </p>
            </div>

            {/* Hero Image */}
            <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-[10px] shadow-sm">
                <Image
                    fill
                    src="/provider-registration-hero-319076.png"
                    alt="Join Fureverly as a Provider"
                    className="h-[224px] w-full object-cover"
                />
            </div>
        </div>
    );
}
