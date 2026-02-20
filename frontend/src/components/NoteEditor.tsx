import { useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useEffect, useRef } from 'react';
import Note from './Note';
import { type Notes } from '../types/types';
import { Link, useNavigate } from 'react-router-dom';
import { useUpdateNote } from '../hooks/useUpdateNote';
import { useDeleteNote } from '../hooks/useDeleteNote';

export default function NoteEditor({ initialData }: { initialData: Notes }) {
  const [formState, setFormState] = useState(initialData);
  const debouncedForm = useDebounce(formState, 1500);
  const { mutate: updateNoteAsync, isPending: isUpdating } = useUpdateNote();
  const { mutate: deleteNoteAsync } = useDeleteNote();
  const navigate = useNavigate();

  const lastSavedData = useRef(initialData);

  useEffect(() => {
    const tagsChanged =
      JSON.stringify(debouncedForm.tags) !==
      JSON.stringify(lastSavedData.current.tags);
    const titleChanged = debouncedForm.title !== lastSavedData.current.title;
    const contentChanged =
      debouncedForm.content !== lastSavedData.current.content;

    if (!tagsChanged && !titleChanged && !contentChanged) {
      return;
    }

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
  }, [debouncedForm, updateNoteAsync]);

  const handleDelete = () => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;

    deleteNoteAsync(initialData.id, {
      onSuccess: () => navigate('/myNotes'),
    });
  };

  const handleArchive = (isActive: boolean) => {
    setFormState((prev) => ({ ...prev, isActive: !isActive }));
    updateNoteAsync({ id: initialData.id, isActive: !isActive });
  };

  return (
    <section className='mb-5 mt-8 md:max-w-3/5 m-auto'>
      <div className='mb-10 flex justify-between border-b pb-4'>
        <div className='flex gap-4 md:gap-20 items-center flex-1'>
          <Link className='font-bold text-2xl  cursor-pointer' to={'/myNotes'}>
            ←
          </Link>
          <div className='flex items-center gap-2'>
            <h2 className='text-2xl font-bold leading-7'>Editing </h2>
            <span className='text-gray-400 text-xs'>
              {isUpdating ? '⚠️ Saving' : '✅ Saved'}
            </span>
          </div>
        </div>

        <div className='flex gap-4'>
          <button
            className='font-bold  bg-red-900 text-white dark:text-[#e3e3e3] dark:border dark:border-red-900 dark:bg-[#242424] dark:hover:bg-red-900 dark:hover:text-white py-1 px-3 rounded-lg'
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className='font-bold  bg-primary hover:bg-yellow-500 text-black dark:text-[#e3e3e3] dark:border dark:border-primary dark:bg-[#242424] dark:hover:bg-primary dark:hover:text-black py-1 px-3 rounded-lg'
            onClick={() => handleArchive(formState.isActive)}
          >
            {formState.isActive ? 'Archive' : 'Unarchive'}
          </button>
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
