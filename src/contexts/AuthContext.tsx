import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/reqres';

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      console.log('Sending login request with:', { email, password });
      const res = await api.post('/login', {
        email: email.trim(),
        password: password.trim(),
      });
      console.log('Response:', res.data);
      setToken(res.data.token);
    } catch (err: any) {
      console.error('Error:', err.response?.data);
      throw new Error(err.response?.data?.error || 'Login failed');
    }
  };

  const logout = () => setToken(null);

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};