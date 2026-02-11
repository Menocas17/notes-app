import { useNoteDetail } from '../hooks/useNoteDetail';
import NoteEditor from '../components/NoteEditor';

export default function EditNote() {
  const { note, loading } = useNoteDetail();
  if (loading) return <span></span>;

  if (!note) return <h1>There is no note with this id, try again</h1>;

  return <NoteEditor initialData={note} key={note.id} />;
}
