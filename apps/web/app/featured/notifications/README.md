# Notifications Feature

This feature provides a comprehensive notification system for users to view, manage, and interact with their notifications.

## Features

- ✅ View all notifications with pagination
- ✅ Filter to show only unread notifications
- ✅ Mark individual notifications as read
- ✅ Mark all notifications as read
- ✅ Delete individual notifications
- ✅ View notification statistics
- ✅ Real-time updates with React Query
- ✅ Responsive design with Tailwind CSS
- ✅ Loading states and error handling

## API Endpoints

The notification system integrates with the following backend endpoints:

### Get All Notifications

```
GET /api/notifications?page=1&per_page=20
GET /api/notifications?unread_only=true
```

### Get Notification Stats

```
GET /api/notifications/stats
```

### Mark All as Read

```
PATCH /api/notifications/mark-all-read
```

### Delete Notification

```
DELETE /api/notifications/{id}
```

### Mark as Read

```
PATCH /api/notifications/{id}/read
```

## Data Structure

### Notification Object

```typescript
interface Notification {
    id: string;
    type: NotificationType;
    data: NotificationData;
    read_at: string | null;
    created_at: string;
    updated_at: string;
    is_read: boolean;
}
```

### Notification Data

```typescript
interface NotificationData {
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
```

### Notification Stats

```typescript
interface NotificationStats {
    total: number;
    unread: number;
    read: number;
}
```

## Components

### NotificationCard

Displays individual notification with:

- Notification type icon and title
- Creation date and time
- Notification data (booking details, etc.)
- Mark as read button
- Delete button
- Visual indicators for unread status

### NotificationList

Manages the list of notifications with:

- Header with stats and actions
- Filter toggle (all/unread only)
- Mark all as read functionality
- Refresh button
- Empty state handling
- Loading states

### NotificationStats

Shows notification statistics:

- Total notifications
- Unread count
- Read count
- Loading states

### NotificationsScreen

Main screen component that:

- Integrates all components
- Manages state and API calls
- Handles error states
- Provides pagination
- Uses React Query for data fetching

## Usage

### Basic Usage

```tsx
import { NotificationsScreen } from "@/app/featured/notifications";

export default function NotificationsPage() {
    return <NotificationsScreen />;
}
```

### Custom Implementation

```tsx
import { NotificationList, NotificationStats, NotificationsClient } from "@/app/featured/notifications";

function CustomNotificationsPage() {
    const { data: notifications } = useQuery({
        queryKey: ["notifications"],
        queryFn: () => NotificationsClient.getNotifications(),
    });

    return (
        <div>
            <NotificationStats stats={stats} />
            <NotificationList notifications={notifications} onMarkAsRead={handleMarkAsRead} onDelete={handleDelete} />
        </div>
    );
}
```

## API Client

The `NotificationsClient` provides methods for all notification operations:

```typescript
// Get notifications with pagination and filters
const notifications = await NotificationsClient.getNotifications({
    page: 1,
    per_page: 20,
    unread_only: false,
});

// Get notification statistics
const stats = await NotificationsClient.getNotificationStats();

// Mark all notifications as read
await NotificationsClient.markAllAsRead();

// Mark single notification as read
await NotificationsClient.markAsRead(notificationId);

// Delete notification
await NotificationsClient.deleteNotification(notificationId);
```

## Styling

The components use Tailwind CSS with:

- Responsive design (mobile-first)
- Consistent spacing and typography
- Color-coded notification types
- Hover states and transitions
- Loading skeletons
- Error states

## Error Handling

- Network errors are caught and displayed to users
- Loading states prevent multiple API calls
- Optimistic updates with rollback on failure
- Toast notifications for user feedback

## Accessibility

- Semantic HTML structure
- ARIA labels for screen readers
- Keyboard navigation support
- Color contrast compliance
- Focus management
