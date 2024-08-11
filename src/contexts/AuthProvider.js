import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import api from '../services/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const res = await api.get('/api/auth/me');
          setUser(res.data);
        }
      } catch (err) {
        console.error('Error loading user:', err);
      }
    };

    loadUser();
  }, []);

  const login = async (username, password) => {
    try {
      const res = await api.post('/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setUser(res.data.user);
    } catch (err) {
      console.error('Error logging in:', err);
    }
  };

  const register = async (name, username, email, password) => {
    try {
      await api.post('/api/auth/register', { name, username, email, password });
    } catch (err) {
      console.error('Error registering:', err);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
