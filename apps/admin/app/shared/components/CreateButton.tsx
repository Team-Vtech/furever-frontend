import { Button } from "@furever/ui/components/button";
import { Plus } from "lucide-react";
import Link from "next/link";

interface CreateButtonProps {
    label: string;
    href: string;
    className?: string;
}

export const CreateButton = ({ label, href, className }: CreateButtonProps) => {
    return (
        <Button asChild className={className}>
            <Link href={href}>
                <Plus className="mr-2 h-4 w-4" />
                {label}
            </Link>
        </Button>
    );
};
