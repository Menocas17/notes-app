import { useParams } from 'react-router-dom';

import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchNotedById } from '../services/note.service';

export function useNoteDetail() {
  const { id } = useParams();

  const { data: note } = useSuspenseQuery({
    queryKey: ['noteDetail', id],
    queryFn: () => fetchNotedById(id),
    staleTime: 1000 * 60 * 5,
  });

  return { note };
}
