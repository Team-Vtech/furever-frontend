import Image from "next/image";

export function LoginImageSection() {
    return (
        <div className="relative hidden bg-[#F7F2FD] lg:flex lg:flex-1">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex h-full max-h-[656px] w-full max-w-[576px] items-center justify-center rounded-[10px] bg-gradient-to-br from-purple-200 to-purple-300">
                    <Image src="/provider-login-image-38aca3.png" alt="Provider Login" className="h-full w-full rounded-[10px] object-cover" fill />
                </div>
            </div>
        </div>
    );
}
