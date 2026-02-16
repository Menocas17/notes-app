import { useState, use, useMemo, type ReactNode } from 'react';
import { AuthContext, type User } from './AuthContext';
import { fetchMe } from '../services/auth.service';

// Helper to check session on initial load
async function checkInitialSession(): Promise<User | null> {
  const token = localStorage.getItem('token');
  if (!token) return null;
  return fetchMe(token);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userPromise] = useState(() => checkInitialSession());
  const initialUser = use(userPromise);

  const [user, setUser] = useState<User | null>(initialUser);

  async function login(token: string) {
    localStorage.setItem('token', token);
    const userData = await fetchMe(token);
    if (userData) {
      setUser(userData);
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
