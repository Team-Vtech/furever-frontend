import { MediaObject } from "@furever/types";
import { ControlledInputProps } from "@furever/types/general";
import { Button } from "@furever/ui/components/button";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Controller, FieldValues, useController } from "react-hook-form";
import { Label } from "recharts";
import { getMediaId, useMediaUpload } from "../../hooks/use-media-upload";

type UploadMediaProps<T extends FieldValues> = ControlledInputProps<T> & {
    mediaObject?: MediaObject;
    accept?: string;
};

export function UploadMedia<T extends FieldValues>({ control, name, rules, mediaObject, accept = "image/*" }: UploadMediaProps<T>) {
    const { field, fieldState } = useController({
        name,
        control,
        rules,
    });
    const uploadMedia = useMediaUpload();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        mediaObject?.file_path ? process.env.NEXT_PUBLIC_IMAGE_URL + mediaObject.file_path : null,
    );
    const [media, setMedia] = useState<MediaObject | null>(mediaObject || null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);

            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);

            // Upload the file using the media upload hook
            try {
                const result = await uploadMedia.mutateAsync({ file });
                const mediaId = getMediaId(result);
                field.onChange(mediaId);
                setMedia(result.data);
            } catch (error) {
                console.error("File upload failed:", error);
                // Reset the file selection on error
                setSelectedFile(null);
                setPreviewUrl(null);
                field.onChange(0);
            }
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const removeImage = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        field.onChange(0);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-2">
            <Label>Image</Label>
            <div className="flex flex-col gap-4">
                {/* File Input */}
                <div className="flex items-center gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={triggerFileInput}
                        className="flex items-center gap-2"
                        disabled={uploadMedia.isPending}
                    >
                        <Upload className="h-4 w-4" />
                        {uploadMedia.isPending ? "Uploading..." : "Choose Image"}
                    </Button>
                    <input ref={fileInputRef} type="file" accept={accept} onChange={handleFileSelect} className="hidden" />
                    {selectedFile && <span className="text-muted-foreground text-sm">{selectedFile.name}</span>}
                </div>

                {/* Image Preview */}
                {previewUrl && (
                    <div className="relative inline-block">
                        <div className="relative h-32 w-32 overflow-hidden rounded-lg border">
                            {media?.file_type && !media.file_type.startsWith("image/") ? (
                                <div className="flex h-full w-full items-center justify-center bg-gray-100">
                                    <span className="text-sm text-gray-500">
                                        Preview not available
                                        <br />
                                        <a href={media.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                            Download File
                                        </a>
                                    </span>
                                </div>
                            ) : (
                                <Image src={previewUrl} alt="Pet type preview" className="h-full w-full object-cover" fill />
                            )}
                        </div>
                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={removeImage}
                            className="absolute -right-2 -top-2 h-6 w-6 rounded-full p-0"
                        >
                            <X className="h-3 w-3" />
                        </Button>
                    </div>
                )}

                <Controller control={control} name={name} render={({ field }) => <input type="hidden" {...field} />} />
            </div>
            {fieldState.error?.message && <p className="text-sm text-red-600">{fieldState.error.message}</p>}
        </div>
    );
}
