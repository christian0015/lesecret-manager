import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get('https://lesecret-backend-stock.vercel.app/api/sales');
        setSales(response.data);
      } catch (err) {
        console.error(err);
        setError('Error fetching sales');
      }
    };

    fetchSales();
  }, []);

  return (
    <div className="sales-list">
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
          {sales.map((sale) => (
            <tr key={sale._id}>
              <td>{sale.product.name}</td>
              <td>{sale.quantity}</td>
              <td>{sale.product.price} Fc</td>
              <td>{sale.totalPrice} Fc</td>
              <td>{sale.product.costPrice} Fc</td> {/* Prix de revient */}
              <td>{(sale.totalPrice - sale.product.costPrice * sale.quantity).toFixed(2)} Fc</td> {/* Bénéfice */}
              <td>{sale.server.username}</td>
              <td>{sale.table}</td>
              <td>{new Date(sale.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesList;
