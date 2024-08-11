import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Assurez-vous que l'URL est correcte
});

// Intercepteur de requête pour ajouter le token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  // console.log('Token in request:', token); // Vérifiez si le token est bien récupéré
  const user = JSON.parse(localStorage.getItem('user')); // Ajoute cette ligne pour récupérer les données utilisateur


  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
    console.log('token existe chez Axios et ajoutée à la requete', token); // Vérifiez si le token est bien récupéré
  }

  // Si tu veux ajouter des données utilisateur à chaque requête, fais-le ici
  if (user) {
    config.headers['User'] = JSON.stringify(user);
    console.log('User data ajoutée à la requête:', user); // Vérifiez les données utilisateur ajoutées
  }
  return config;
}, (error) => {
  console.log('token non dispo chez Axios'); // Vérifiez si le token est bien récupéré
  return Promise.reject(error);
});

export default api;
