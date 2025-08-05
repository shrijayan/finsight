"use client";

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps 
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onError'> {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const LoginForm = React.forwardRef<HTMLDivElement, LoginFormProps>(
  ({ className, onSuccess, onError, ...props }, ref) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [formError, setFormError] = React.useState<string | null>(null);
    const router = useRouter();

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<LoginFormData>({
      resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
      try {
        setIsLoading(true);
        setFormError(null);

        const result = await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        if (result?.error) {
          const errorMessage = result.error === 'CredentialsSignin' 
            ? 'Invalid email or password. Please try again.'
            : result.error;
          setFormError(errorMessage);
          onError?.(errorMessage);
        } else {
          onSuccess?.();
          router.push('/');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Login failed';
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
                placeholder="Enter your password"
                type="password"
                autoComplete="current-password"
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

            {/* Form-level error message */}
            {formError && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md" role="alert">
                {formError}
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
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </div>
        </form>
      </div>
    );
  }
);
LoginForm.displayName = 'LoginForm';

export { LoginForm };
