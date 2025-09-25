import { Suspense } from "react";
import { LoginContainer } from "../../featured/auth/containers/LoginContainer";
import { LoginHeroSection } from "../../featured/auth/components/LoginHeroSection";

export default function PetParentLoginPage() {
  return (
    <div id="page-layout" className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Hero Section */}
      <section id="hero-section" className="hidden lg:flex lg:flex-1 bg-white">
        <LoginHeroSection />
      </section>

      {/* Right Side - Login Form */}
      <main
        id="login-form-section"
        className="flex-1 lg:flex-none lg:w-[500px] flex items-center justify-center px-8 py-12"
      >
        <div className="w-full max-w-[400px]">
          <Suspense fallback={<div>Loading...</div>}>
            <LoginContainer />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
