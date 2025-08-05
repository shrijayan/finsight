"use client";

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const registrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

interface RegistrationFormProps 
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onError'> {
  onSuccess?: (message: string) => void;
  onError?: (error: string) => void;
}

const RegistrationForm = React.forwardRef<HTMLDivElement, RegistrationFormProps>(
  ({ className, onSuccess, onError, ...props }, ref) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [formError, setFormError] = React.useState<string | null>(null);
    const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm<RegistrationFormData>({
      resolver: zodResolver(registrationSchema),
    });

    const onSubmit = async (data: RegistrationFormData) => {
      try {
        setIsLoading(true);
        setFormError(null);
        setSuccessMessage(null);

        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Registration failed');
        }

        setSuccessMessage('Registration successful! Redirecting to login...');
        onSuccess?.(result.message);
        reset();

        // Redirect to login page after successful registration
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Registration failed';
        setFormError(errorMessage);
        onError?.(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div ref={ref} className={cn('grid gap-6', className)} {...props}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            {/* Name Field */}
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                type="text"
                autoCapitalize="words"
                autoComplete="name"
                autoCorrect="off"
                disabled={isLoading}
                {...register('name')}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-sm text-red-600" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email address"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                {...register('email')}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-red-600" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Create a password"
                type="password"
                autoComplete="new-password"
                disabled={isLoading}
                {...register('password')}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              {errors.password && (
                <p id="password-error" className="text-sm text-red-600" role="alert">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                placeholder="Confirm your password"
                type="password"
                autoComplete="new-password"
                disabled={isLoading}
                {...register('confirmPassword')}
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
              />
              {errors.confirmPassword && (
                <p id="confirm-password-error" className="text-sm text-red-600" role="alert">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Form-level error message */}
            {formError && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md" role="alert">
                {formError}
              </div>
            )}

            {/* Success message */}
            {successMessage && (
              <div className="text-sm text-green-600 bg-green-50 p-3 rounded-md" role="alert">
                {successMessage}
              </div>
            )}

            <Button disabled={isLoading} className="w-full" type="submit">
              {isLoading && (
                <svg
                  className="mr-2 h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </div>
        </form>
      </div>
    );
  }
);
RegistrationForm.displayName = 'RegistrationForm';

export { RegistrationForm };
