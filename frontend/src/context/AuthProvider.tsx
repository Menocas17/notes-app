import React, { useState, useEffect } from 'react';
import { AuthContext, type User } from './AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState<boolean>(() => {
    const token = localStorage.getItem('token');
    return !!token;
  });

  useEffect(() => {
    const checkUserSession = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const userData: User = await res.json();
          setUser(userData);
        } else {
          localStorage.removeItem('token');
          setUser(null);
        }
      } catch (error) {
        console.error(error);
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUserSession();
  }, []);

  async function login(token: string) {
    localStorage.setItem('token', token);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const userData: User = await res.json();
        setUser(userData);
      }
    } catch (e) {
      console.error(e);
      localStorage.removeItem('token');
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading ? children : <LoadingSpinner />}
    </AuthContext.Provider>
  );
}
