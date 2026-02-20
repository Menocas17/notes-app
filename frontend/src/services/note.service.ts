import api from '../lib/axios';
import { type Notes } from '../types/types';

export interface UpdateNotePayload {
  id: string;
  title?: string;
  content?: string | null;
  tags?: string[];
  isActive?: boolean;
}

export const fetchNotedById = async (id: string | undefined) => {
  if (!id) throw new Error('The id is not valid');
  const { data } = await api.get<Notes>(`notes/${id}`);
  return data;
};

export const updateNote = async ({ id, ...data }: UpdateNotePayload) => {
  const response = await api.patch(`/notes/${id}`, data);
  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
};
