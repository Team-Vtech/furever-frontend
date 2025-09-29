interface LoaderProps {
    className?: string;
}

export function Loader({ className = "" }: LoaderProps) {
    return (
        <div className={`relative ${className} w-full`}>
            <div className="bg-background/80 absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
                <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
            </div>
        </div>
    );
}
