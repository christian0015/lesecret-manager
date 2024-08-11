import React from 'react';
import SupplyHistory from '../components/SupplyHistory';
import SalesList from '../components/SalesList';

const Historique = () => {
  return (
    <div className="historiquePage">
      {/* <h2>Sales</h2> */}
      <SupplyHistory />
      <SalesList />
    </div>
  );
};

export default Historique;
