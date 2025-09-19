import { Provider } from "../../providers/types";

export enum AddonUnit {
  PER_SESSION = "per session",
  PER_PET = "per pet",
  PER_HOUR = "per hour",
  PER_DAY = "per day",
}
export type Addon = {
  id: number;
  name: string;
  description: string;
  status: string;
};

export type ServiceAddon = {
  id: number;
  addon_id: number;
  price: string;
  unit: AddonUnit;
  restrictions: Array<string>;
  is_active: boolean;
  service_id: number;
  addon: Addon;
  created_at: string;
  updated_at: string;
};

export type MediaObject = {
  id: number;
  file_path: string;
  file_type: string;
  file_name: string;
  created_at: string;
  updated_at: string;
};

export type ServiceType = {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  sort_order: number;
};

export type PetType = {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  sort_order: number;
};

export type Service = {
  id: number;
  name: string;
  provider_id: number;
  provider?: Provider;
  description: string;
  price: string;
  duration_minutes: number;
  is_active: boolean;
  service_types: Array<ServiceType>;
  service_type_ids: Array<number>;
  pet_types: Array<PetType>;
  pet_type_ids: Array<number>;
  thumbnail_media_object_id: number;
  media_object_ids: any;
  addons: Array<ServiceAddon>;
  gallery: Array<{
    id: number;
    media_object: MediaObject;
    created_at: string;
  }>;
  thumbnail_media_object: MediaObject;
  cancellation_policy: string;
  created_at: string;
  updated_at: string;
};
