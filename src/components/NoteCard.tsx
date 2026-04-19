import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import type { Note } from '../context/AppContext';

interface NoteCardProps {
  note: Note;
  variant?: 'home' | 'favs' | 'search';
}

const NoteCard: React.FC<NoteCardProps> = ({ note, variant = 'home' }) => {
  const { toggleFav } = useAppContext();
  
  const isHome = variant === 'home';
  const isFavs = variant === 'favs';
  const isSearch = variant === 'search';

  const [isExpanded, setIsExpanded] = useState(isHome);

  const formattedDate = new Date(note.createdAt).toLocaleDateString(undefined, { 
    month: 'short', day: 'numeric' 
  });

  const toggleCollapse = () => {
    if (!isHome) {
      setIsExpanded(!isExpanded);
    }
  };

  const words = note.text.split(' ');
  const isTruncated = words.length > 8;
  const previewText = words.slice(0, 8).join(' ') + (isTruncated ? '...' : '');

  return (
    <div 
      className="note-card" 
      onClick={toggleCollapse} 
      style={{ cursor: isHome ? 'default' : 'pointer' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 className={isHome || isExpanded ? "title-md" : "title-sm"}>{note.author}</h2>
          <span className="label-sm">{isHome || isExpanded ? `To: ${note.toPerson} • ` : ''}{formattedDate}</span>
        </div>
        <button 
          style={{ padding: '8px', minWidth: 'unset', minHeight: 'unset', borderRadius: '50%', background: 'transparent' }} 
          onClick={(e) => {
            e.stopPropagation();
            toggleFav(note.id);
          }}
        >
          <Heart size={24} fill={note.isFav ? 'var(--error)' : 'none'} color={note.isFav ? 'var(--error)' : 'var(--outline)'} />
        </button>
      </div>

      {!isExpanded && isFavs && (
        <p className="body-md preview-content" style={{ fontStyle: 'italic', fontSize: '0.875rem', color: 'var(--on-surface-variant)', marginTop: '0.25rem' }}>
          To my dearest {note.toPerson}
        </p>
      )}

      {!isExpanded && isSearch && (
        <p className="body-md preview-content" style={{ fontSize: '0.875rem', color: 'var(--on-surface-variant)', marginTop: '0.25rem' }}>
          {previewText} {isTruncated && <span style={{ color: 'var(--primary)', fontWeight: 600 }}>read more</span>}
        </p>
      )}

      <div className={`note-body-wrapper ${isExpanded ? 'expanded' : ''}`}>
        <div className="note-body-inner">
           <p className="body-md note-text" style={{ marginTop: '1rem' }}>{note.text}</p>
        </div>
      </div>

      <style>{`
        .note-body-wrapper {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .note-body-wrapper.expanded {
          grid-template-rows: 1fr;
        }
        .note-body-inner {
          overflow: hidden;
        }
        .note-text {
          opacity: 0;
          transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .note-body-wrapper.expanded .note-text {
          opacity: 1;
        }
        .preview-content {
          animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default NoteCard;
