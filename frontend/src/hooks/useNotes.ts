import { useSuspenseQuery } from '@tanstack/react-query';
import api from '../lib/axios';
import { type Notes } from '../types/types';

export default function useNotes(activeNotes: boolean) {
  const queryKey = ['notes', { type: activeNotes ? 'active' : 'archived' }];
  const endpoint = activeNotes ? '/notes' : '/notes/archived';

  const { data: notes = [] } = useSuspenseQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await api.get<Notes[]>(endpoint);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

  return { notes };
}
