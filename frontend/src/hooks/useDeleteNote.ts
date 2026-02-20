import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../services/note.service';

export function useDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),

    onError: (error) => {
      //TODO - Implemente a toast notification here
      console.error('Error deleting the note', error);
    },
  });
}
