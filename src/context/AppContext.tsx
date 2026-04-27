import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export type UserRole = 'default' | 'dililo';

export type Note = {
  id: string;
  title: string;
  author: string;
  text: string;
  fromGroup: string;
  toPerson: string;
  isFav: boolean;
  createdAt: number; // stored as Firestore Timestamp, exposed as ms
};

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  notes: Note[];
  loading: boolean;
  error: string | null;
  addNote: (note: Omit<Note, 'id' | 'isFav' | 'createdAt'>) => Promise<void>;
  toggleFav: (id: string) => Promise<void>;
  editNote: (id: string, newText: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRoleState] = useState<UserRole>('default');
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Restore role from localStorage on mount
  useEffect(() => {
    const savedRole = localStorage.getItem('dililo_role');
    if (savedRole === 'dililo' || savedRole === 'default') {
      setRoleState(savedRole);
    }
  }, []);

  // Real-time Firestore listener — ordered newest first
  useEffect(() => {
    const q = query(collection(db, 'notes'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetched: Note[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            title: data.title ?? '',
            author: data.author ?? '',
            text: data.text ?? '',
            fromGroup: data.fromGroup ?? '',
            toPerson: data.toPerson ?? '',
            isFav: data.isFav ?? false,
            // Firestore Timestamp → milliseconds for compatibility with existing components
            createdAt: data.createdAt?.toMillis() ?? Date.now(),
          };
        });
        setNotes(fetched);
        setLoading(false);
      },
      (err) => {
        console.error('Firestore snapshot error:', err);
        setError('Could not load notes. Please try again later.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const setRole = (newRole: UserRole) => {
    localStorage.setItem('dililo_role', newRole);
    setRoleState(newRole);
  };

  const addNote = async (notePayload: Omit<Note, 'id' | 'isFav' | 'createdAt'>) => {
    await addDoc(collection(db, 'notes'), {
      ...notePayload,
      isFav: false,
      createdAt: serverTimestamp(),
    });
  };

  const toggleFav = async (id: string) => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;
    await updateDoc(doc(db, 'notes', id), { isFav: !note.isFav });
  };

  const editNote = async (id: string, newText: string) => {
    await updateDoc(doc(db, 'notes', id), { text: newText });
  };

  return (
    <AppContext.Provider value={{ role, setRole, notes, loading, error, addNote, toggleFav, editNote }}>
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
