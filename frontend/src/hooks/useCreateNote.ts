import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type CreateNotePayload, createNote } from '../services/note.service';

export function useCreateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateNotePayload) => createNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (error) => {
      console.error('error creating note', error);
    },
  });
}
