import { ProviderRegistrationHero } from "../../featured/registration/components/ProviderRegistrationHero";
import { ProviderRegistrationContainer } from "../../featured/registration/containers/ProviderRegistrationContainer";

export default function ProviderRegistrationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <ProviderRegistrationHero />

      {/* Registration Form Section */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-[32px] font-bold text-[#171A1F] font-quicksand mb-4">
              Join Our Provider Network
            </h1>
            <p className="text-[18px] text-[#565D6D] font-quicksand max-w-2xl mx-auto">
              Apply to become a verified provider and connect with pet owners in
              your area. Fill out the application below to get started.
            </p>
          </div>

          <ProviderRegistrationContainer />
        </div>
      </div>
    </div>
  );
}
