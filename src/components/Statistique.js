import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Statistics = () => {
  const [ventes, setVentes] = useState([]);
  const [products, setProducts] = useState([]);
  const [servers, setServers] = useState([]);
  const [tables, setTables] = useState([]);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userString = localStorage.getItem('user');
        if (!userString) {
          throw new Error("L'utilisateur n'est pas connecté. Veuillez vous connecter.");
        }

        const user = JSON.parse(userString);
        if (user.role !== 'admin') {
          throw new Error('Non autorisé: Aucune permission');
        }

        const [ventesResponse, productsResponse, serversResponse] = await Promise.all([
          axios.get('https://lesecret-backend-stock.vercel.app/api/ventes', {
            headers: { Authorization: `Bearer ${user.token}` }
          }),
          axios.get('https://lesecret-backend-stock.vercel.app/api/products', {
            headers: { Authorization: `Bearer ${user.token}` }
          }),
          axios.get('https://lesecret-backend-stock.vercel.app/api/auth/servers', {
            headers: { Authorization: `Bearer ${user.token}` }
          })
        ]);

        setVentes(ventesResponse.data);
        setProducts(productsResponse.data);
        setServers(serversResponse.data);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  // Chiffre d'Affaires Journalier et par Sélection de Date
  const calculateRevenue = (ventes, date = null, startDate = null, endDate = null) => {
    const filteredVentes = ventes.filter(vente => {
      const venteDate = new Date(vente.date);
      if (date) {
        return venteDate.toDateString() === new Date(date).toDateString();
      }
      if (startDate && endDate) {
        return venteDate >= new Date(startDate) && venteDate <= new Date(endDate);
      }
      return true;
    });
    return filteredVentes.reduce((total, vente) => total + vente.totalPrice, 0);
  };

  // Ventes Par Catégorie
  const ventesByCategory = () => {
    const categoryTotals = {};
    ventes.forEach(vente => {
      const product = products.find(p => p._id === vente.product._id);
      if (product) {
        const category = product.category;
        categoryTotals[category] = (categoryTotals[category] || 0) + vente.totalPrice;
      }
    });
    return categoryTotals;
  };

  // Listing des Meilleurs Produits Vendus
  const topSellingProducts = () => {
    const productCounts = {};
    ventes.forEach(vente => {
      productCounts[vente.product._id] = (productCounts[vente.product._id] || 0) + vente.quantity;
    });
    return Object.entries(productCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([productId]) => products.find(p => p._id === productId))
      .filter(Boolean);
  };

  // Listing des Meilleurs Produits en Bénéfices
  const topRevenueProducts = () => {
    const productRevenue = {};
  
    ventes.forEach(vente => {
      const product = products.find(p => p._id === vente.product._id);
      if (product && product.price !== undefined && product.costPrice !== undefined) {
        const revenue = vente.quantity * (product.price - product.costPrice);
        productRevenue[vente.product._id] = (productRevenue[vente.product._id] || 0) + revenue;
      }
    });
  
    const productsWithRevenue = products.map(product => ({
      ...product,
      revenue: productRevenue[product._id] || 0
    }));
  
    return productsWithRevenue
      .sort((a, b) => b.revenue - a.revenue);
  };
  
  

  // Performances des Serveurs
  const serverPerformance = () => {
    const serverTotals = {};
    ventes.forEach(vente => {
      const serverId = vente.server._id;
      serverTotals[serverId] = (serverTotals[serverId] || 0) + vente.totalPrice;
    });
    return serverTotals;
  };

  // Performances des Tables
  const tablePerformance = () => {
    const tableTotals = {};
    ventes.forEach(vente => {
      const tableNumber = vente.table;
      tableTotals[tableNumber] = (tableTotals[tableNumber] || 0) + vente.totalPrice;
    });
    return tableTotals;
  };

  // Variables pour les statistiques
  const topProductsSold = topSellingProducts();
  const topProductsRevenue = topRevenueProducts();
  const serverPerformances = serverPerformance();
  const tablePerformances = tablePerformance();

  return (
    <div className="statistics">
      <h3>Statistiques</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <label>Date Unique:</label>
        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
        <p>Chiffre d'Affaires Journalier: {calculateRevenue(ventes, selectedDate).toFixed(2)} Fc</p>
      </div>

      <div>
        <label>Date de Début:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <label>Date de Fin:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <p>Chiffre d'Affaires pour la Période: {calculateRevenue(ventes, null, startDate, endDate).toFixed(2)} Fc</p>
      </div>

      <div>
        <h4>Ventes Par Catégorie</h4>
        <ul>
          {Object.entries(ventesByCategory()).map(([category, total]) => (
            <li key={category}>{category}: {total.toFixed(2)} Fc</li>
          ))}
        </ul>
      </div>

      <div>
        <h4>Meilleurs Produits Vendus</h4>
        <ul>
          {topProductsSold.map(product => (
            <li key={product._id}>{product.name}: {topSellingProducts().find(p => p._id === product._id)?.quantity || 0} unités</li>
          ))}
        </ul>
      </div>

      <div>
        <h4>Meilleurs Produits en Bénéfices</h4>
        <ul>
          {topProductsRevenue.map(product => (
            <li key={product._id}>{product.name}: {topRevenueProducts().find(p => p._id === product._id)?.revenue || 0} Fc</li>
          ))}
        </ul>
      </div>

      <div>
  <h4>Meilleurs Produits en Bénéfices</h4>
  <ul>
    {topRevenueProducts().map(product => (
      <li key={product._id}>
        {product.name}: {topRevenueProducts().find(p => p._id === product._id)?.revenue.toFixed(2) || 0} Fc
      </li>
    ))}
  </ul>
</div>


      <div>
        <h4>Performances des Tables</h4>
        <ul>
          {Object.entries(tablePerformances).map(([table, total]) => (
            <li key={table}>Table {table}: {total.toFixed(2)} Fc</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Statistics;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const SupplyHistory = () => {
//   const [supplyHistory, setSupplyHistory] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchSupplyHistory = async () => {
//       try {
//         // Récupère le token et vérifie le rôle de l'utilisateur
//         const userString = localStorage.getItem('user');
//         if (!userString) {
//           throw new Error("L'utilisateur n'est pas connecté. Veuillez vous connecter.");
//         }

//         const user = JSON.parse(userString);
//         if (user.role !== 'admin' && user.role !== 'gerant') {
//           throw new Error('Non autorisé: Insufficient permissions');
//         }

//         // Effectue la requête pour récupérer l'historique des approvisionnements
//         const response = await axios.get('http://localhost:5000/api/products/getSupply', {
//           headers: { Authorization: `Bearer ${user.token}` }
//         });
//         setSupplyHistory(response.data);
//       } catch (err) {
//         console.error(err.message);
//         setError(err.message);
//       }
//     };

//     fetchSupplyHistory();
//   }, []);

//   return (
//     <div className="history-container">
//   <h3>Historique d'Approvissionnement</h3>
//   {error && <p>{error}</p>}
//   <table>
//     <thead>
//       <tr>
//         <th>Produit</th>
//         <th>Quantité</th>
//         <th>Date</th>
//       </tr>
//     </thead>
//     <tbody>
//       {supplyHistory.map(supply => (
//         <tr key={supply._id}>
//           <td>{supply.product.name}</td>
//           <td>{supply.quantity}</td>
//           <td>{new Date(supply.date).toLocaleDateString()}</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>
//   );
// };

// export default SupplyHistory;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const SalesList = () => {
//   const [sales, setSales] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchSales = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/sales');
//         setSales(response.data);
//       } catch (err) {
//         console.error(err);
//         setError('Error fetching sales');
//       }
//     };

//     fetchSales();
//   }, []);

//   return (
//     <div className="sales-list">
//       <h3>Liste des Ventes</h3>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <table>
//         <thead>
//           <tr>
//             <th>Produit</th>
//             <th>Quantité</th>
//             <th>Prix U</th>
//             <th>Prix Total</th>
//             <th>Serveur</th>
//             <th>Table</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sales.map((sale) => (
//             <tr key={sale._id}>
//               <td>{sale.product.name}</td>
//               <td>{sale.quantity}</td>
//               <td>{sale.product.price} Fc</td>
//               <td>{sale.totalPrice} Fc</td>
//               <td>{sale.server.username}</td>
//               <td>{sale.table}</td>
//               <td>{new Date(sale.date).toLocaleString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SalesList;
