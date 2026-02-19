import { useCallback, useMemo, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { fetchMe } from '../services/auth.service';
import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const token = localStorage.getItem('token');

  const { data: user } = useSuspenseQuery({
    queryKey: ['session'],
    queryFn: async () => {
      if (!token) return null;
      return await fetchMe();
    },

    staleTime: Infinity,
  });

  const login = useCallback(
    async (newToken: string) => {
      localStorage.setItem('token', newToken);
      try {
        const userData = await fetchMe();
        if (userData) {
          queryClient.setQueryData(['session'], userData);
        }
      } catch (error) {
        console.error('Login fallido', error);
        localStorage.removeItem('token');
      }
    },
    [queryClient],
  );

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    queryClient.setQueryData(['session'], null);
    queryClient.removeQueries();
  }, [queryClient]);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
