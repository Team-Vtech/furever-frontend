export enum Status {
  ACTIVE = "active",
  NOT_ACTIVE = "not_active",
}

export type PropertyCategory = {
  id: string;
  name: string;
  machine_name: string;
  description: string;
  status: Status;
  created_at: string;
  updated_at: string;
};

export type Plan = {
  id: string;
  name: string;
  description: string;
  price: string;
  duration_days: number;
  features: Array<string>;
  max_listings: number;
  status: string;
  created_at: string;
  updated_at: string;
  subscriptions: Array<any>;
  transactions: Array<any>;
};

export type Country = {
  id: string;
  name: string;
  code: string;
  iso2: string;
  phone_code: string;
  currency: string;
  flag: string;
  status: Status;
};

export type City = {
  id: string;
  name: string;
  country: Country;
  country_id: string;
  status: Status;
  latitude: string;
  longitude: string;
  boundaries?: Array<[number, number]>;
};

export type Area = {
  id: string;
  name: string;
  postal_code: string;
  city: City;
  city_id: string;
  status: Status;
  latitude: string;
  longitude: string;
  boundaries?: Array<[number, number]>;
};

export type MediaObject = {
  id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  url: string;
  alt_text?: string;
  description?: string;
  created_at: string;
  updated_at: string;
};

export type CreateMediaObjectData = {
  file: File;
  alt_text?: string;
  description?: string;
};

export type MediaUploadResponse = {
  id: number;
  url: string;
  file_name: string;
  file_size: number;
  mime_type: string;
};
