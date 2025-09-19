// Base types from Postman collection analysis
export type BookingStatus =
  | "pending"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled";

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
};

export type PetType = {
  id: number;
  name: string;
};

export type Pet = {
  id: number;
  name: string;
  breed: string;
  gender: "Male" | "Female";
  date_of_birth: string;
  vaccination_status: "Yes" | "No" | "Partial";
  weight: number;
  notes?: string;
  pet_type_id: number;
  pet_type: PetType;
};

export type Provider = {
  id: number;
  business_name: string;
  contact_person_name: string;
  phone_number: string;
  email?: string;
  location?: {
    address: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
    latitude: number;
    longitude: number;
  };
  status: "pending" | "approved" | "rejected" | "suspended";
};

export type Service = {
  id: number;
  name: string;
  description: string;
  price: string;
  duration_minutes: number;
  is_active: boolean;
};

export type ServiceAddon = {
  id: number;
  price: string;
  unit: string;
  restrictions?: string[];
  addon: {
    id: number;
    name: string;
    description: string;
  };
};

export type BookingAddon = {
  id: number;
  booking_id: number;
  service_addon_id: number;
  quantity: number;
  unit_price: string;
  total_price: string;
  service_addon: ServiceAddon;
  created_at: string;
  updated_at: string;
};

export type Booking = {
  id: number;
  user_id: number;
  pet_id: number;
  provider_id: number;
  service_id: number;
  booking_date: string;
  booking_time: string;
  service_cost: string;
  addons_total_cost: string;
  total_price: string;
  status: BookingStatus;
  notes?: string;
  user: User;
  pet: Pet;
  provider: Provider;
  service: Service;
  booking_addons: BookingAddon[];
  created_at: string;
  updated_at: string;
};
