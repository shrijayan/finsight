'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { User } from 'lib/src/types';

export function useAuth() {
  const { data: session, status } = useSession();
  const { user, isLoading, setUser, setLoading, clearAuth } = useAuthStore();

  useEffect(() => {
    if (status === 'loading') {
      setLoading(true);
    } else if (status === 'authenticated' && session?.user) {
      const userData: User = {
        _id: session.user.id,
        name: session.user.name || '',
        email: session.user.email || '',
        createdAt: new Date(), // This will be properly set from backend in real scenarios
        updatedAt: new Date(), // This will be properly set from backend in real scenarios
      };
      setUser(userData);
    } else if (status === 'unauthenticated') {
      clearAuth();
    }
  }, [session, status, setUser, setLoading, clearAuth]);

  return {
    user,
    isLoading: status === 'loading' || isLoading,
    isAuthenticated: !!session && !!user,
    session,
  };
}
