import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Write from './pages/Write';
import Favs from './pages/Favs';
import Search from './pages/Search';
import ThankYou from './pages/ThankYou';

const AdminSettings = () => {
  const { role, setRole } = useAppContext();
  return (
    <div className="page-container compositional-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '1rem' }}>
      <h1 className="display-lg">Admin</h1>
      <p className="body-md">Current Role: {role}</p>
      <button className="primary" onClick={() => setRole('dililo')} style={{ width: '200px' }}>Unlock Reader</button>
      <button className="secondary" onClick={() => setRole('default')} style={{ width: '200px', background: 'transparent', border: '1px solid var(--outline-variant)' }}>Lock to Writer</button>
      <a href="/" style={{ marginTop: '2rem', color: 'var(--primary)', fontWeight: 600 }}>Return App</a>
    </div>
  );
};

const LoadingScreen = () => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    height: '100vh', gap: '1rem', background: 'var(--background)'
  }}>
    <div style={{
      width: '40px', height: '40px', borderRadius: '50%',
      border: '3px solid var(--outline-variant)',
      borderTopColor: 'var(--primary)',
      animation: 'spin 0.8s linear infinite'
    }} />
    <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>Loading notes…</p>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

const ErrorScreen = ({ message }: { message: string }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    height: '100vh', gap: '0.5rem', padding: '2rem', background: 'var(--background)'
  }}>
    <span style={{ fontSize: '2rem' }}>⚠️</span>
    <p className="body-md" style={{ color: 'var(--error)', textAlign: 'center' }}>{message}</p>
  </div>
);

const AppContent = () => {
  const { role, loading, error } = useAppContext();

  // Show loading/error only for the admin (dililo) reader — guests can always write
  if (role === 'dililo' && loading) return <LoadingScreen />;
  if (role === 'dililo' && error) return <ErrorScreen message={error} />;

  return (
    <BrowserRouter>
      <div className="page-wrapper">
        {role === 'dililo' ? (
          <>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favs" element={<Favs />} />
              <Route path="/search" element={<Search />} />
              <Route path="/admin" element={<AdminSettings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <BottomNav />
          </>
        ) : (
          <Routes>
            <Route path="/write" element={<Write />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/admin" element={<AdminSettings />} />
            <Route path="*" element={<Navigate to="/write" replace />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
