import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Assure-toi que le chemin est correct

const useAuth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await api.get('http://localhost:5000/api/auth/me');
          setUser(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    navigate('/login');
  };

  return { user, logout };
};

export default useAuth;
