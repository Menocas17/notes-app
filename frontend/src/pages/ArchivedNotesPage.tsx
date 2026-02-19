import Note from '../components/Note';
import { Link } from 'react-router-dom';
import useNotes from '../hooks/useNotes';

export default function ArchivedNotes() {
  const { notes } = useNotes(false);

  if (notes.length === 0) {
    return (
      <div className='text-center mt-20'>
        <h1 className='text-xl font-bold mb-4'>
          Looks like you do not have any archived notes yet!!
        </h1>
      </div>
    );
  }

  return (
    <section className='grid grid-cols-[repeat(auto-fit,minmax(200px,300px))] gap-6 justify-center mt-6'>
      {notes.map((note) => (
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
