import React from 'react';
// import './Dashboard.css'; // Assurez-vous de créer ce fichier CSS

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className='BackImgDashboard'>
      <div className="imgCardDashboard">
          {/* <img src="/bouteilles/aluminum-canette.png" width={100}  alt="Boss"/> */}
          <img src="/bouteilles/heineken.png" width={300} className="imgBouteilleDashboard" alt="Boss"/>
          <img src="/bouteilles/heineken.png" width={300} className="imgBouteilleDashboard" alt="Boss"/>
          <img src="/bouteilles/heineken.png" width={300} className="imgBouteilleDashboard" alt="Boss"/>
        </div>
        <div className="welcome-card">
          <h2>Acceuil</h2>
          <p>Bienvenue chez LeSecret, Lounge Bar et Restaurant</p>
          <button className="get-started-btn">Visite le menu pour commencer</button>
          {/* <button className="get-started-btn">Get Started</button> */}
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
