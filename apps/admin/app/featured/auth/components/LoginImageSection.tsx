import Image from "next/image";

export function LoginImageSection() {
    return (
        <div className="relative hidden bg-[#F7F2FD] lg:flex lg:flex-1">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex h-full w-full items-center justify-center rounded-[10px] bg-gradient-to-br from-purple-200 to-purple-300">
                    <Image src="/images/login.png" alt="Provider Login" className="h-full w-full rounded-[10px] object-cover" fill />
                </div>
            </div>
        </div>
    );
}
