import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import NoteCard from '../components/NoteCard';

const placeHolderImages = [
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1510137600163-2729bc6959a6?auto=format&fit=crop&q=80&w=600'
];

const Home = () => {
  const { notes } = useAppContext();
  const navigate = useNavigate();

  const randomImg = useMemo(() => {
    return placeHolderImages[Math.floor(Math.random() * placeHolderImages.length)];
  }, []);

  return (
    <div className="page-container compositional-content">
      <header className="home-header">
        <h1 className="display-lg" style={{ background: 'none', WebkitTextFillColor: 'initial', color: 'var(--on-surface)' }}>
          Hey,<br />
          <span style={{ 
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--tertiary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Newlyweds!
          </span>
        </h1>
        <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>
          Memories, curated just for you guys.
        </p>
      </header>

      <section className="image-hero">
        <img src={randomImg} alt="Daily inspiration" />
        <div className="image-overlay">
          <span className="label-sm" style={{ color: 'white' }}>Picture Frame Placeholder</span>
        </div>
      </section>

      <section className="favorites-preview" onClick={() => navigate('/favs')}>
        <div className="fav-banner">
          <div>
            <h2 className="title-md" style={{ color: 'var(--on-primary)' }}>Favorites</h2>
            <span className="label-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>View your cherished notes</span>
          </div>
          <ChevronRight color="white" />
        </div>
      </section>

      <section className="recent-notes">
        <div style={{ marginBottom: '1rem' }}>
          <h2 className="title-md">Recent Additions</h2>
        </div>
        <div className="notes-list horizontal-scroll">
          {notes.slice(0, 3).map(n => (
             <div key={n.id} className="scroll-item">
               <NoteCard note={n} />
             </div>
          ))}
          {notes.length === 0 && <p className="body-md">No notes found.</p>}
        </div>
      </section>

      <style>{`
        .home-header {
          margin-bottom: 0.5rem;
          margin-top: 2rem;
        }
        .image-hero {
          position: relative;
          border-radius: var(--radius-xl);
          overflow: hidden;
          height: 33vh;
          box-shadow: 0 12px 32px rgba(57, 56, 47, 0.08);
          flex-shrink: 0;
        }
        .image-hero img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .image-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.5rem;
          background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
        }
        .favorites-preview {
          cursor: pointer;
        }
        .fav-banner {
          background: linear-gradient(135deg, var(--secondary) 0%, #10445e 100%);
          border-radius: var(--radius-xl);
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 8px 24px rgba(61, 105, 133, 0.2);
        }
        .notes-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .notes-list.horizontal-scroll {
          flex-direction: row;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding-bottom: 0.5rem;
          -webkit-overflow-scrolling: touch;
          margin-left: -12px;
          margin-right: -24px;
          padding-left: 12px;
          padding-right: 24px;
        }
        .notes-list.horizontal-scroll::-webkit-scrollbar {
          display: none;
        }
        .scroll-item {
          flex: 0 0 85%;
          scroll-snap-align: center;
        }
      `}</style>
    </div>
  );
};

export default Home;
