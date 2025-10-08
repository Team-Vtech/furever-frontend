import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const ProviderSearchSchema = z.object({
  query: z.string().optional(),
  location: z.string().optional(),
  service_type: z.string().optional(),
  price_min: z.string().optional(),
  price_max: z.string().optional(),
  rating: z.string().optional(),
  distance: z.string().optional(),
  sort: z.enum(['rating', 'price', 'distance', 'reviews']).optional().default('rating'),
  page: z.string().optional().default('1'),
  limit: z.string().optional().default('10'),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const searchQuery = ProviderSearchSchema.parse({
      query: searchParams.get('query') || undefined,
      location: searchParams.get('location') || undefined,
      service_type: searchParams.get('service_type') || undefined,
      price_min: searchParams.get('price_min') || undefined,
      price_max: searchParams.get('price_max') || undefined,
      rating: searchParams.get('rating') || undefined,
      distance: searchParams.get('distance') || undefined,
      sort: searchParams.get('sort') || 'rating',
      page: searchParams.get('page') || '1',
      limit: searchParams.get('limit') || '10',
    });

    // Mock data - In production, this would call the actual backend API
    const mockProviders = [
      {
        id: 1,
        business_name: 'Sarah Johnson Pet Care',
        contact_person_name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone_number: '+1 (206) 555-0123',
        location: {
          id: 1,
          country: 'United States',
          state: 'WA',
          city: 'Seattle',
          address: '123 Pine St, Seattle, WA 98101',
          postal_code: '98101',
          latitude: '47.6062',
          longitude: '-122.3321',
          created_at: '2024-01-15T00:00:00Z',
          updated_at: '2024-01-15T00:00:00Z',
          provider_id: 1
        },
        status: 'approved' as const,
        created_at: '2024-01-15T00:00:00Z',
        updated_at: '2024-01-15T00:00:00Z',
        provider_id: 1,
        media_object_id: 1,
        media_object: {
          id: 1,
          file_name: 'sarah.jpg',
          file_path: '/images/providers/sarah.jpg',
          file_size: 102400,
          mime_type: 'image/jpeg',
          url: '/images/providers/sarah.jpg',
          alt_text: 'Sarah Johnson profile photo',
          description: 'Profile photo of Sarah Johnson',
          created_at: '2024-01-15T00:00:00Z',
          updated_at: '2024-01-15T00:00:00Z'
        },
        services: [
          {
            id: 1,
            name: 'Pet Sitting',
            provider_id: 1,
            description: 'In-home pet sitting service with love and care',
            price: '25.00',
            duration_minutes: 60,
            status: 'active' as const,
            service_types: [],
            service_type_ids: [1],
            pet_types: [],
            pet_type_ids: [1, 2],
            thumbnail_media_object_id: 1,
            media_object_ids: [1],
            addons: [],
            gallery: [],
            thumbnail_media_object: {
              id: 1,
              file_name: 'pet-sitting.jpg',
              file_path: '/images/services/pet-sitting.jpg',
              file_size: 51200,
              mime_type: 'image/jpeg',
              url: '/images/services/pet-sitting.jpg',
              created_at: '2024-01-15T00:00:00Z',
              updated_at: '2024-01-15T00:00:00Z'
            },
            cancellation_policy: 'Free cancellation up to 24 hours before service',
            created_at: '2024-01-15T00:00:00Z',
            updated_at: '2024-01-15T00:00:00Z'
          },
          {
            id: 2,
            name: 'Dog Walking',
            provider_id: 1,
            description: '30-minute professional dog walking service',
            price: '20.00',
            duration_minutes: 30,
            status: 'active' as const,
            service_types: [],
            service_type_ids: [2],
            pet_types: [],
            pet_type_ids: [1],
            thumbnail_media_object_id: 2,
            media_object_ids: [2],
            addons: [],
            gallery: [],
            thumbnail_media_object: {
              id: 2,
              file_name: 'dog-walking.jpg',
              file_path: '/images/services/dog-walking.jpg',
              file_size: 61440,
              mime_type: 'image/jpeg',
              url: '/images/services/dog-walking.jpg',
              created_at: '2024-01-15T00:00:00Z',
              updated_at: '2024-01-15T00:00:00Z'
            },
            cancellation_policy: 'Free cancellation up to 2 hours before service',
            created_at: '2024-01-15T00:00:00Z',
            updated_at: '2024-01-15T00:00:00Z'
          }
        ],
        // Additional fields for UI display
        rating: 4.8,
        reviewCount: 127,
        bio: 'Experienced pet sitter with 5+ years of caring for dogs and cats. I treat every pet like my own family!',
        isVerified: true,
        responseTime: 'Usually responds within 1 hour'
      },
      {
        id: 2,
        business_name: 'Mike Rodriguez Dog Walking',
        contact_person_name: 'Mike Rodriguez',
        email: 'mike@example.com',
        phone_number: '+1 (206) 555-0456',
        location: {
          id: 2,
          country: 'United States',
          state: 'WA',
          city: 'Seattle',
          address: '456 Capitol Hill Ave, Seattle, WA 98102',
          postal_code: '98102',
          latitude: '47.6205',
          longitude: '-122.3212',
          created_at: '2024-01-20T00:00:00Z',
          updated_at: '2024-01-20T00:00:00Z',
          provider_id: 2
        },
        status: 'approved' as const,
        created_at: '2024-01-20T00:00:00Z',
        updated_at: '2024-01-20T00:00:00Z',
        provider_id: 2,
        media_object_id: 2,
        media_object: {
          id: 2,
          file_name: 'mike.jpg',
          file_path: '/images/providers/mike.jpg',
          file_size: 98304,
          mime_type: 'image/jpeg',
          url: '/images/providers/mike.jpg',
          alt_text: 'Mike Rodriguez profile photo',
          description: 'Profile photo of Mike Rodriguez',
          created_at: '2024-01-20T00:00:00Z',
          updated_at: '2024-01-20T00:00:00Z'
        },
        services: [
          {
            id: 3,
            name: 'Professional Dog Walking',
            provider_id: 2,
            description: 'Expert dog walking service with exercise and socialization',
            price: '30.00',
            duration_minutes: 45,
            status: 'active' as const,
            service_types: [],
            service_type_ids: [2],
            pet_types: [],
            pet_type_ids: [1],
            thumbnail_media_object_id: 3,
            media_object_ids: [3],
            addons: [],
            gallery: [],
            thumbnail_media_object: {
              id: 3,
              file_name: 'pro-dog-walking.jpg',
              file_path: '/images/services/pro-dog-walking.jpg',
              file_size: 71680,
              mime_type: 'image/jpeg',
              url: '/images/services/pro-dog-walking.jpg',
              created_at: '2024-01-20T00:00:00Z',
              updated_at: '2024-01-20T00:00:00Z'
            },
            cancellation_policy: 'Free cancellation up to 1 hour before service',
            created_at: '2024-01-20T00:00:00Z',
            updated_at: '2024-01-20T00:00:00Z'
          }
        ],
        // Additional fields for UI display
        rating: 4.9,
        reviewCount: 89,
        bio: 'Professional dog walker with 3+ years of experience. I love helping dogs stay active and happy!',
        isVerified: true,
        responseTime: 'Usually responds within 2 hours'
      },
    ];

    const page = parseInt(searchQuery.page);
    const limit = parseInt(searchQuery.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    // Filter providers based on search parameters
    let filteredProviders = mockProviders;
    
    if (searchQuery.query) {
      const queryLower = searchQuery.query.toLowerCase();
      filteredProviders = filteredProviders.filter(provider => 
        provider.business_name.toLowerCase().includes(queryLower) ||
        provider.contact_person_name.toLowerCase().includes(queryLower) ||
        provider.services.some(service => service.name.toLowerCase().includes(queryLower))
      );
    }
    
    if (searchQuery.location) {
      const locationLower = searchQuery.location.toLowerCase();
      filteredProviders = filteredProviders.filter(provider => 
        provider.location.city.toLowerCase().includes(locationLower) ||
        provider.location.state.toLowerCase().includes(locationLower)
      );
    }
    
    if (searchQuery.service_type) {
      const serviceTypeLower = searchQuery.service_type.toLowerCase();
      filteredProviders = filteredProviders.filter(provider =>
        provider.services.some(service => 
          service.name.toLowerCase().includes(serviceTypeLower)
        )
      );
    }

    if (searchQuery.price_min || searchQuery.price_max) {
      const minPrice = searchQuery.price_min ? parseFloat(searchQuery.price_min) : 0;
      const maxPrice = searchQuery.price_max ? parseFloat(searchQuery.price_max) : Infinity;
      
      filteredProviders = filteredProviders.filter(provider =>
        provider.services.some(service => {
          const servicePrice = parseFloat(service.price);
          return servicePrice >= minPrice && servicePrice <= maxPrice;
        })
      );
    }

    // Sort providers
    if (searchQuery.sort) {
      filteredProviders.sort((a, b) => {
        switch (searchQuery.sort) {
          case 'rating':
            return (b.rating || 0) - (a.rating || 0);
          case 'price':
            const aMinPrice = Math.min(...a.services.map(s => parseFloat(s.price)));
            const bMinPrice = Math.min(...b.services.map(s => parseFloat(s.price)));
            return aMinPrice - bMinPrice;
          case 'reviews':
            return (b.reviewCount || 0) - (a.reviewCount || 0);
          default:
            return 0;
        }
      });
    }
    
    const paginatedProviders = filteredProviders.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: {
        providers: paginatedProviders,
        pagination: {
          current_page: page,
          per_page: limit,
          total: filteredProviders.length,
          last_page: Math.ceil(filteredProviders.length / limit),
          has_more: endIndex < filteredProviders.length,
          prev_page: page > 1 ? page - 1 : null,
          next_page: endIndex < filteredProviders.length ? page + 1 : null
        }
      },
      message: 'Providers retrieved successfully'
    });
  } catch (error) {
    console.error('Error searching providers:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid search parameters',
          details: error.errors
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to search providers' 
      },
      { status: 500 }
    );
  }
}