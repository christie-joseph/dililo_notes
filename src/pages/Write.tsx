import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import DynamicBackground from '../components/DynamicBackground';

const Write = () => {
  const { addNote } = useAppContext();
  const navigate = useNavigate();

  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [fromGroup, setFromGroup] = useState('Family');
  const [toPerson, setToPerson] = useState('Divi');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !text) return;
    
    addNote({ author, text, fromGroup, toPerson });
    // Default users go to Thank You page
    navigate('/thank-you');
  };

  return (
    <>
      <DynamicBackground person={toPerson} />
      <div className="page-container compositional-content" style={{ zIndex: 10, position: 'relative' }}>
        <header style={{ marginTop: '2rem' }}>
          <h1 className="display-lg" style={{ background: 'none', WebkitTextFillColor: 'initial', color: 'var(--on-surface)' }}>
            Write a<br />
            <span style={{ 
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--tertiary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Note
            </span>
          </h1>
          <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>
            We're so glad you're here to share a thought.
          </p>
        </header>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'rgba(255, 251, 255, 0.4)', padding: '1rem', borderRadius: 'var(--radius-xl)', backdropFilter: 'blur(10px)' }}>
          <div className="input-well">
            <label>Your Name</label>
            <input 
              type="text" 
              placeholder="e.g. Aunt May" 
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="input-well" style={{ flex: 1 }}>
              <label>Group</label>
              <select value={fromGroup} onChange={e => setFromGroup(e.target.value)}>
                <option value="Family">Family</option>
                <option value="Friend">Friend</option>
                <option value="Colleagues">Colleagues</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="input-well" style={{ flex: 1 }}>
              <label>To</label>
              <select value={toPerson} onChange={e => setToPerson(e.target.value)}>
                <option value="Divi">Divi</option>
                <option value="Liya">Liya</option>
                <option value="Milo 🐱">Milo 🐱</option>
              </select>
            </div>
          </div>

          <div className="input-well">
            <label>Your Message</label>
            <textarea 
              placeholder="Write your beautiful thoughts here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="primary" style={{ marginTop: '1rem', width: '100%' }}>
            Seal & Send
          </button>
        </form>
      </div>
    </>
  );
};

export default Write;
