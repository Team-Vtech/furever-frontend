export type MediaObject = {
  id: number;
  file_path: string;
  file_type: string;
  file_name: string;
  created_at: string;
  updated_at: string;
};

export type PetType = {
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
