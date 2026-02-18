import { useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useEffect, useRef } from 'react';
import Note from './Note';
import { type Notes } from '../types/types';
import { Link, useNavigate } from 'react-router-dom';
import { useNoteDetail } from '../hooks/useNoteDetail';
import NoteSkeleton from './NoteSkeleton';

export default function NoteEditor({ initialData }: { initialData: Notes }) {
  const [formState, setFormState] = useState(initialData);
  const debouncedForm = useDebounce(formState, 1500);
  const [localLoading, setLocalLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { loading } = useNoteDetail();

  const lastSavedData = useRef(initialData);

  useEffect(() => {
    setFormState(initialData);
    lastSavedData.current = initialData;
  }, [initialData.id, initialData]);

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
    const editNote = async () => {
      setLocalLoading(true);
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/notes/${debouncedForm.id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              title: debouncedForm.title,
              content: debouncedForm.content,
              tags: debouncedForm.tags
                .map((t) => t.name)
                .filter((name) => name.trim() !== ''),
            }),
          },
        );

        if (response.ok) {
          lastSavedData.current = debouncedForm;
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLocalLoading(false);
      }
    };

    editNote();
  }, [debouncedForm]);

  const handleDelete = async () => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta nota?'))
      return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/notes/${initialData.id}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.ok) {
        navigate('/myNotes');
      }
    } catch (err) {
      console.error('Error al borrar:', err);
    }
  };

  const handleArchive = async (isActive: boolean) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/notes/${initialData.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ isActive: !isActive }),
        },
      );

      if (response.ok) {
        navigate('/myNotes');
      }
    } catch (err) {
      console.error('Error al archivar:', err);
    }
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
              {localLoading ? '⚠️ Saving' : '✅ Saved'}
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
      {loading ? (
        <NoteSkeleton edit={true} />
      ) : (
        <Note
          note={formState}
          disable={false}
          onChangeTitle={(t) => setFormState((prev) => ({ ...prev, title: t }))}
          onChangeContent={(c) =>
            setFormState((prev) => ({ ...prev, content: c }))
          }
          onUpdateTags={(tags) => setFormState((prev) => ({ ...prev, tags }))}
        />
      )}
    </section>
  );
}
