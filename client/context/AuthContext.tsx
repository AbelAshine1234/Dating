import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

interface AuthContextValue {
  isAuthenticated: boolean;
  signIn: () => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return typeof window !== 'undefined' && localStorage.getItem('auth_signed_in') === 'true';
  });

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('auth_signed_in', 'true');
    } else {
      localStorage.removeItem('auth_signed_in');
    }
  }, [isAuthenticated]);

  const signIn = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const signOut = useCallback(() => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {}
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(() => ({ isAuthenticated, signIn, signOut }), [isAuthenticated, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


