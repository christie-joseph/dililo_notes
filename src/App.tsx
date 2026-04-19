import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Write from './pages/Write';
import Favs from './pages/Favs';
import Search from './pages/Search';
import ThankYou from './pages/ThankYou';

const RoleToggle = () => {
  const { role, setRole } = useAppContext();
  return (
    <button 
      className="role-toggle" 
      onClick={() => setRole(role === 'default' ? 'dililo' : 'default')}
      style={{ position: 'fixed', top: 16, right: 16, zIndex: 100, background: 'var(--surface-container-high)', padding: '8px 16px', borderRadius: '1.5rem', fontWeight: 600, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
    >
      Mode: {role}
    </button>
  );
};

const AppContent = () => {
  const { role } = useAppContext();

  return (
    <BrowserRouter>
      <RoleToggle />
      <div className="page-wrapper">
        {role === 'dililo' ? (
          <>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favs" element={<Favs />} />
              <Route path="/search" element={<Search />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <BottomNav />
          </>
        ) : (
          <Routes>
            <Route path="/write" element={<Write />} />
            <Route path="/thank-you" element={<ThankYou />} />
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
