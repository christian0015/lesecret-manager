import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      const response = await axios.post('https://lesecret-backend-stock.vercel.app/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token); // Stocke le token
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Stocke les données utilisateur si nécessaire

      // console.log('Token stored after login:', response.data.token);
      // console.log('User stored after login:', response.data.user);
      // console.log(response.data); // Vous pouvez gérer la réponse ici (e.g., sauvegarder le token, rediriger l'utilisateur, etc.)
      window.location.href = '/app';
      // setError('Valide login credentials');
    } catch (error) {
      setError('Invalid login credentials');
    }
  };

  return (
    <div className='loginPage'>
      <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label><br/>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password</label><br/>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
      </div>
    </div>
  );
};

export default Login;
