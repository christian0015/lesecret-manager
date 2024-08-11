import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Récupère le token
        const userString = localStorage.getItem('user');
        if (!userString) {
          throw new Error("L'utilisateur n'est pas connexion. Veillez vous conncter");
        }

        const user = JSON.parse(userString);
        if (user.role !== 'admin' && user.role !== 'gerant') {
          console.log("ur:", user.role)
          throw new Error('Non autorisé: Insufficient permissions');
        }
        else{
          const response = await axios.get('https://lesecret-backend-stock.vercel.app/api/products', {
            headers: { Authorization: `Bearer ${user.token}`
                }});
              setProducts(response.data);
              }
            } catch (error) {
              console.error(error.message);
              setError(error.message);
            }
        };

    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      <h3>Liste des Boissons</h3>
      {error && <p className="error">{error}</p>}
      <ul>
        {products.map(product => (
          <li key={product._id} className="product-item">
            <span>{product.name}</span>
            <span>{product.price} FC</span>
            <span>Quantité : {product.quantity}</span>
            {/* Ajout du prix de revient si nécessaire */}
            {/* <span>Prix de Revient : {product.costPrice ? `${product.costPrice} FCFA` : 'Non disponible'}</span> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
