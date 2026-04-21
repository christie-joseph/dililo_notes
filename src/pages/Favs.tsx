import React from 'react';
import { useAppContext } from '../context/AppContext';
import NoteCard from '../components/NoteCard';

const Favs = () => {
  const { notes } = useAppContext();
  
  const favNotes = notes.filter(n => n.isFav);

  return (
    <div className="page-container compositional-content">
      <header style={{ marginTop: '2rem', marginBottom: '1rem' }}>
        <h1 className="display-lg" style={{ background: 'none', WebkitTextFillColor: 'initial', color: 'var(--on-surface)' }}>
          Your,<br />
          <span style={{ 
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--tertiary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Favorites
          </span>
        </h1>
        <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>
          A collection of your most cherished notes.
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {favNotes.map(n => (
          <NoteCard key={n.id} note={n} variant="favs" />
        ))}
        {favNotes.length === 0 && (
          <p className="body-md" style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--outline)' }}>
            No favorites yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Favs;
