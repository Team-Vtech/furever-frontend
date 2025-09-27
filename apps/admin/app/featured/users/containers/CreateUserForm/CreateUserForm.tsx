'use client';

import { TextInput } from '@/app/shared/components/TextInput/TextInput';
import { PasswordInput } from '@/app/shared/components/PasswordInput/PasswordInput';
import { Button } from '@furever/ui/components/button';
import { Label } from '@furever/ui/components/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@furever/ui/components/select';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '../../types';

import { USER_STATUS_OPTIONS } from '../../constant';
import {
  UserFormValues,
  userSchema,
} from '@/app/(routes)/api/users/users.schema';

interface CreateUserFormProps {
  user?: User;
  onSubmit: (data: UserFormValues) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function CreateUserForm({
  user,
  onSubmit,
  onCancel,
  isLoading,
}: CreateUserFormProps) {
  const formMethods = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      phone: user?.phone || '',
      address: user?.address || '',
      profile_image_id: user?.profile_image_id || undefined,
      status: user?.status || 'active',
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = formMethods;

  const watchedStatus = watch('status');

  const handleFormSubmit = (data: UserFormValues) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6"
    >
      <div className="space-y-4">
        <div>
          <Label
            htmlFor="name"
            className="text-sm font-medium text-gray-700"
          >
            Full Name *
          </Label>
          <TextInput
            name="name"
            control={control}
            placeholder="Enter full name"
            className="mt-1"
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label
            htmlFor="email"
            className="text-sm font-medium text-gray-700"
          >
            Email Address *
          </Label>
          <TextInput
            name="email"
            type="email"
            control={control}
            placeholder="Enter email address"
            className="mt-1"
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password {!user && '*'}
          </Label>
          <PasswordInput
            id="password"
            name="password"
            control={control}
            placeholder={
              user ? 'Leave empty to keep current password' : 'Enter password'
            }
            className="mt-1"
          />
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <Label
            htmlFor="phone"
            className="text-sm font-medium text-gray-700"
          >
            Phone Number
          </Label>
          <TextInput
            name="phone"
            control={control}
            placeholder="Enter phone number"
            className="mt-1"
          />
          {errors.phone && (
            <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <Label
            htmlFor="address"
            className="text-sm font-medium text-gray-700"
          >
            Address
          </Label>
          <TextInput
            name="address"
            control={control}
            placeholder="Enter address"
            className="mt-1"
          />
          {errors.address && (
            <p className="text-sm text-red-600 mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <div>
          <Label
            htmlFor="status"
            className="text-sm font-medium text-gray-700"
          >
            Status *
          </Label>
          <Select
            value={watchedStatus}
            onValueChange={(value) =>
              setValue('status', value as 'active' | 'inactive')
            }
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {USER_STATUS_OPTIONS.map(
                (option: { value: string; label: string }) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
          {errors.status && (
            <p className="text-sm text-red-600 mt-1">{errors.status.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : user ? 'Update User' : 'Create User'}
        </Button>
      </div>
    </form>
  );
}
