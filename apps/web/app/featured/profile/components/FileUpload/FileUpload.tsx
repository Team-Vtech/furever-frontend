import { useState } from "react";
import { Card, CardContent } from "@furever/ui/components/card";
import { Button } from "@furever/ui/components/button";
import { Progress } from "@furever/ui/components/progress";
import { Camera, Upload, X } from "lucide-react";
import { cn } from "@furever/ui/lib/utils";

interface FileUploadProps {
    onFileSelect: (file: File) => void;
    onFileRemove?: () => void;
    accept?: string;
    maxSize?: number; // in MB
    preview?: string | null;
    isUploading?: boolean;
    uploadProgress?: number;
    className?: string;
    variant?: "avatar" | "default";
}

export function FileUpload({
    onFileSelect,
    onFileRemove,
    accept = "image/*",
    maxSize = 10, // 10MB default (matching media-objects API)
    preview,
    isUploading = false,
    uploadProgress = 0,
    className,
    variant = "default"
}: FileUploadProps) {
    const [isDragOver, setIsDragOver] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (files: FileList | null) => {
        if (!files || files.length === 0) return;

        const file = files[0];
        if (!file) return;
        
        setError(null);

        // Validate file type
        if (!file.type.match(accept.replace("*", ".*"))) {
            setError("Please select a valid file type");
            return;
        }

        // Validate file size
        if (file.size > maxSize * 1024 * 1024) {
            setError(`File size must be less than ${maxSize}MB`);
            return;
        }

        onFileSelect(file);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        handleFileChange(e.dataTransfer.files);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFileChange(e.target.files);
    };

    if (variant === "avatar") {
        return (
            <div className={cn("relative", className)}>
                <input
                    type="file"
                    accept={accept}
                    onChange={handleInputChange}
                    className="hidden"
                    id="avatar-upload"
                    disabled={isUploading}
                />
                <label
                    htmlFor="avatar-upload"
                    className={cn(
                        "cursor-pointer transition-opacity",
                        isUploading && "cursor-not-allowed opacity-50"
                    )}
                >
                    <Button type="button" variant="outline" className="gap-2" asChild>
                        <span>
                            <Camera className="h-4 w-4" />
                            {isUploading ? "Uploading..." : "Change Photo"}
                        </span>
                    </Button>
                </label>
                {isUploading && (
                    <div className="mt-2">
                        <Progress value={uploadProgress} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                            Uploading... {Math.round(uploadProgress)}%
                        </p>
                    </div>
                )}
                {error && (
                    <p className="text-xs text-destructive mt-1">{error}</p>
                )}
            </div>
        );
    }

    return (
        <div className={className}>
            <Card
                className={cn(
                    "border-2 border-dashed transition-colors cursor-pointer",
                    isDragOver && "border-primary bg-primary/5",
                    isUploading && "cursor-not-allowed opacity-50",
                    error && "border-destructive"
                )}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                <CardContent className="flex flex-col items-center justify-center space-y-4 p-6">
                    <input
                        type="file"
                        accept={accept}
                        onChange={handleInputChange}
                        className="hidden"
                        id="file-upload"
                        disabled={isUploading}
                    />
                    
                    {preview ? (
                        <div className="relative">
                            <img 
                                src={preview} 
                                alt="Preview" 
                                className="max-h-48 max-w-full rounded-lg object-contain"
                            />
                            {onFileRemove && !isUploading && (
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                                    onClick={onFileRemove}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            )}
                        </div>
                    ) : (
                        <Upload className="h-12 w-12 text-muted-foreground" />
                    )}
                    
                    {isUploading ? (
                        <div className="text-center space-y-2">
                            <Progress value={uploadProgress} className="w-48 h-2" />
                            <p className="text-sm text-muted-foreground">
                                Uploading... {Math.round(uploadProgress)}%
                            </p>
                        </div>
                    ) : (
                        <div className="text-center space-y-2">
                            <label htmlFor="file-upload" className="cursor-pointer">
                                <p className="text-sm font-medium">
                                    {preview ? "Change file" : "Drop files here or click to browse"}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Max file size: {maxSize}MB
                                </p>
                            </label>
                        </div>
                    )}
                </CardContent>
            </Card>
            
            {error && (
                <p className="text-sm text-destructive mt-2">{error}</p>
            )}
        </div>
    );
}