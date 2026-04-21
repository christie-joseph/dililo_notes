import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import NoteCard from '../components/NoteCard';

const Search = () => {
  const { notes } = useAppContext();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGroup, setFilterGroup] = useState('All');
  const [filterTo, setFilterTo] = useState('All');

  const filteredNotes = notes.filter(n => {
    const matchSearch = n.text.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        n.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchGroup = filterGroup === 'All' || n.fromGroup === filterGroup;
    const matchTo = filterTo === 'All' || n.toPerson === filterTo;
    return matchSearch && matchGroup && matchTo;
  });

  return (
    <div className="page-container compositional-content">
      <header style={{ marginTop: '2rem' }}>
        <h1 className="display-lg" style={{ background: 'none', WebkitTextFillColor: 'initial', color: 'var(--on-surface)' }}>
          Notes,<br />
          <span style={{ 
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--tertiary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Archive
          </span>
        </h1>
        <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>
          Explore every memory shared with you.
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
        <div className="input-well">
          <input 
            type="text" 
            placeholder="Search notes or authors..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="input-well" style={{ flex: 1 }}>
            <label>Group</label>
            <select value={filterGroup} onChange={e => setFilterGroup(e.target.value)}>
              <option value="All">All Groups</option>
              <option value="Family">Family</option>
              <option value="Friend">Friend</option>
              <option value="Colleagues">Colleagues</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="input-well" style={{ flex: 1 }}>
            <label>Target</label>
            <select value={filterTo} onChange={e => setFilterTo(e.target.value)}>
              <option value="All">All People</option>
              <option value="Divi">Divi</option>
              <option value="Liya">Liya</option>
              <option value="Milo 🐱">Milo 🐱</option>
            </select>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredNotes.map(n => (
          <NoteCard key={n.id} note={n} variant="search" />
        ))}
        {filteredNotes.length === 0 && (
          <p className="body-md" style={{ color: 'var(--outline)' }}>No notes found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
