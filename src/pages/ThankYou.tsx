import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const msgs = [
  "Your words have been sealed. Thank you for sharing a beautiful thought today.",
  "What a lovely message! We'll keep it safe like a treasured memory.",
  "Your note is tucked away securely. Thanks for taking the time to share!"
];

const ThankYou = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState('');

  useEffect(() => {
    setMsg(msgs[Math.floor(Math.random() * msgs.length)]);
  }, []);

  return (
    <div className="page-container compositional-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', height: '100%', gap: '2rem' }}>
      <h1 className="display-lg">Thank You</h1>
      <p className="body-md" style={{ color: 'var(--on-surface-variant)', fontSize: '1.25rem', maxWidth: '300px' }}>
        {msg}
      </p>

      <button className="primary" onClick={() => navigate('/write')} style={{ marginTop: '2rem' }}>
        Write another note
      </button>
    </div>
  );
};

export default ThankYou;
