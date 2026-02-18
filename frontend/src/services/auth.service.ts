import { type User } from '../context/AuthContext';
import api from '../lib/axios';

export async function fetchMe(): Promise<User | null> {
  try {
    const { data } = await api.get<User>('/users/me');
    return data;
  } catch (error) {
    console.error('Auth request failed', error);
    localStorage.removeItem('token');
    return null;
  }
}
