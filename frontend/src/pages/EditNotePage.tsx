import { useNoteDetail } from '../hooks/useNoteDetail';
import NoteEditor from '../components/NoteEditor';

export default function EditNote() {
  const { note } = useNoteDetail();

  return <NoteEditor initialData={note} key={note.id} />;
}
