"use client";

export function HeroBanner() {
    return (
        <div className="relative overflow-hidden bg-[#F6F2FD]">
            <div className="relative min-h-[229px] px-4 py-12 lg:py-16">
                {/* Decorative Paw Print - Left (smaller) */}
                <div className="absolute left-[25%] top-4 hidden opacity-30 md:block">
                    <div className="relative h-[76px] w-[76px] rounded-full bg-white p-1">
                        <svg viewBox="0 0 76 76" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <circle cx="31.15" cy="9.51" r="9.51" fill="#8A56DF" />
                                <circle cx="53.32" cy="22.17" r="9.51" fill="#8A56DF" />
                                <circle cx="59.65" cy="47.51" r="9.51" fill="#8A56DF" />
                                <ellipse cx="22.18" cy="47.5" rx="22.18" ry="22.19" fill="#8A56DF" />
                            </g>
                        </svg>
                    </div>
                </div>

                {/* Decorative Paw Print - Right (larger) */}
                <div className="absolute right-[15%] top-[92px] hidden opacity-30 lg:block">
                    <div className="relative h-[114px] w-[114px] rounded-full bg-white p-1">
                        <svg viewBox="0 0 114 114" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <circle cx="47.21" cy="14.25" r="14.25" fill="#8A56DF" />
                                <circle cx="80.46" cy="33.25" r="14.25" fill="#8A56DF" />
                                <circle cx="89.96" cy="71.25" r="14.25" fill="#8A56DF" />
                                <ellipse cx="33.24" cy="71.25" rx="33.24" ry="33.24" fill="#8A56DF" />
                            </g>
                        </svg>
                    </div>
                </div>

                {/* Content Container */}
                <div className="relative z-10 mx-auto max-w-[880px] text-center">
                    {/* Main Heading - matching Figma specs */}
                    <h1 className="mb-6 text-[32px] font-bold leading-[1em] text-[#19191F] sm:text-[40px] lg:text-[48px]">
                        Find the Perfect Care for Your Beloved Pet
                    </h1>

                    {/* Subheading - matching Figma specs */}
                    <p className="mx-auto max-w-[766px] text-[16px] leading-[1.4em] text-[#19191F]/90 sm:text-[18px] lg:text-[20px]">
                        Discover trusted pet service providers near you, from grooming to veterinary care.
                    </p>
                </div>
            </div>
        </div>
    );
}
