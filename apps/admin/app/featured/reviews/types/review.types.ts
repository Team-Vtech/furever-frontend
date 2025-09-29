export interface Review {
    id: string;
    customerName: string;
    avatar: string;
    serviceName: string;
    rating: number;
    date: string;
    petType: "dog" | "cat" | "other";
}

export interface ReviewStats {
    overallRating: number;
    totalReviews: number;
    starBreakdown: {
        5: number;
        4: number;
        3: number;
        2: number;
        1: number;
    };
}

export interface ServiceStats {
    serviceName: string;
    reviewCount: number;
}

export interface PetTypeStats {
    dogs: number;
    cats: number;
}

export interface ReviewFilters {
    service: string;
    petType: string;
    rating: string;
    dateRange: string;
}
