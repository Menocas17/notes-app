import Note from '../components/Note';
import useNoteCreator from '../hooks/useNoteCreator';
import { Link } from 'react-router-dom';

export default function CreateNote() {
  const { formState, setFormState, isSaving } = useNoteCreator();

  return (
    <section className='mb-5 mt-8 md:max-w-3/5 m-auto'>
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
              {isSaving ? '⚠️ Saving' : '✅ Saved'}
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
