import { useEffect, useState } from 'react';
import { type Notes } from '../types/types';

export default function useNotes(activeNotes: boolean) {
  const [notes, setNotes] = useState<Notes[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetcNotes = async () => {
      try {
        setLoading(true);
        const endpoint = activeNotes ? 'notes' : 'notes/archived';
        const res = await fetch(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('could not fetch the notes, try again');

        const notesData: Notes[] = await res.json();

        setNotes(notesData);
      } catch (e) {
        console.error('error fetching the notes', e);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetcNotes();
  }, [activeNotes]);

  return { notes, setNotes, loading };
}
