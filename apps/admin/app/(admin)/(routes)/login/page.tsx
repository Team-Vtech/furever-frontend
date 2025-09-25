import { LoginContainer } from "../../featured/auth/containers/LoginContainer";
import { LoginImageSection } from "../../featured/auth/components/LoginImageSection";

export default function ProviderLoginPage() {
  return (
    <div className="min-h-screen bg-white flex w-full">
      <LoginImageSection />

      {/* Right Form Section */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <LoginContainer />
      </div>
    </div>
  );
}
