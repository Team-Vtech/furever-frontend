export function ProviderRegistrationHero() {
  return (
    <div className="w-full mb-8">
      {/* Header Section */}
      <div className="text-center mb-6">
        <h1 className="text-[48px] font-bold text-[#171A1F] font-quicksand mb-4">
          Join Fureverly as a Provider
        </h1>
        <p className="text-[18px] text-[#565D6D] font-quicksand max-w-2xl mx-auto leading-relaxed">
          Partner with Fureverly to expand your reach and connect with pet
          owners seeking top-notch services. Complete the form below to get
          started!
        </p>
      </div>

      {/* Hero Image */}
      <div className="w-full max-w-4xl mx-auto rounded-[10px] overflow-hidden shadow-sm">
        <img
          src="/provider-registration-hero-319076.png"
          alt="Join Fureverly as a Provider"
          className="w-full h-[224px] object-cover"
        />
      </div>
    </div>
  );
}
