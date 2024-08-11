import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  // console.log('User from Navbar:', user); // Log user
  const handleLogout = () => {
    logout();
    window.location.href = '/login'; // Redirige vers la page de login
    };

  return (
    <nav className="navbar">
      
            <button onClick={handleLogout}>Logout</button>

        
      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/products">Products</Link>
        <Link to="/sales">Sales</Link>
      </div>
    </nav>
  );
};

export default Navbar;
