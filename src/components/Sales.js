import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalesManager = () => {
  const [products, setProducts] = useState([]);
  const [servers, setServers] = useState([]); // Liste des serveurs pour le formulaire
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [serverId, setServerId] = useState('');
  const [table, setTable] = useState('');
  const [sales, setSales] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch products and servers
    const fetchProductsAndServers = async () => {
      try {
        const userString = localStorage.getItem('user');
        if (!userString) {
          throw new Error("L'utilisateur n'est pas connecté. Veuillez vous connecter.");
        }

        const user = JSON.parse(userString);
        if (user.role !== 'admin' && user.role !== 'gerant') {
          throw new Error('Non autorisé: Insufficient permissions');
        }

        const [productsResponse, serversResponse] = await Promise.all([
          axios.get('https://lesecret-backend-stock.vercel.app/api/products', {
            headers: { Authorization: `Bearer ${user.token}` }
          }),
          axios.get('https://lesecret-backend-stock.vercel.app/api/auth/servers', {
            headers: { Authorization: `Bearer ${user.token}` }
          })
        ]);
        setProducts(productsResponse.data);
        setServers(serversResponse.data);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      }
    };

    fetchProductsAndServers();
  }, []);

  useEffect(() => {
    // Fetch sales
    const fetchSales = async () => {
      try {
        const userString = localStorage.getItem('user');
        if (!userString) {
          throw new Error("L'utilisateur n'est pas connecté. Veuillez vous connecter.");
        }

        const user = JSON.parse(userString);
        if (user.role !== 'admin' && user.role !== 'gerant') {
          throw new Error('Non autorisé: Insufficient permissions');
        }

        const response = await axios.get('https://lesecret-backend-stock.vercel.app/api/sales', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setSales(response.data);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      }
    };

    fetchSales();
  }, []);

  const handleAddSale = async (e) => {
    e.preventDefault();
    try {
      const userString = localStorage.getItem('user');
      if (!userString) {
        throw new Error("L'utilisateur n'est pas connecté. Veuillez vous connecter.");
      }

      const user = JSON.parse(userString);
      if (user.role !== 'admin' && user.role !== 'gerant') {
        throw new Error('Non autorisé: Insufficient permissions');
      }

      await axios.post('https://lesecret-backend-stock.vercel.app/api/sales', { productId, quantity, serverId, table }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setProductId('');
      setQuantity('');
      setServerId('');
      setTable('');

      // Fetch sales again after adding a new one
      const response = await axios.get('https://lesecret-backend-stock.vercel.app/api/sales', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setSales(response.data);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };

  return (
    <div className="sales-manager">
      <h3>Gestion de Ventes</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleAddSale}>
        <div>
          <label>Boisson:</label>
          <select value={productId} onChange={(e) => setProductId(e.target.value)} required>
            <option value="">Selectionner une Boisson</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>{product.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Quantité:</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </div>
        <div>
          <label>Serveur:</label>
          <select value={serverId} onChange={(e) => setServerId(e.target.value)} required>
            <option value="">Selectionner un Serveur</option>
            {servers.map((server) => (
              <option key={server._id} value={server._id}>{server.username}</option>
            ))}
          </select>
        </div>
        <div>
          <label>N° Table:</label>
          <input type="text" value={table} onChange={(e) => setTable(e.target.value)} required />
        </div>
        <button type="submit">Effectuer la commande</button>
      </form>
      
    </div>
  );
};

export default SalesManager;
