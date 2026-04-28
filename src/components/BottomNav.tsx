import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Heart, Search } from 'lucide-react';

const BottomNav = () => {

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
