# Review Booking Feature

This feature provides a comprehensive review system for completed bookings, allowing users to rate and review services they've received.

## Features

- ✅ Access control - Only completed bookings can be reviewed
- ✅ Create, read, update, delete reviews
- ✅ Star rating system (1-5 stars)
- ✅ Comment system with character limits
- ✅ Review statistics and averages
- ✅ User authentication and authorization
- ✅ Real-time updates with React Query
- ✅ Responsive design with Tailwind CSS
- ✅ Loading states and error handling

## API Endpoints

The review system integrates with the following backend endpoints:

### Get Reviews for a Booking

```
GET /api/bookings/{booking}/reviews
```

### Create a Review

```
POST /api/bookings/{booking}/reviews
{
  "rating": 5,
  "comment": "Excellent service!"
}
```

### Get Specific Review

```
GET /api/bookings/{booking}/reviews/{review}
```

### Update Review

```
PUT /api/bookings/{booking}/reviews/{review}
{
  "rating": 4,
  "comment": "Updated review"
}
```

### Delete Review

```
DELETE /api/bookings/{booking}/reviews/{review}
```

## Data Structure

### Review Object

```typescript
interface Review {
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
```

### Review Request Objects

```typescript
interface CreateReviewRequest {
    rating: number;
    comment: string;
}

interface UpdateReviewRequest {
    rating: number;
    comment: string;
}
```

## Components

### ReviewCard

Displays individual review with:

- User avatar and information
- Star rating display
- Review comment
- Review date and booking date
- Edit/delete actions (if authorized)
- Status indicators

### ReviewForm

Interactive form for creating/editing reviews:

- Interactive star rating (1-5 stars)
- Comment textarea with character limit (500 chars)
- Form validation with Zod
- Loading states
- Submit/cancel actions

### ReviewList

Manages the list of reviews with:

- Review statistics and averages
- Rating distribution chart
- Empty state handling
- Create review button
- Individual review cards

### ReviewBookingScreen

Main screen component that:

- Validates booking completion status
- Shows booking summary
- Manages review CRUD operations
- Handles access control
- Provides navigation back to booking

## Access Control

### Booking Status Validation

- Only bookings with status "completed" can be reviewed
- Users are redirected if booking is not completed
- Clear error messages for invalid access

### User Authorization

- Users can only edit/delete their own reviews
- Users can only create one review per booking
- Proper permission checks for all actions

## Usage

### Basic Usage

```tsx
import { ReviewBookingScreen } from "@/app/featured/reviews";

export default function ReviewBookingPage({ params }) {
    return <ReviewBookingScreen bookingId={params.id} />;
}
```

### Custom Implementation

```tsx
import { ReviewList, ReviewForm, ReviewsClient } from "@/app/featured/reviews";

function CustomReviewPage() {
    const { data: reviews } = useQuery({
        queryKey: ["reviews", bookingId],
        queryFn: () => ReviewsClient.getBookingReviews(bookingId),
    });

    return (
        <div>
            <ReviewList reviews={reviews} canCreateReview={true} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
}
```

## API Client

The `ReviewsClient` provides methods for all review operations:

```typescript
// Get reviews for a booking
const reviews = await ReviewsClient.getBookingReviews(bookingId);

// Create a review
await ReviewsClient.createReview(bookingId, {
    rating: 5,
    comment: "Excellent service!",
});

// Update a review
await ReviewsClient.updateReview(bookingId, reviewId, {
    rating: 4,
    comment: "Updated review",
});

// Delete a review
await ReviewsClient.deleteReview(bookingId, reviewId);
```

## Routing

### Page Routes

- `/bookings/[id]/review` - Review booking page

### API Routes

- `/api/bookings/[booking]/reviews` - GET, POST
- `/api/bookings/[booking]/reviews/[review]` - GET, PUT, DELETE

## Styling

The components use Tailwind CSS with:

- Responsive design (mobile-first)
- Consistent spacing and typography
- Interactive star ratings with hover effects
- Color-coded status indicators
- Loading skeletons
- Error states

## Error Handling

- Network errors are caught and displayed to users
- Loading states prevent multiple API calls
- Optimistic updates with rollback on failure
- Toast notifications for user feedback
- Access control with clear error messages

## Accessibility

- Semantic HTML structure
- ARIA labels for screen readers
- Keyboard navigation support
- Color contrast compliance
- Focus management
- Interactive elements are properly labeled

## Security

- Server-side validation of booking status
- User authorization checks
- Input sanitization and validation
- CSRF protection through Next.js
- Secure API endpoints
