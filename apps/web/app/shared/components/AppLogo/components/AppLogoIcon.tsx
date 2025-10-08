import Image from "next/image";
import { HTMLAttributes } from "react";

export function AppLogoIcon(props: HTMLAttributes<HTMLImageElement>) {
    return (
        <div {...props}>
            <Image src="/images/logo.png" alt="Logo" fill />
        </div>
    );
}
