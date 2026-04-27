import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Heart, Search, Lock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const BottomNav = () => {
  const { setRole } = useAppContext();

  const getNavClass = ({ isActive }: { isActive: boolean }) => {
    return isActive ? 'nav-item active' : 'nav-item';
  };

  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={getNavClass}>
        <Home size={24} />
      </NavLink>
      <NavLink to="/search" className={getNavClass}>
        <Search size={24} />
      </NavLink>
      <NavLink to="/favs" className={getNavClass}>
        <Heart size={24} />
      </NavLink>
      <button 
        className="nav-item" 
        onClick={() => setRole('default')}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        title="Lock Admin Mode"
      >
        <Lock size={24} />
      </button>
      <style>{`
        .nav-item {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          color: var(--outline);
          border-radius: var(--radius-full);
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .nav-item.active {
          color: var(--primary);
          background-color: var(--primary-container);
        }
      `}</style>
    </nav>
  );
};

export default BottomNav;
