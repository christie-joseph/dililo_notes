import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import DynamicBackground from '../components/DynamicBackground';

const CustomDropdown = ({ options, value, onChange }: { options: string[], value: string, onChange: (val: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '24px' }}
      >
        <span style={{ color: isOpen ? 'var(--primary)' : 'var(--on-surface)', transition: 'color 0.2s' }}>{value}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isOpen ? "var(--primary)" : "var(--on-surface-variant)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s, stroke 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}><polyline points="6 9 12 15 18 9"></polyline></svg>
      </div>
      {isOpen && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => setIsOpen(false)} />
          <div style={{ 
            position: 'absolute', top: '100%', left: -10, right: -10, 
            background: 'rgba(255, 251, 255, 0.45)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
            borderRadius: 'var(--radius-xl)', padding: '0.5rem', marginTop: '0.5rem',
            boxShadow: '0 12px 40px rgba(57, 56, 47, 0.12)', zIndex: 100, border: '1px solid rgba(255, 255, 255, 0.6)',
            maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.25rem'
          }}>
            {options.map(opt => (
              <div 
                key={opt}
                onClick={() => { onChange(opt); setIsOpen(false); }}
                style={{ 
                  padding: '0.75rem 1rem', cursor: 'pointer', borderRadius: '12px', 
                  color: value === opt ? 'var(--primary)' : 'var(--on-surface)', 
                  fontWeight: value === opt ? 600 : 400,
                  background: value === opt ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
                  transition: 'background 0.2s'
                }}
              >
                {opt}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const Write = () => {
  const { addNote, setRole } = useAppContext();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [fromGroup, setFromGroup] = useState('Family');
  const [toPerson, setToPerson] = useState('Divi');

  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author || !text) return;

    setIsSending(true);
    setSubmitError(null);

    try {
      await addNote({ title, author, text, fromGroup, toPerson });
      setTimeout(() => {
        navigate('/thank-you');
      }, 2400);
    } catch (err) {
      console.error('Failed to save note:', err);
      setIsSending(false);
      setSubmitError('Something went wrong. Please try again.');
    }
  };

  const handleAdminLogin = () => {
    const pwd = window.prompt('Enter admin password:');
    if (pwd === 'miloSnipSnip:(') {
      setRole('dililo');
    } else if (pwd !== null) {
      alert('Incorrect password');
    }
  };

  return (
    <>
      <DynamicBackground person={toPerson} />
      
      <button 
        onClick={handleAdminLogin}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          zIndex: 50,
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          borderRadius: '20px',
          padding: '0.5rem 1rem',
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'var(--on-surface)',
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)'}
        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
      >
        You the lucky couple?
      </button>

      <div className="page-container compositional-content" style={{ zIndex: 10, position: 'relative' }}>
        <header style={{ marginTop: '2rem' }}>
          <h1 className="display-lg" style={{ background: 'none', WebkitTextFillColor: 'initial', color: 'var(--on-surface)' }}>
            Notes,<br />
            <span style={{ 
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--tertiary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Unfiltered
            </span>
          </h1>
          <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>
            Leave a favorite memory, some advice, or a little love for Divi, Liya, and Milo! 🐾
          </p>
        </header>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'rgba(255, 251, 255, 0.4)', padding: '1rem', borderRadius: 'var(--radius-xl)', backdropFilter: 'blur(10px)' }}>
          <div className="input-well">
            <label>Subject</label>
            <input 
              type="text" 
              placeholder="e.g. A sweet memory to share..." 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

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
              <CustomDropdown 
                options={['Family', 'Friend', 'Colleagues', 'Other']}
                value={fromGroup}
                onChange={setFromGroup}
              />
            </div>

            <div className="input-well" style={{ flex: 1 }}>
              <label>Written for</label>
              <CustomDropdown 
                options={['Divi', 'Liya', 'Milo 🐱']}
                value={toPerson}
                onChange={setToPerson}
              />
            </div>
          </div>

          <div className="input-well">
            <label>Your Message</label>
            <textarea 
              placeholder="Let the ink flow..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>

          {submitError && (
            <p style={{ color: 'var(--error)', fontSize: '0.875rem', textAlign: 'center', margin: 0 }}>
              {submitError}
            </p>
          )}

          <button type="submit" className="primary" style={{ marginTop: '1rem', width: '100%' }} disabled={isSending}>
            {isSending ? 'Sending...' : 'Seal & Send'}
          </button>
        </form>
      </div>

      {isSending && (
        <div className="envelope-overlay">
          <div className="flap-top"></div>
          <div className="flap-bottom"></div>
          <div className="seal">❤️</div>
        </div>
      )}

      <style>{`
        .envelope-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          z-index: 1000;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .flap-top {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 50vh;
          background-color: var(--surface);
          border-bottom: 2px solid var(--outline-variant);
          transform: translateY(-100%);
          animation: slideTop 0.8s forwards cubic-bezier(0.25, 1, 0.5, 1);
        }
        .flap-bottom {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 50vh;
          background-color: var(--surface);
          border-top: 2px solid var(--outline-variant);
          transform: translateY(100%);
          animation: slideBottom 0.8s forwards cubic-bezier(0.25, 1, 0.5, 1) 0.6s;
        }
        .seal {
          font-size: 5rem;
          z-index: 1001;
          opacity: 0;
          transform: scale(3);
          animation: stampSeal 0.6s forwards cubic-bezier(0.175, 0.885, 0.32, 1.275) 1.5s;
        }

        @keyframes slideTop {
          100% { transform: translateY(0); }
        }
        @keyframes slideBottom {
          100% { transform: translateY(0); }
        }
        @keyframes stampSeal {
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default Write;
