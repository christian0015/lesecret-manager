import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Login from '../pages/Login';
import useAuth from '../hooks/useAuth';

const Sidebar = () => {
  const {logout } = useAuth();
  const handleLogout = () => {
    logout();
    window.location.href = '/login'; // Redirige vers la page de login
  }
  return (
    <div className="sidebar">
      <NavLink  to="/Login">
      <button onClick={handleLogout} className="logout">
        <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg></span>
        <span >Déconnexion</span>
      </button>
      </NavLink>
    </div>
  );
};

export default Sidebar;
