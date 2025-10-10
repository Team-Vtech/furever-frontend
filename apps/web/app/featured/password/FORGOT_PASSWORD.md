# Forgot Password Feature

## Overview
The forgot password feature allows users to reset their password by providing their email address. A password reset link will be sent to their email.

## Components

### ForgotPasswordForm
- **Location**: `apps/web/app/featured/password/components/ForgotPasswordForm/`
- **Purpose**: Handles the email input and form submission
- **Features**:
  - Email validation using Zod schema
  - Loading states during submission
  - Success state showing confirmation message
  - Error handling with toast notifications
  - Option to go back to login or try another email

### ForgotPasswordScreen
- **Location**: `apps/web/app/featured/password/screens/ForgotPasswordScreen/`
- **Purpose**: Layout wrapper for the forgot password form

## API Endpoints

### POST /api/auth/forgot-password
- **Purpose**: Processes forgot password requests
- **Request Body**: `{ email: string }`
- **Response**: Success message (same response regardless of whether email exists for security)
- **Schema**: Defined in `forgot-password.schema.ts`

## Usage

### Accessing the Page
Users can access the forgot password page in two ways:
1. Navigate directly to `/forgot-password`
2. Click "Forgot Password?" link on the login page

### Flow
1. User enters their email address
2. Form validates the email format
3. API request is sent to reset endpoint
4. User sees confirmation message
5. User can either:
   - Try another email address
   - Return to login page

## Implementation Notes

- The API currently returns a success message regardless of whether the email exists (security best practice)
- Email sending logic needs to be implemented in the API route
- The feature uses the existing password client and constants structure
- All components follow the established design system using shadcn/ui components

## Files Modified/Created

### New Files
- `/apps/web/app/(routes)/forgot-password/page.tsx`
- `/apps/web/app/(routes)/api/auth/forgot-password/route.ts`
- `/apps/web/app/(routes)/api/auth/forgot-password/forgot-password.schema.ts`
- `/apps/web/app/featured/password/components/ForgotPasswordForm/`
- `/apps/web/app/featured/password/screens/ForgotPasswordScreen/`

### Modified Files
- `/apps/web/app/featured/password/constants.ts` - Added forgot password endpoint
- `/apps/web/app/featured/password/clients/password.client.ts` - Added forgot password client method
- `/apps/web/app/featured/password/hooks/use-password.hooks.ts` - Added forgot password mutation hook

## Next Steps

To complete the forgot password implementation:

1. **Email Service Integration**: Implement actual email sending in the API route
2. **Database Integration**: Store reset tokens with expiration
3. **Reset Password Page**: Create a page to handle the reset token and allow users to set a new password
4. **Security Enhancements**: Add rate limiting and additional security measures