
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { ProfileMode } from '../types';

interface AppContextType {
  mode: ProfileMode;
  setMode: (mode: ProfileMode) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<ProfileMode>(() => {
    const savedMode = localStorage.getItem('datematch-mode');
    return (savedMode as ProfileMode) || ProfileMode.Marriage;
  });

  const setMode = (newMode: ProfileMode) => {
    setModeState(newMode);
    localStorage.setItem('datematch-mode', newMode);
  };

  useEffect(() => {
    const savedMode = localStorage.getItem('datematch-mode');
    if (savedMode) {
      setModeState(savedMode as ProfileMode);
    }
  }, []);

  return (
    <AppContext.Provider value={{ mode, setMode }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
