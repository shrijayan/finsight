'use client';

import * as React from 'react';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LogoutButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  onLogoutSuccess?: () => void;
  onLogoutError?: (error: string) => void;
}

const LogoutButton = React.forwardRef<HTMLButtonElement, LogoutButtonProps>(
  ({ 
    className, 
    variant = 'outline',
    size = 'default',
    onLogoutSuccess,
    onLogoutError,
    children,
    ...props 
  }, ref) => {
    const [isLoading, setIsLoading] = React.useState(false);

    const handleLogout = async () => {
      try {
        setIsLoading(true);
        
        await signOut({
          redirect: true,
          callbackUrl: '/'
        });

        onLogoutSuccess?.();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Logout failed';
        onLogoutError?.(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(className)}
        onClick={handleLogout}
        disabled={isLoading}
        {...props}
      >
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
        {children || (isLoading ? 'Signing Out...' : 'Sign Out')}
      </Button>
    );
  }
);
LogoutButton.displayName = 'LogoutButton';

export { LogoutButton };
