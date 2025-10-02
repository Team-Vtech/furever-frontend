// Base types from Postman collection analysis
export type BookingStatus = "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";

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

export enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    BANNED = "banned",
}

export type UserLocation = {
    title: string;
    street: string;
    city: string;
    area: string;
    latitude: string;
    longitude: string;
    is_default: boolean;
};

export type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    location?: UserLocation;
    status: UserStatus;
    emailVerified: string;
    profile_image_id: number | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    is_deleted: boolean;
    roles: number[]
};

export enum Status {
    ACTIVE = "active",
    NOT_ACTIVE = "not_active",
}

export enum GeneralStatus {
    ACTIVE = "active",
    DISABLED = "disabled",
    DELETED = "deleted",
}

export enum AddonUnit {
    PER_SESSION = "per session",
    PER_PET = "per pet",
    PER_HOUR = "per hour",
    PER_DAY = "per day",
}

export enum CertificateCategory {
    REGULATORY = "regulatory",
    PROFESSIONAL = "professional",
    SPECIALIZED = "specialized",
}

export interface Certificate {
    id: number;
    name: string;
    category: CertificateCategory;
    description: string;
    created_at: string;
    updated_at: string;
}

export type Addon = {
    id: number;
    name: string;
    description: string;
    status: GeneralStatus;
    created_at: string;
    updated_at: string;
};

export type ServiceAddon = {
    id: number;
    addon_id: number;
    price: string;
    unit: AddonUnit;
    restrictions: Array<string>;
    status: GeneralStatus;
    service_id: number;
    addon: Addon;
    created_at: string;
    updated_at: string;
};

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
    id: number;
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

export type Location = {
    id: number;
    country: string;
    state: string;
    city: string;
    address: string;
    postal_code: string;
    latitude: string;
    longitude: string;
    created_at: string;
    updated_at: string;
    provider_id: number;
};

export type ProviderCertificate = {
    id: number;
    certificate_id: number;
    certificate_number: string;
    issued_by: string;
    issued_at: string;
    expires_at: string;
    status: string;
    notes: string;
    media_object: MediaObject;
    file_path: string;
    created_at: string;
    updated_at: string;
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
    provider_id: number;
    media_object_id: number;
    media_object: MediaObject;
    certificates: Array<ProviderCertificate>;
};

export type Role = {
    id: number;
    name: string;
    guard_name: string;
    permissions: Array<Permission>;
    permissions_count: number;
    created_at: string;
    updated_at: string;
};

export type Permission = {
    id: number;
    name: string;
    guard_name: string;
    roles: Array<Role>;
    created_at: string;
    updated_at: string;
};

export type ServiceType = {
    id: number;
    name: string;
    description: string;
    status: GeneralStatus;
    sort_order: number;
    media_object_id: number;
    media_object: MediaObject;
    created_at: string;
    updated_at: string;
};

export type PetBreed = {
    id: number;
    name: string;
    code: string;
    pet_type_id: number;
    created_at: string;
    updated_at: string;
};

export type PetType = {
    id: number;
    name: string;
    description: string;
    is_active: boolean;
    sort_order: number;
    media_object: MediaObject;
    media_object_id: number;
    pet_breeds: PetBreed[];
};

export type Service = {
    id: number;
    name: string;
    provider_id: number;
    provider?: Provider;
    description: string;
    price: string;
    duration_minutes: number;
    status: GeneralStatus;
    service_types: Array<ServiceType>;
    service_type_ids: Array<number>;
    pet_types: Array<PetType>;
    pet_type_ids: Array<number>;
    thumbnail_media_object_id: number;
    media_object_ids: number[];
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

export type BookingStatistics = {
    total_bookings: number;
    total_revenue: string;
    bookings_by_status: Array<{
        service_id: number;
        service_name: string;
        count: number;
    }>;
    bookings_per_provider: Array<{
        provider_id: number;
        provider_name: string;
        count: number;
    }>;
    bookings_per_service: Record<string, number>;
    up_coming_bookings: Array<Booking>;
};

export interface ReviewBooking {
    id: number;
    booking_id: number;
    user_id: number;
    rating: number;
    comment: string;
    reviewed_at: string;
    created_at: string;
    updated_at: string;
    booking: Booking;
    user: User;
}

export * from "./general";
