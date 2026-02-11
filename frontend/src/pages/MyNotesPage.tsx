import Note from '../components/Note';
import { Link } from 'react-router-dom';
import useNotes from '../hooks/useNotes';
import NoteSkeleton from '../components/NoteSkeleton';
import { useState, useMemo } from 'react';

export default function MyNotes() {
  const { notes, loading } = useNotes(true);
  const [filters, setFilters] = useState({
    tag: '',
  });

  const allUniqueTags = useMemo(() => {
    const tags = notes.flatMap((note) =>
      note.tags.map((t) => t.name.toLowerCase()),
    );
    return Array.from(new Set(tags));
  }, [notes]);

  const filteredNotes = notes.filter((note) => {
    const matchesTag =
      filters.tag === '' ||
      note.tags.some((t) => t.name.toLowerCase() === filters.tag.toLowerCase());

    return matchesTag;
  });

  if (loading) {
    return (
      <section className='grid grid-cols-[repeat(auto-fit,minmax(200px,300px))] gap-6 justify-center mt-6'>
        {Array.from({ length: 6 }).map((_, index) => (
          <NoteSkeleton key={index} edit={false} />
        ))}
      </section>
    );
  }

  if (notes.length === 0) {
    return (
      <div className='text-center mt-20'>
        <h1 className='text-xl font-bold mb-4'>
          Ops, looks like you are new here or you do not have any notes yet!!
        </h1>
        <Link
          to={'/createNote'}
          className='bg-primary text-black px-4 py-2 rounded-lg font-medium'
        >
          Create new note
        </Link>
      </div>
    );
  }

  return (
    <section className='mt-1'>
      <div className='flex justify-center mb-5'>
        <select
          value={filters.tag}
          onChange={(e) => setFilters({ tag: e.target.value })}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 dark:bg-[#1a1a1a] dark:border-primary dark:placeholder-gray-400 dark:text-white outline-none'
        >
          <option value=''>All Tags</option>
          {allUniqueTags.map((tagName) => (
            <option key={tagName} value={tagName}>
              #{tagName}
            </option>
          ))}
        </select>
      </div>

      <section className='grid grid-cols-[repeat(auto-fit,minmax(200px,300px))] gap-6 justify-center'>
        {filteredNotes.map((note) => (
          <Link
            to={`/myNotes/${note.id}`}
            key={note.id}
            className='block h-full w-full'
          >
            <Note note={note} disable={true} />
          </Link>
        ))}
      </section>
    </section>
  );
}
