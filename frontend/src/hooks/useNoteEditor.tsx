import { useState, useEffect, useRef } from 'react';
import { type Notes, type Tag } from '../types/types';
import { useUpdateNote } from '../hooks/useUpdateNote';
import { useDeleteNote } from '../hooks/useDeleteNote';
import { useDebounce } from '../hooks/useDebounce';
import { useNavigate } from 'react-router-dom';

export default function useNoteEditor(initialData: Notes) {
  const [formData, setFormData] = useState<Notes>(initialData);
  const debouncedForm = useDebounce(formData, 1000);
  const { mutate: updateNoteAsync, isPending: isUpdating } = useUpdateNote();
  const { mutate: deleteNoteAsync } = useDeleteNote();
  const lastSavedData = useRef(initialData);
  const navigate = useNavigate();

  useEffect(() => {
    const isDirty =
      formData.title !== lastSavedData.current.title ||
      formData.content !== lastSavedData.current.content ||
      formData.tags.length !== lastSavedData.current.tags.length ||
      formData.tags.some(
        (tag, index) => tag.name !== lastSavedData.current.tags[index]?.name,
      );

    if (!isDirty) return;

    updateNoteAsync(
      {
        id: debouncedForm.id,
        title: debouncedForm.title,
        content: debouncedForm.content,
        tags: debouncedForm.tags
          .map((t) => t.name)
          .filter((name) => name.trim() !== ''),
      },
      {
        onSuccess: () => {
          lastSavedData.current = debouncedForm;
        },
      },
    );
  }, [debouncedForm, updateNoteAsync, formData]);

  const updateField = (field: keyof Notes, value: string | boolean | Tag[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDelete = () => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;

    deleteNoteAsync(initialData.id, {
      onSuccess: () => navigate('/myNotes'),
    });
  };

  const handleArchive = (isActive: boolean) => {
    setFormData((prev) => ({ ...prev, isActive: !isActive }));
    updateNoteAsync({ id: initialData.id, isActive: !isActive });
  };

  return { formData, updateField, isUpdating, handleDelete, handleArchive };
}
