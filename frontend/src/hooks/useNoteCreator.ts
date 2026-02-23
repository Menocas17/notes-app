import { useEffect, useState, useRef } from 'react';
import { useCreateNote } from '../hooks/useCreateNote';
import { useUpdateNote } from '../hooks/useUpdateNote';
import { useDebounce } from '../hooks/useDebounce';
import { type Notes } from '../types/types';

const EMPTY_NOTE: Notes = {
  authorId: '',
  id: '',
  title: '',
  content: '',
  tags: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  isActive: true,
};

export default function useNoteCreator() {
  const [formState, setFormState] = useState<Notes>(EMPTY_NOTE);
  const debouncedForm = useDebounce(formState, 1500);
  const { mutate: createNoteAsync, isPending: isCreating } = useCreateNote();
  const { mutate: updateNoteAsync, isPending: isUpdating } = useUpdateNote();

  const createdNoteId = useRef<string | null>(null);

  const isSaving = isCreating || isUpdating;

  useEffect(() => {
    if (!debouncedForm.title.trim()) {
      return;
    }

    const payload = {
      title: debouncedForm.title,
      content: debouncedForm.content,
      tags: debouncedForm.tags
        .map((t) => t.name)
        .filter((n) => n.trim() !== ''),
    };

    if (!createdNoteId.current) {
      createNoteAsync(payload, {
        onSuccess: (data) => {
          createdNoteId.current = data.id;
        },
      });
    } else {
      updateNoteAsync({ ...payload, id: createdNoteId.current });
    }
  }, [debouncedForm, createNoteAsync, updateNoteAsync]);

  return { formState, setFormState, isSaving };
}
