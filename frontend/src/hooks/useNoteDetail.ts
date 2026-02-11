import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { type Notes } from '../types/types';

export function useNoteDetail() {
  const { id } = useParams();
  const [note, setNote] = useState<Notes | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setNote(null);

    const fecthNote = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/notes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('could not fetch the note, try again');

        const data: Notes = await res.json();

        setNote(data);
      } catch (e) {
        console.error('error fetching the notes', e);
      } finally {
        setLoading(false);
      }
    };

    fecthNote();
  }, [id]);

  return { note, loading };
}
