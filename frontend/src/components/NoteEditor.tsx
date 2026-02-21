import Note from './Note';
import { type Notes } from '../types/types';
import { Link } from 'react-router-dom';
import useNoteEditor from '../hooks/useNoteEditor';

export default function NoteEditor({ initialData }: { initialData: Notes }) {
  const { formData, updateField, isUpdating, handleArchive, handleDelete } =
    useNoteEditor(initialData);

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
            onClick={() => handleArchive(formData.isActive)}
          >
            {formData.isActive ? 'Archive' : 'Unarchive'}
          </button>
        </div>
      </div>

      <Note
        note={formData}
        disable={false}
        onChangeTitle={(t) => updateField('title', t)}
        onChangeContent={(c) => updateField('content', c)}
        onUpdateTags={(tags) => updateField('tags', tags)}
      />
    </section>
  );
}
