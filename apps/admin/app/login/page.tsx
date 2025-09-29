import { LoginImageSection } from "../featured/auth/components/LoginImageSection";
import { LoginContainer } from "../featured/auth/containers/LoginContainer";

export default function ProviderLoginPage() {
    return (
        <div className="flex min-h-screen w-full bg-white">
            <LoginImageSection />

            {/* Right Form Section */}
            <div className="flex flex-1 items-center justify-center p-8 lg:p-12">
                <LoginContainer />
            </div>
        </div>
    );
}
