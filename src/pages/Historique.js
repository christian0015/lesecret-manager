import React from 'react';
import Historiques from '../components/Historiques';
import SalesList from '../components/VentesList';

const Historique = () => {
  return (
    <div className="historiquePage">
      {/* <h2>Sales</h2> */}
      <Historiques />
      <SalesList />
    </div>
  );
};

export default Historique;
