import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VentesList = () => {
  const [ventes, setVentes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVentes = async () => {
      try {
        const response = await axios.get('https://lesecret-backend-stock.vercel.app/api/ventes');
        setVentes(response.data);
      } catch (err) {
        console.error(err);
        setError('Error fetching ventes');
      }
    };

    fetchVentes();
  }, []);

  return (
    <div className="ventes-list">
      <h3>Liste des Ventes</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Prix U</th>
            <th>Prix Total</th>
            <th>Prix de Revient</th>
            <th>Bénéfice</th>
            <th>Serveur</th>
            <th>Table</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {ventes.map((vente) => (
            <tr key={vente._id}>
              <td>{vente.product.name}</td>
              <td>{vente.quantity}</td>
              <td>{vente.product.price} Fc</td>
              <td>{vente.totalPrice} Fc</td>
              <td>{vente.product.costPrice} Fc</td> {/* Prix de revient */}
              <td>{(vente.totalPrice - vente.product.costPrice * vente.quantity).toFixed(2)} Fc</td> {/* Bénéfice */}
              <td>{vente.server.username}</td>
              <td>{vente.table}</td>
              <td>{new Date(vente.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VentesList;
