import Note from '../components/Note';
import { Link } from 'react-router-dom';
import useNotes from '../hooks/useNotes';
import NoteSkeleton from '../components/NoteSkeleton';

export default function ArchivedNotes() {
  const { notes, loading } = useNotes(false);

  return (
    <section className='grid grid-cols-[repeat(auto-fit,minmax(200px,300px))] gap-6 justify-center mt-6'>
      {loading
        ? Array.from({ length: 3 }).map((_, index) => (
            <NoteSkeleton key={index} edit={false} />
          ))
        : notes.map((note) => (
            <Link
              to={`/myNotes/${note.id}`}
              key={note.id}
              className='block h-full w-full'
            >
              <Note note={note} disable={true} />
            </Link>
          ))}
    </section>
  );
}
