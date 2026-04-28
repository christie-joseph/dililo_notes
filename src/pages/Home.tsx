import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import NoteCard from '../components/NoteCard';

import image1 from '../assets/image_1.png';

const Home = () => {
  const { notes } = useAppContext();
  const navigate = useNavigate();



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
        <img src={image1} alt="Daily inspiration" />
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
          box-shadow: 0 12px 32px rgba(57, 56, 47, 0.08);
          flex-shrink: 0;
        }
        .image-hero img {
          width: 100%;
          height: auto;
          display: block;
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
