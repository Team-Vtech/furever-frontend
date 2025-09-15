"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@furever/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@furever/ui/components/card";
import { Input } from "@furever/ui/components/input";
import { Label } from "@furever/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@furever/ui/components/select";
import { CreateServiceSchema } from "../../../../(routes)/api/services/schema";
import { Save, X, Upload, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useState, useRef } from "react";

type ServiceFormData = z.infer<typeof CreateServiceSchema>;

type ServiceFormProps = {
  initialData?: Partial<ServiceFormData>;
  onSubmit: (data: ServiceFormData) => void;
  isLoading?: boolean;
  mode: "create" | "edit";
};

export function ServiceForm({
  initialData,
  onSubmit,
  isLoading = false,
  mode,
}: ServiceFormProps) {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.imageUrl || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(CreateServiceSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      duration: initialData?.duration || 30,
      status: initialData?.status || "draft",
      categories: initialData?.categories || [],
      imageUrl: initialData?.imageUrl || "",
    },
  });

  const status = watch("status");

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      // For now, we'll set the imageUrl to the file name
      // In a real implementation, you'd upload the file and get a URL
      setValue("imageUrl", file.name);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setValue("imageUrl", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Service Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Service Name</Label>
        <Input
          id="name"
          placeholder="Enter service name"
          {...register("name")}
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
          placeholder="Describe your service"
          rows={4}
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      {/* Price and Duration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Input
            id="duration"
            type="number"
            placeholder="30"
            {...register("duration", { valueAsNumber: true })}
          />
          {errors.duration && (
            <p className="text-sm text-red-600">{errors.duration.message}</p>
          )}
        </div>
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={status}
          onValueChange={(value) =>
            setValue("status", value as "active" | "draft" | "inactive")
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && (
          <p className="text-sm text-red-600">{errors.status.message}</p>
        )}
      </div>

      {/* Image Upload */}
      <div className="space-y-2">
        <Label htmlFor="image">Service Image (Optional)</Label>
        <div className="flex flex-col gap-4">
          {/* File Input */}
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Choose Image
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
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
                  alt="Service preview"
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
          <Input type="hidden" {...register("imageUrl")} />
        </div>
        {errors.imageUrl && (
          <p className="text-sm text-red-600">{errors.imageUrl.message}</p>
        )}
      </div>

      {/* Categories - Simplified for now */}
      <div className="space-y-2">
        <Label htmlFor="categories">Categories</Label>
        <Input
          id="categories"
          placeholder="Enter categories separated by commas"
          onChange={(e) => {
            const categories = e.target.value
              .split(",")
              .map((cat) => cat.trim())
              .filter(Boolean);
            setValue("categories", categories);
          }}
          defaultValue={initialData?.categories?.join(", ") || ""}
        />
        {errors.categories && (
          <p className="text-sm text-red-600">{errors.categories.message}</p>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex gap-4 pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="flex-1"
        >
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading} className="flex-1">
          <Save className="mr-2 h-4 w-4" />
          {isLoading
            ? mode === "create"
              ? "Creating..."
              : "Updating..."
            : mode === "create"
              ? "Create Service"
              : "Update Service"}
        </Button>
      </div>
    </form>
  );
}
