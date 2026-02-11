import { useState, useEffect, useRef } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import Note from '../components/Note';
import { type Notes } from '../types/types';
import { Link } from 'react-router-dom';

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

export default function CreateNote() {
  const [formState, setFormState] = useState<Notes>(EMPTY_NOTE);
  const debouncedForm = useDebounce(formState, 1500);
  const [localLoading, setLocalLoading] = useState<boolean>(false);

  const createdNoteId = useRef<string | null>(null);

  useEffect(() => {
    if (!debouncedForm.title.trim()) {
      return;
    }

    const saveNote = async () => {
      setLocalLoading(true);
      const token = localStorage.getItem('token');
      const isFirstSave = !createdNoteId.current;

      const url = isFirstSave
        ? `${import.meta.env.VITE_API_URL}/notes`
        : `${import.meta.env.VITE_API_URL}/notes/${createdNoteId.current}`;

      const method = isFirstSave ? 'POST' : 'PATCH';

      try {
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: debouncedForm.title,
            content: debouncedForm.content,
            tags: debouncedForm.tags
              .map((t) => t.name)
              .filter((n) => n.trim() !== ''),
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (isFirstSave) {
            createdNoteId.current = data.id;
          }
        }
      } catch (err) {
        console.error('Error al guardar nota nueva:', err);
      } finally {
        setLocalLoading(false);
      }
    };

    saveNote();
  }, [debouncedForm]);

  return (
    <section className='mb-5 mt-8'>
      <div className='mb-10 flex justify-between border-b pb-4'>
        <div className='flex gap-20 items-center flex-1'>
          <Link
            className='font-bold text-2xl hover:text-yellow-600 dark:hover:text-primary'
            to={'/myNotes'}
          >
            ←
          </Link>
          <div className='flex items-center gap-2'>
            <h2 className='text-2xl font-bold leading-7'>New Note</h2>
            <span className='text-gray-400 text-xs'>
              {localLoading
                ? '⚠️ Saving'
                : debouncedForm.title || debouncedForm.content
                  ? '✅ Saved'
                  : 'Draft'}
            </span>
          </div>
        </div>
      </div>

      <Note
        note={formState}
        disable={false}
        onChangeTitle={(t) => setFormState((prev) => ({ ...prev, title: t }))}
        onChangeContent={(c) =>
          setFormState((prev) => ({ ...prev, content: c }))
        }
        onUpdateTags={(tags) => setFormState((prev) => ({ ...prev, tags }))}
      />
    </section>
  );
}
