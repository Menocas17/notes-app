import { type User } from '../context/AuthContext';

export async function fetchMe(token: string): Promise<User | null> {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      localStorage.removeItem('token');
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error('Auth request failed:', error);
    localStorage.removeItem('token');
    return null;
  }
}
