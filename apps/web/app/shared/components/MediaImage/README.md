# MediaImage Component

A shared image component that renders a Next.js Image from a MediaObject with proper fallbacks and URL construction.

## Usage

```tsx
import { MediaImage } from "@/app/shared/components/MediaImage";

// Basic usage with media object
<MediaImage
  mediaObject={user.media_object}
  width={200}
  height={200}
  className="rounded-lg"
/>

// With fallback image
<MediaImage
  mediaObject={provider.media_object}
  fallbackSrc="/images/default-avatar.png"
  fallbackAlt="Default avatar"
  width={100}
  height={100}
  className="rounded-full"
/>

// All Next.js Image props are supported
<MediaImage
  mediaObject={petType.media_object}
  width={300}
  height={200}
  fill={false}
  priority
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover rounded-md"
/>
```

## Props

| Prop          | Type                               | Required | Description                                      |
| ------------- | ---------------------------------- | -------- | ------------------------------------------------ |
| `mediaObject` | `MediaObject \| null \| undefined` | ✅       | The media object containing image information    |
| `fallbackAlt` | `string`                           | ❌       | Fallback alt text (default: "Image")             |
| `fallbackSrc` | `string`                           | ❌       | Fallback image source if media object is missing |
| `className`   | `string`                           | ❌       | Additional CSS classes                           |
| ...imageProps | `ComponentProps<typeof Image>`     | ❌       | All Next.js Image props (except `src` and `alt`) |

## Features

- 🎯 **Type-safe**: Full TypeScript support with proper prop types
- 🖼️ **Smart fallbacks**: Handles missing media objects gracefully
- 🌐 **URL construction**: Automatically constructs image URLs using `NEXT_PUBLIC_IMAGE_URL`
- ♿ **Accessibility**: Uses media object `alt_text` or fallback alt text
- 📝 **Rich metadata**: Sets image `title` from media object `description`
- 🎨 **Flexible styling**: Supports all Next.js Image props and custom classes

## Environment Variables

Make sure `NEXT_PUBLIC_IMAGE_URL` is configured in your environment variables.
