import { TextAreaInput } from "@/app/shared/components/TextAreaInput/TextAreaInput";
import { Button } from "@furever/ui/components/button";
import { Label } from "@furever/ui/components/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Upload, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  getServiceDefaultValues,
  ServiceFormValues,
  serviceSchema,
} from "../../../(routes)/api/services/services.schema";
import { CheckboxGroup } from "../../../shared/components/CheckboxGroup";
import { TextInput } from "../../../shared/components/TextInput/TextInput";
import { SelectInput } from "../../../shared/components/SelectInput/SelectInput";
import {
  getMediaId,
  useMediaUpload,
} from "../../../shared/hooks/use-media-upload";
import { usePetTypesQuery } from "../../pet-types/hooks/usePetTypeQueries";
import { useServiceTypesQuery } from "../../service-types/hooks/useServiceTypeQueries";
import { useProviderQueries } from "../../providers/hooks/useProviderQueries";
import { AddonsSection } from "../components/AddonsSection";
import { Service } from "../types";

interface ServiceFormProps {
  service?: Service;
  onSubmit: (data: ServiceFormValues) => void;
  isLoading?: boolean;
  mode?: "create" | "edit";
}

export function ServiceForm({
  service,
  onSubmit,
  isLoading,
  mode = "create",
}: ServiceFormProps) {
  const uploadMedia = useMediaUpload();
  const isEditMode = mode === "edit";

  // Always use create schema for form structure, transform on submit
  const defaultValues = getServiceDefaultValues(service);

  // State for thumbnail image
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    service?.thumbnail_media_object?.file_path
      ? process.env.NEXT_PUBLIC_IMAGE_URL +
          service.thumbnail_media_object.file_path
      : null
  );
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  // State for gallery images
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>(
    service?.gallery
      ? service.gallery.map((item) =>
          item.media_object
            ? process.env.NEXT_PUBLIC_IMAGE_URL + item.media_object.file_path
            : ""
        )
      : []
  );
  const [galleryMediaIds, setGalleryMediaIds] = useState<number[]>([]);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Fetch service types
  const { data: serviceTypesData, isLoading: isLoadingServiceTypes } =
    useServiceTypesQuery({
      status: "active",
      limit: 100, // Get all active service types
    });

  // Fetch pet types
  const { data: petTypesData, isLoading: isLoadingPetTypes } = usePetTypesQuery(
    {
      status: "active",
      limit: 100, // Get all active pet types
    }
  );

  // Fetch providers
  const { providersQuery } = useProviderQueries();
  const { data: providersData, isLoading: isLoadingProviders } = providersQuery(
    {
      status: "approved", // Only approved providers
      per_page: 100, // Get all approved providers
    }
  );

  const availableServiceTypes = serviceTypesData?.data?.data || [];
  const availablePetTypes = petTypesData?.data?.data || [];
  const availableProviders = providersData?.data?.data || [];

  const methods = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = methods;

  const isActiveValue = watch("is_active");

  // Initialize media state for existing service
  useEffect(() => {
    if (service) {
      // Initialize gallery media IDs if they exist
      if (service.media_object_ids && service.media_object_ids.length > 0) {
        setGalleryMediaIds(service.media_object_ids);
      }
    }
  }, [service]);

  // Thumbnail upload handlers
  const handleThumbnailUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setThumbnailFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    try {
      const result = await uploadMedia.mutateAsync({ file });
      const mediaId = getMediaId(result);
      setValue("thumbnail_media_object_id", mediaId);
    } catch (error) {
      console.error("Thumbnail upload failed:", error);
      setThumbnailFile(null);
      setThumbnailPreview(null);
    }
  };

  const removeThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview(null);
    setValue("thumbnail_media_object_id", 0);
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = "";
    }
  };

  // Gallery upload handlers
  const handleGalleryUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const newGalleryFiles = [...galleryFiles, ...files];
    setGalleryFiles(newGalleryFiles);

    // Create previews
    const newPreviews = [...galleryPreviews];
    const newMediaIds = [...galleryMediaIds];

    for (const file of files) {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        setGalleryPreviews([...newPreviews]);
      };
      reader.readAsDataURL(file);

      // Upload file
      try {
        const result = await uploadMedia.mutateAsync({ file });
        const mediaId = getMediaId(result);
        newMediaIds.push(mediaId);
        setGalleryMediaIds([...newMediaIds]);
        setValue("media_object_ids", [...newMediaIds]);
      } catch (error) {
        console.error("Gallery upload failed:", error);
      }
    }
  };

  const removeGalleryImage = (index: number) => {
    const newFiles = galleryFiles.filter((_, i) => i !== index);
    const newPreviews = galleryPreviews.filter((_, i) => i !== index);
    const newMediaIds = galleryMediaIds.filter((_, i) => i !== index);

    setGalleryFiles(newFiles);
    setGalleryPreviews(newPreviews);
    setGalleryMediaIds(newMediaIds);
    setValue("media_object_ids", newMediaIds);
  };

  const onFormSubmit = async (data: ServiceFormValues) => {
    try {
      // Always use the unified schema format
      await onSubmit(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onFormSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="name">Service Name *</Label>
            <TextInput
              control={control}
              name="name"
              id="name"
              placeholder="Enter service name"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="provider_id">Provider *</Label>
            {isLoadingProviders ? (
              <div className="text-gray-500 mt-2">Loading providers...</div>
            ) : (
              <SelectInput
                control={control}
                name="provider_id"
                options={availableProviders.map((provider) => ({
                  value: provider.id,
                  label: provider.business_name,
                }))}
                placeholder="Select a provider"
                disabled={isLoading}
              />
            )}
            {errors.provider_id && (
              <p className="text-sm text-red-500 mt-1">
                {errors.provider_id.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="description">Description *</Label>
            <TextAreaInput
              control={control}
              name="description"
              id="description"
              placeholder="Describe your service..."
              rows={4}
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Thumbnail Image */}
          <div className="flex flex-col gap-y-2">
            <Label>Thumbnail Image</Label>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => thumbnailInputRef.current?.click()}
                  className="flex items-center gap-2"
                  disabled={uploadMedia.isPending || isLoading}
                >
                  <Upload className="h-4 w-4" />
                  {uploadMedia.isPending ? "Uploading..." : "Choose Thumbnail"}
                </Button>
                <input
                  ref={thumbnailInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  className="hidden"
                />
                {thumbnailFile && (
                  <span className="text-sm text-muted-foreground">
                    {thumbnailFile.name}
                  </span>
                )}
              </div>

              {thumbnailPreview && (
                <div className="relative inline-block">
                  <div className="relative w-32 h-32 border rounded-lg overflow-hidden">
                    <Image
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      fill
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={removeThumbnail}
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    disabled={isLoading}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Image Gallery */}
          <div className="flex flex-col gap-y-2">
            <Label>Image Gallery</Label>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => galleryInputRef.current?.click()}
                  className="flex items-center gap-2"
                  disabled={uploadMedia.isPending || isLoading}
                >
                  <Plus className="h-4 w-4" />
                  Add Gallery Images
                </Button>
                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryUpload}
                  className="hidden"
                />
              </div>

              {galleryPreviews.length > 0 && (
                <div className="flex flex-row gap-4">
                  {galleryPreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <div className="relative w-24 h-24 border rounded-lg overflow-hidden">
                        <Image
                          src={preview}
                          alt={`Gallery image ${index + 1}`}
                          fill
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeGalleryImage(index)}
                        className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0"
                        disabled={isLoading}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="price">Price ($) *</Label>
              <TextInput
                control={control}
                name="price"
                id="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
              />
              {errors.price && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-2">
              <Label htmlFor="duration_minutes">Duration (minutes) *</Label>
              <TextInput
                control={control}
                name="duration_minutes"
                id="duration_minutes"
                type="number"
                min="1"
                placeholder="30"
              />
              {errors.duration_minutes && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.duration_minutes.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="service_type_ids">Service Types *</Label>
            {isLoadingServiceTypes ? (
              <div className="text-gray-500 mt-2">Loading service types...</div>
            ) : (
              <div className="mt-2">
                <CheckboxGroup
                  name="service_type_ids"
                  control={control}
                  options={availableServiceTypes.map((serviceType) => ({
                    value: serviceType.id,
                    label: serviceType.name,
                  }))}
                  disabled={isLoading}
                  className="grid grid-cols-2 md:grid-cols-3 gap-2"
                />
              </div>
            )}
            {errors.service_type_ids && (
              <p className="text-sm text-red-500 mt-1">
                {errors.service_type_ids.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="pet_type_ids">Pet Types *</Label>
            {isLoadingPetTypes ? (
              <div className="text-gray-500 mt-2">Loading pet types...</div>
            ) : (
              <div className="mt-2">
                <CheckboxGroup
                  name="pet_type_ids"
                  control={control}
                  options={availablePetTypes.map((petType) => ({
                    value: petType.id,
                    label: petType.name,
                  }))}
                  className="grid grid-cols-2 md:grid-cols-3 gap-2"
                  disabled={isLoading}
                />
              </div>
            )}
            {errors.pet_type_ids && (
              <p className="text-sm text-red-500 mt-1">
                {errors.pet_type_ids.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="is_active">Status</Label>
            <select
              id="is_active"
              value={isActiveValue ? "true" : "false"}
              onChange={(e) => setValue("is_active", e.target.value === "true")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="false">Inactive</option>
              <option value="true">Active</option>
            </select>
            {errors.is_active && (
              <p className="text-sm text-red-500 mt-1">
                {errors.is_active.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="cancellation_policy">
              Cancellation Policy{" "}
              <span className="text-gray-400">(Optional)</span>
            </Label>
            <TextAreaInput
              control={control}
              name="cancellation_policy"
              id="cancellation_policy"
              placeholder="Enter cancellation policy details (e.g., 24-hour notice required, refund policy, etc.)"
              rows={4}
            />
            {errors.cancellation_policy && (
              <p className="text-sm text-red-500 mt-1">
                {errors.cancellation_policy.message}
              </p>
            )}
          </div>
        </div>

        {/* Add-ons Section */}
        <AddonsSection control={control} isLoading={isLoading} />

        <Button
          type="submit"
          disabled={isLoading}
          className="bg-purple-400 hover:bg-purple-500"
        >
          {isLoading
            ? "Saving..."
            : service
              ? "Update Service"
              : "Create Service"}
        </Button>
      </form>
    </FormProvider>
  );
}
