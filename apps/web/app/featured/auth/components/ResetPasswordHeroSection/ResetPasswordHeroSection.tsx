import { Lock, Shield, UserCheck } from "lucide-react";

export function ResetPasswordHeroSection() {
    return (
        <div className="flex w-full items-center justify-center bg-gradient-to-br from-[#6D28D9] to-[#8B5CF6] p-12">
            <div className="max-w-md text-center text-white">
                {/* Logo/Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                        <Lock className="h-10 w-10" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="font-nunito mb-6 text-4xl font-bold leading-tight">Reset Your Password</h1>

                {/* Subtitle */}
                <p className="font-nunito mb-8 text-lg leading-relaxed text-white/90">
                    Enter your new password to regain access to your Furever account. Your account security is our priority.
                </p>

                {/* Features */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-left">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                            <Shield className="h-4 w-4" />
                        </div>
                        <span className="font-nunito text-sm text-white/90">Secure password reset process</span>
                    </div>
                    <div className="flex items-center space-x-3 text-left">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                            <UserCheck className="h-4 w-4" />
                        </div>
                        <span className="font-nunito text-sm text-white/90">Quick and easy account recovery</span>
                    </div>
                    <div className="flex items-center space-x-3 text-left">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                            <Lock className="h-4 w-4" />
                        </div>
                        <span className="font-nunito text-sm text-white/90">Enhanced account security</span>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="mt-12 flex justify-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-white/30"></div>
                    <div className="h-2 w-2 rounded-full bg-white/60"></div>
                    <div className="h-2 w-2 rounded-full bg-white/30"></div>
                </div>
            </div>
        </div>
    );
}
