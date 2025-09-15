export interface CreateServiceTypeData {
  name: string;
  description: string;
  status: "active" | "inactive";
  media_object_id?: number;
}

export interface UpdateServiceTypeData {
  name?: string;
  description?: string;
  status?: "active" | "inactive";
  media_object_id?: string;
}

export interface GetServiceTypesParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: "active" | "inactive";
}

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
  media_object_id: number;
  media_object: MediaObject;
  created_at: string;
  updated_at: string;
};
