import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type UserRole = 'default' | 'dililo';

export type Note = {
  id: string;
  title: string;
  author: string;
  text: string;
  fromGroup: string; 
  toPerson: string; 
  isFav: boolean;
  createdAt: number;
};

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'isFav' | 'createdAt'>) => void;
  toggleFav: (id: string) => void;
  editNote: (id: string, newText: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Base mock notes
const initialNotes: Note[] = [
  { id: '1', title: 'Always in our thoughts', author: 'Mark', text: 'Hope you guys have a wonderful day!', fromGroup: 'Friend', toPerson: 'Divi', isFav: true, createdAt: Date.now() - 100000 },
  { id: '2', title: 'A friendly reminder', author: 'Mom', text: 'Make sure Milo eats his treat!', fromGroup: 'Family', toPerson: 'Milo 🐱', isFav: false, createdAt: Date.now() - 50000 },
];

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Try to grab role from LocalStorage to persist simple user switch (if running)
  const [role, setRoleState] = useState<UserRole>('default');
  const [notes, setNotes] = useState<Note[]>(initialNotes);

  useEffect(() => {
    const savedRole = localStorage.getItem('dililo_role');
    if (savedRole === 'dililo' || savedRole === 'default') {
      setRoleState(savedRole);
    }
  }, []);

  const setRole = (newRole: UserRole) => {
    localStorage.setItem('dililo_role', newRole);
    setRoleState(newRole);
  };

  const addNote = (notePayload: Omit<Note, 'id' | 'isFav' | 'createdAt'>) => {
    const newNote: Note = {
      ...notePayload,
      id: Math.random().toString(36).substr(2, 9),
      isFav: false,
      createdAt: Date.now(),
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const toggleFav = (id: string) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, isFav: !n.isFav } : n));
  };

  const editNote = (id: string, newText: string) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, text: newText } : n));
  };

  return (
    <AppContext.Provider value={{ role, setRole, notes, addNote, toggleFav, editNote }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
