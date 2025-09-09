
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { mockUsers } from '../data/mocks';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string) => void;
  logout: () => void;
  adminLogin: (user: string, pass: string) => boolean;
  adminLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('datematch-user');
    const storedAdmin = localStorage.getItem('datematch-admin');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedAdmin) {
      setIsAdmin(true);
    }
  }, []);

  const login = (email: string) => {
    // In a real app, you'd fetch this. Here we just mock it.
    const loggedInUser = mockUsers[0]; // Simulate logging in as the first mock user
    setUser(loggedInUser);
    localStorage.setItem('datematch-user', JSON.stringify(loggedInUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('datematch-user');
  };
  
  const adminLogin = (username: string, pass: string) => {
    if (username === 'admin' && pass === 'pass') {
        setIsAdmin(true);
        localStorage.setItem('datematch-admin', 'true');
        return true;
    }
    return false;
  }

  const adminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('datematch-admin');
  }

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout, adminLogin, adminLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
