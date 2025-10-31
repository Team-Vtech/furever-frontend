// Base types from Postman collection analysis
export enum BookingStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
}

export type PetBreed = {
    id: number;
    name: string;
    code: string;
    pet_type_id: number;
    created_at: string;
    updated_at: string;
};

export type Pet = {
    id: number;
    name: string;
    pet_type_id: number;
    pet_breed_id: number;
    gender: "Male" | "Female";
    date_of_birth: string;
    vaccination_status: "Yes" | "No" | "Not Sure";
    weight: string;
    notes?: string;
    profile_image_id?: number;
    pet_type?: PetType;
    pet_breed?: PetBreed;
    media_object?: MediaObject;
    media_object_id?: number;
    created_at: string;
    updated_at: string;
};

export type BookingAddon = {
    id: number;
    booking_id: number;
    service_addon_id: number;
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
    roles: number[];
    provider_id?: number;
    roles_details: Role[];
    media_object: MediaObject;
};

export enum Status {
    ACTIVE = "active",
    NOT_ACTIVE = "not_active",
}

export enum GeneralStatus {
    ACTIVE = "active",
    DISABLED = "disabled",
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

export type MediaObject = {
    id: number;
    file_name: string;
    file_path: string;
    file_size: number;
    file_type: string;
    file_url: string;
    url: string;
    alt_text?: string;
    description?: string;
    created_at: string;
    updated_at: string;
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

export type UserSettingsLocation = {
    id: number;
    title: string;
    street: string;
    city: string;
    area: string;
    latitude: string;
    longitude: string;
    gps_coordinates: {
        latitude: number;
        longitude: number;
    };
    is_default: boolean;
    created_at: string;
    updated_at: string;
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

export type WorkingHour = {
    day_of_week: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
    start_time?: string;
    end_time?: string;
    is_closed: boolean;
    notes?: string;
};
export enum ProviderStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
}

export type Provider = {
    id: number;
    business_name: string;
    contact_person_name: string;
    email: string;
    phone_number: string;
    location: Location;
    status: ProviderStatus;
    created_at: string;
    updated_at: string;
    provider_id: number;
    media_object_id: number;
    media_object: MediaObject;
    galleries: {
        id: number;
        media_object: MediaObject;
        created_at: string;
        updated_at: string;
    }[];
    certificates: Array<ProviderCertificate>;
    working_hours?: Array<WorkingHour>;
    bookings?: Array<Booking>;
    services?: Array<Service>;
    users?: Array<User>;
    start_from: string;
    reviews_average: number;
    reviews_count: number;
    reviews: Array<{
        id: number;
        booking_id: number;
        user_id: number;
        rating: number;
        comment: string;
        reviewed_at: string;
        user: User;
        created_at: string;
        updated_at: string;
    }>;
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

export type PetType = {
    id: number;
    name: string;
    status: GeneralStatus;
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

export enum PaymentStatus {
    COMPLETED = "completed",
    PENDING = "pending",
    PROCESSING = "processing",
    FAILED = "failed",
    REFUNDED = "refunded",
    CANCELLED = "cancelled",
    UNKNOWN = "unknown",
}

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
    payment_status: PaymentStatus;
    notes?: string;
    user: User;
    pet: Pet;
    provider: Provider;
    service: Service;
    booking_addons: BookingAddon[];
    created_at: string;
    updated_at: string;
};

export type DashboardStatistics = Record<
    string,
    {
        total: number;
        last_month: number;
        title: string;
    }
>;

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

export interface City {
    label: string;
    city: string;
    state: string;
    country: string;
}

export interface State {
    label: string;
    state: string;
    country: string;
}

export interface BookingStatistics {}

// Notification types
export type NotificationType =
    | "App\\Notifications\\BookingCreatedNotification"
    | "App\\Notifications\\BookingConfirmedNotification"
    | "App\\Notifications\\BookingCancelledNotification"
    | "App\\Notifications\\BookingCompletedNotification"
    | "App\\Notifications\\PaymentReceivedNotification"
    | "App\\Notifications\\ReminderNotification";

export interface NotificationData {
    booking_id?: number;
    status?: string;
    service_name?: string;
    provider_name?: string;
    booking_date?: string;
    booking_time?: string;
    pet_name?: string;
    total_price?: number;
    message?: string;
    [key: string]: any;
}

export interface Notification {
    id: string;
    type: NotificationType;
    data: NotificationData;
    read_at: string | null;
    created_at: string;
    updated_at: string;
    is_read: boolean;
}

export interface NotificationStats {
    total: number;
    unread: number;
    read: number;
}

export interface NotificationResponse {
    data: Notification[];
    meta: {
        current_page: number;
        per_page: number;
        total: number;
        last_page: number;
    };
}

export interface JsonResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

// Review types
export interface Review {
    id: number;
    booking_id: number;
    user_id: number;
    rating: number;
    comment: string;
    reviewed_at: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
    booking: {
        id: number;
        booking_date: string;
        status: BookingStatus;
    };
    created_at: string;
    updated_at: string;
}

export interface CreateReviewRequest {
    rating: number;
    comment: string;
}

export interface UpdateReviewRequest {
    rating: number;
    comment: string;
}

export interface Transaction {
    id: number;
    paddle_id: string;
    invoice_number: string;
    status: string;
    total: string;
    tax: string;
    invoicePdf: string;
    currency: string;
    billed_at: string;
    created_at: string;
    payment_method: PaymentStatus;
    booking: Booking;
}

export interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    status: string;
    user: any;
    created_at: string;
    updated_at: string;
}
