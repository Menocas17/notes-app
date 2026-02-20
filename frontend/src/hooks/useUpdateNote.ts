import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type UpdateNotePayload, updateNote } from '../services/note.service';

export function useUpdateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateNotePayload) => updateNote(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.invalidateQueries({ queryKey: ['noteDetail', variables.id] });
    },
    onError: (error) => {
      //TODO - Implemente a toast notification here
      console.error('Error updating note', error);
    },
  });
}
