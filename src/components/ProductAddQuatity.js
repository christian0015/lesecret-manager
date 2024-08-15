import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateQuantity = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch all products when the component mounts
    const fetchProducts = async () => {
      try {
        const userString = localStorage.getItem('user');
        if (!userString) {
          throw new Error("L'utilisateur n'est pas connecté. Veuillez vous connecter.");
        }

        const user = JSON.parse(userString);
        if (user.role !== 'admin') {
          throw new Error('Non autorisé: Aucune permission');
        }

        const response = await axios.get('https://lesecret-backend-stock.vercel.app/api/products', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setProducts(response.data);
      } catch (err) {
        console.error(err.message);
        setMessage(err.message);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userString = localStorage.getItem('user');
      if (!userString) {
        throw new Error("L'utilisateur n'est pas connecté. Veuillez vous connecter.");
      }

      const user = JSON.parse(userString);
      if (user.role !== 'admin') {
        throw new Error('Non autorisé: Aucune permission');
      }

      await axios.post('https://lesecret-backend-stock.vercel.app/api/products/update-quantity', {
        productId: selectedProduct,
        quantity: Number(quantity),
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      setMessage('Quantity updated successfully');
      setSelectedProduct('');
      setQuantity('');
    } catch (err) {
      console.error(err.message);
      setMessage('Error updating quantity: ' + err.message);
    }
  };

  return (
    <div className="update-quantity">
      <h3>Ajout des Boissons</h3>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Boissons:</label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            required
          >
            <option value="">Selectionner un produit</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Quantité:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Approvisionner</button>
      </form>
    </div>
  );
};

export default UpdateQuantity;
