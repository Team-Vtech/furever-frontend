export type Location = {
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  latitude?: number;
  longitude?: number;
};

export type Provider = {
  id: number;
  business_name: string;
  contact_person_name: string;
  email: string;
  phone_number: string;
  location: Location;
  status: "pending" | "approved" | "rejected" | "inactive";
  created_at: string;
  updated_at: string;
};

export type CreateProviderData = {
  business_name: string;
  contact_person_name: string;
  email: string;
  phone_number: string;
  location: Location;
  status: "pending" | "approved" | "rejected" | "inactive";
};

export type UpdateProviderData = Partial<CreateProviderData>;
