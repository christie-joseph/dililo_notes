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

const AppContent = () => {
  const { role } = useAppContext();

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
