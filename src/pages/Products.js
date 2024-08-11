import React from 'react';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import SupplyHistory  from '../components/SupplyHistory';

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
