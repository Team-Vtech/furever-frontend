/**
 * Utility functions for property API interactions
 */

// API base URL
const API_BASE_URL = "/api";

/**
 * Build API URL with query parameters
 */
export function buildApiUrl(
  endpoint: string,
  params: Record<string, any> = {}
): string {
  const url = new URL(endpoint, window.location.origin);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((v) => url.searchParams.append(key, String(v)));
      } else {
        url.searchParams.set(key, String(value));
      }
    }
  });

  return url.toString();
}

/**
 * Convert URLSearchParams to plain object
 */
export function searchParamsToObject(
  searchParams: URLSearchParams
): Record<string, string> {
  const obj: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    obj[key] = value;
  }
  return obj;
}

/**
 * Format property filter parameters for API
 */
export function formatFilterParams(
  filters: Record<string, any>
): Record<string, any> {
  const formatted: Record<string, any> = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      // Handle special cases
      switch (key) {
        case "priceRange":
          // Convert price range to min/max
          if (value === "0-500k") {
            formatted.maxPrice = 500000;
          } else if (value === "500k-1m") {
            formatted.minPrice = 500000;
            formatted.maxPrice = 1000000;
          } else if (value === "1m-2m") {
            formatted.minPrice = 1000000;
            formatted.maxPrice = 2000000;
          } else if (value === "2m+") {
            formatted.minPrice = 2000000;
          }
          break;
        case "bedrooms":
        case "bathrooms":
          // Ensure numeric values
          formatted[key] = parseInt(value);
          break;
        case "featured":
        case "priceDrop":
          // Convert to boolean
          formatted[key] = value === "true";
          break;
        default:
          formatted[key] = value;
      }
    }
  });

  return formatted;
}

/**
 * Property API endpoints
 */
export const PROPERTY_ENDPOINTS = {
  list: `${API_BASE_URL}/properties`,
  single: (id: string) => `${API_BASE_URL}/properties/${id}`,
} as const;

/**
 * Default pagination settings
 */
export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 12,
} as const;

/**
 * Available sort options
 */
export const SORT_OPTIONS = [
  { value: "featured", label: "Featured First" },
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
] as const;

/**
 * Property type options
 */
export const PROPERTY_TYPES = [
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "villa", label: "Villa" },
  { value: "townhouse", label: "Townhouse" },
] as const;

/**
 * Listing type options
 */
export const LISTING_TYPES = [
  { value: "sale", label: "For Sale" },
  { value: "rent", label: "For Rent" },
] as const;

/**
 * Price range options
 */
export const PRICE_RANGES = [
  { value: "0-500k", label: "$0 - $500K" },
  { value: "500k-1m", label: "$500K - $1M" },
  { value: "1m-2m", label: "$1M - $2M" },
  { value: "2m+", label: "$2M+" },
] as const;
