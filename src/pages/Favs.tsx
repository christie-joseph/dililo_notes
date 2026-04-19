import React from 'react';
import { useAppContext } from '../context/AppContext';
import NoteCard from '../components/NoteCard';

const Favs = () => {
  const { notes } = useAppContext();
  
  const favNotes = notes.filter(n => n.isFav);

  return (
    <div className="page-container compositional-content">
      <header style={{ marginTop: '2rem', marginBottom: '1rem' }}>
        <h1 className="display-lg" style={{ color: 'var(--tertiary)' }}>Your Favorites & Search</h1>
        <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>
          Your cherished memories.
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
