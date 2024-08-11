import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('serveur'); // Définir un rôle par défaut
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Récupère le rôle de l'utilisateur connecté
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      setUserRole(user.role);
    } else {
      setError("Vous devez être connecté pour accéder à cette page.");
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Vérifie si l'utilisateur est admin
    if (userRole !== 'admin') {
      setError('Seul un administrateur peut enregistrer de nouveaux utilisateurs.');
      return;
    }

    try {
      const response = await axios.post('https://lesecret-backend-stock.vercel.app/api/auth/register', { username, email, password, role });
      console.log(response.data); // Gérer la réponse ici (e.g., rediriger l'utilisateur, afficher un message de succès, etc.)
    } catch (error) {
      setError('Erreur lors de l\'enregistrement');
    }
  };

  return (
    <div className="register-form">
  <h2>Register</h2>
  {error && <p>{error}</p>}
  <form onSubmit={handleRegister}>
    <div>
      <label>Nom d'utilisateur:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
    </div>
    <div>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>
    <div>
      <label>Mot de passe:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>
    <div>
      <label>Rôle:</label>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      >
        <option value="admin">Admin</option>
        <option value="gerant">Gerant</option>
        <option value="serveur">Serveur</option>
      </select>
    </div>
    <button type="submit">Enregistrer</button>
  </form>
</div>

  );
};

export default Register;
