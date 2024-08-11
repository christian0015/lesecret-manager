import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SupplyHistory = () => {
  const [supplyHistory, setSupplyHistory] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSupplyHistory = async () => {
      try {
        // Récupère le token et vérifie le rôle de l'utilisateur
        const userString = localStorage.getItem('user');
        if (!userString) {
          throw new Error("L'utilisateur n'est pas connecté. Veuillez vous connecter.");
        }

        const user = JSON.parse(userString);
        if (user.role !== 'admin' && user.role !== 'gerant') {
          throw new Error('Non autorisé: Insufficient permissions');
        }

        // Effectue la requête pour récupérer l'historique des approvisionnements
        const response = await axios.get('https://lesecret-backend-stock.vercel.app/api/products/getSupply', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setSupplyHistory(response.data);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      }
    };

    fetchSupplyHistory();
  }, []);

  return (
    <div className="history-container">
  <h3>Historique d'Approvissionnement</h3>
  {error && <p>{error}</p>}
  <table>
    <thead>
      <tr>
        <th>Produit</th>
        <th>Quantité</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {supplyHistory.map(supply => (
        <tr key={supply._id}>
          <td>{supply.product.name}</td>
          <td>{supply.quantity}</td>
          <td>{new Date(supply.date).toLocaleDateString()}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  );
};

export default SupplyHistory;
