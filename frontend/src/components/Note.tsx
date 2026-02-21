import { type Notes } from '../types/types';
import TextareaAutosize from 'react-textarea-autosize';
import { useRef, useEffect } from 'react';

interface NoteProps {
  note: Notes;
  disable: boolean;
  onChangeTitle?: (newTitle: string) => void;
  onChangeContent?: (newContent: string) => void;
  onUpdateTags?: (newTags: Notes['tags']) => void;
}

export default function Note({
  note,
  disable,
  onChangeTitle,
  onChangeContent,
  onUpdateTags,
}: NoteProps) {
  const lastTagRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disable && note.tags.length > 0) {
      const lastTag = note.tags[note.tags.length - 1];
      if (lastTag.name === '') {
        lastTagRef.current?.focus();
      }
    }
  }, [note.tags.length, disable, note.tags]);

  const handleAddTag = () => {
    const newTag = { id: crypto.randomUUID(), name: '' };
    onUpdateTags?.([...note.tags, newTag]);
  };

  const handleTagChange = (id: string, newName: string) => {
    const updatedTags = note.tags.map((tag) =>
      tag.id === id ? { ...tag, name: newName } : tag,
    );

    onUpdateTags?.(updatedTags);
  };

  const handleTagBlur = (id: string, name: string) => {
    if (name.trim() === '') {
      const filteredTags = note.tags.filter((tag) => tag.id !== id);
      onUpdateTags?.(filteredTags);
    }
  };

  return (
    <article
      className={`max-w-2xl mx-auto p-6 bg-gray-100 dark:bg-transparent rounded-lg shadow-sm border border-gray-200 dark:border-[0.5px] dark:border-primary ${disable ? 'h-70' : 'h-fit'} overflow-hidden`}
    >
      {disable ? (
        <p
          className={`w-full text-xl font-bold text-gray-800 dark:text-white border-b dark:border-b-primary pb-3 outline-none focus:ring-0 bg-transparent mb-4 truncate`}
        >
          {note.title}
        </p>
      ) : (
        <input
          value={note.title}
          onChange={(e) => onChangeTitle?.(e.target.value)}
          className={`w-full text-xl font-bold text-gray-800 dark:text-white border-b dark:border-b-primary pb-4 outline-none focus:ring-0 bg-transparent mb-4`}
          placeholder='Título sin nombre'
        />
      )}

      <div className='flex flex-wrap items-center gap-3 mb-4 text-xs text-gray-600 dark:text-gray-200'>
        <time>
          {new Date(note.updatedAt || note.createdAt).toLocaleDateString(
            'es-ES',
            {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            },
          )}
        </time>
        <div className='flex flex-wrap gap-1 items-center'>
          {note.tags.map((tag, index) =>
            disable ? (
              <span
                key={tag.id}
                className='bg-yellow-100 dark:bg-yellow-200 text-yellow-700 dark:text-black px-2 py-0.5 rounded-full max-w-20 truncate'
              >
                #{tag.name}
              </span>
            ) : (
              <div
                key={tag.id}
                className='flex items-center bg-yellow-100 dark:bg-yellow-200 px-2 py-0.5 rounded-full '
              >
                <span className='text-yellow-700 dark:text-black'>#</span>
                <input
                  ref={index === note.tags.length - 1 ? lastTagRef : null}
                  value={tag.name}
                  onChange={(e) => handleTagChange(tag.id, e.target.value)}
                  className='bg-transparent outline-none text-yellow-700 dark:text-black max-w-16 focus:w-24 transition-all truncate'
                  placeholder='tag...'
                  onBlur={() => handleTagBlur(tag.id, tag.name)}
                />
              </div>
            ),
          )}

          {!disable && (
            <button
              onClick={handleAddTag}
              type='button'
              className='text-xl hover:scale-125 transition-transform ml-1'
            >
              +
            </button>
          )}
        </div>
      </div>
      {disable ? (
        <p className='w-full text-gray-700 dark:text-white leading-relaxed line-clamp-4 whitespace-pre-wrap'>
          {note.content}
        </p>
      ) : (
        <TextareaAutosize
          value={note.content ?? ''}
          onChange={(e) => onChangeContent?.(e.target.value)}
          className='w-full min-h-50  text-gray-700 dark:text-white leading-relaxed border-none outline-none focus:ring-0 bg-transparent resize-none overflow-hidden'
          placeholder='Start writing...'
        />
      )}
    </article>
  );
}
