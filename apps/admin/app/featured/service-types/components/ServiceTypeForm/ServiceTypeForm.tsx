"use client";

import {
  getServiceTypeDefaultValues,
  ServiceTypeFormValues,
  serviceTypeSchema,
} from "@/app/(routes)/api/service-types/schema";
import {
  getMediaId,
  useMediaUpload,
} from "@/app/shared/hooks/use-media-upload";
import { GeneralStatus, ServiceType } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Input } from "@furever/ui/components/input";
import { Label } from "@furever/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@furever/ui/components/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

type ServiceTypeFormProps = {
  serviceType?: ServiceType;
  onSubmit: (data: ServiceTypeFormValues) => void;
  isLoading?: boolean;
};

export function ServiceTypeForm({
  onSubmit,
  isLoading = false,
  serviceType,
}: ServiceTypeFormProps) {
  const defaultValue = getServiceTypeDefaultValues(serviceType);
  const router = useRouter();
  const uploadMedia = useMediaUpload();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedMediaId, setUploadedMediaId] = useState<number | null>(
    serviceType?.media_object_id || null
  );

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    serviceType?.media_object?.file_path
      ? process.env.NEXT_PUBLIC_IMAGE_URL + serviceType.media_object.file_path
      : null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ServiceTypeFormValues>({
    resolver: zodResolver(serviceTypeSchema),
    defaultValues: defaultValue,
  });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
        setUploadedMediaId(mediaId);
        setValue("media_object_id", mediaId);
      } catch (error) {
        console.error("File upload failed:", error);
        // Reset the file selection on error
        setSelectedFile(null);
        setPreviewUrl(null);
      }
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadedMediaId(null);
    setValue("media_object_id", 0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onFormSubmit = (data: ServiceTypeFormValues) => {
    onSubmit(data);
  };
  const status = watch("status");

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Enter service type name"
        />
        {errors.name && (
          <p className="text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          {...register("description")}
          placeholder="Enter service type description"
          rows={4}
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        {errors.description && (
          <p className="text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={status}
          onValueChange={(value: GeneralStatus) => setValue("status", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(GeneralStatus).map((statusValue) => (
              <SelectItem key={statusValue} value={statusValue}>
                {statusValue.charAt(0).toUpperCase() + statusValue.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.status && (
          <p className="text-sm text-red-600">{errors.status.message}</p>
        )}
      </div>

      {/* Image Upload */}
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <div className="flex flex-col gap-4">
          {/* File Input */}
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2"
              disabled={uploadMedia.isPending}
            >
              <Upload className="h-4 w-4" />
              {uploadMedia.isPending ? "Uploading..." : "Choose Image"}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {selectedFile && (
              <span className="text-sm text-muted-foreground">
                {selectedFile.name}
              </span>
            )}
          </div>

          {/* Image Preview */}
          {previewUrl && (
            <div className="relative inline-block">
              <div className="relative w-32 h-32 border rounded-lg overflow-hidden">
                <img
                  src={previewUrl}
                  alt="Service type preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}

          {/* Hidden input for form submission */}
          <Input type="hidden" {...register("media_object_id")} />
        </div>
        {errors.media_object_id && (
          <p className="text-sm text-red-600">
            {errors.media_object_id.message}
          </p>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex gap-4 pt-6 justify-end">
        <Button type="submit" disabled={isLoading}>
          <Save className="mr-2 h-4 w-4" />
          {isLoading
            ? !serviceType
              ? "Creating..."
              : "Updating..."
            : !serviceType
              ? "Create Service Type"
              : "Update Service Type"}
        </Button>
      </div>
    </form>
  );
}
