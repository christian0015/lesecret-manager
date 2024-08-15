import React from 'react';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductAddQuatity';
import SupplyHistory  from '../components/Historiques';

const Products = () => {
  return (
    <div className="products">
      {/* <h2>Products</h2> */}
      <ProductList />
      {/* <ProductForm /> */}
      {/* <SupplyHistory /> */}
    </div>
  );
};

export default Products;
