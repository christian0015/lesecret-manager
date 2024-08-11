
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductForm from './components/ProductForm';
import Sales from './pages/Sales';
import Historique from './pages/Historique';
import Statistique from './components/Statistique';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './App.css';
import { Link, NavLink  } from 'react-router-dom';

const userString = localStorage.getItem('user');
const userProfil = JSON.parse(userString);

const App = () => {

  const [isShown, setIsShown] = useState(false);
  const toggleAside = () => {
    setIsShown(!isShown);
    };
  return (
    <Router>
      <div className="app">
        <aside className={isShown ? 'show' : ''}>
          <div className="userProfil">
            <span className="userProfilImgs">
              {userProfil.role=="admin" ?
                <img src="/imgBoss.png" width={50} className="userProfilImg" alt="Boss"/> :
                 <img src="/imgGerant.jpeg" width={50} className="userProfilImg" alt="Gerant"/>
              }
            </span>
            <span className="userProfilInfo">
              <span>{userProfil.username}</span>
              <span className='span2'>{userProfil.email}</span>
              {/* <span>{userProfil.role}</span> */}
            </span>
          </div>

          <div className="asideLink">

            <NavLink  to="/dashboard">
              <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M120-520v-320h320v320H120Zm0 400v-320h320v320H120Zm400-400v-320h320v320H520Zm0 400v-320h320v320H520ZM200-600h160v-160H200v160Zm400 0h160v-160H600v160Zm0 400h160v-160H600v160Zm-400 0h160v-160H200v160Zm400-400Zm0 240Zm-240 0Zm0-240Z"/></svg></span>
              <span>Acceuil</span>
            </NavLink >

            <NavLink  to="/products">
              <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M240-120v-80h200v-200L120-760v-80h720v80L520-400v200h200v80H240Zm58-560h364l72-80H226l72 80Zm182 204 111-124H369l111 124Zm0 0Z"/></svg></span>
              <span>Boissons</span>
            </NavLink >

            <NavLink  to="/sales">
              <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z"/></svg></span>
              <span>Vente</span>
            </NavLink >

            <NavLink  to="/productform">
              <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-580q-17 0-28.5-11.5T440-620q0-17 11.5-28.5T480-660q17 0 28.5 11.5T520-620q0 17-11.5 28.5T480-580Zm-40-140v-200h80v200h-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z"/></svg></span>
              <span>Approvisionnement</span>
            </NavLink >

            <NavLink  to="/historique">
              <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z"/></svg></span>
              <span>Historique</span>
            </NavLink >

            <NavLink  to="/statistique" activeClassName="active-link">
              <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M120-240q-33 0-56.5-23.5T40-320q0-33 23.5-56.5T120-400h10.5q4.5 0 9.5 2l182-182q-2-5-2-9.5V-600q0-33 23.5-56.5T400-680q33 0 56.5 23.5T480-600q0 2-2 20l102 102q5-2 9.5-2h21q4.5 0 9.5 2l142-142q-2-5-2-9.5V-640q0-33 23.5-56.5T840-720q33 0 56.5 23.5T920-640q0 33-23.5 56.5T840-560h-10.5q-4.5 0-9.5-2L678-420q2 5 2 9.5v10.5q0 33-23.5 56.5T600-320q-33 0-56.5-23.5T520-400v-10.5q0-4.5 2-9.5L420-522q-5 2-9.5 2H400q-2 0-20-2L198-340q2 5 2 9.5v10.5q0 33-23.5 56.5T120-240Z"/></svg></span>
              <span>Statistique</span>
            </NavLink >

          </div>
          <div className="asideLink spaceTop">
            <NavLink  to="/register" className="registerPage">
              <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z"/></svg></span>
              <span>Nouvel utilisateur</span>
            </NavLink >
          </div>
          
          <Sidebar/>
          
        </aside>
        <div className="sousApp">
          <header>
            <div className="textLogo">
              <h1>Le Secret - Lounge Bar & Resto</h1>
              <h3>Stock Management</h3>  
          </div>   
            <div className="headLeSecret">
            <span className="headLeSecretImgs">
                <img src="/logo.jpg" width={50} className="headLeSecretImg" alt="logo"/> 
            </span>
            <span className="headLeSecretInfo">
              <span>Le Secret</span>
              <span className='span2'>Lounge Bar & Resto</span>
              {/* <span>{userProfil.role}</span> */}
            </span>
          </div>
          </header>       
          {/* <Navbar/> */}

          <div className="content">
          <button onClick={toggleAside} className={isShown ? 'buttonMenu active' : 'buttonMenu'}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffff"><path d="M666-440 440-666l226-226 226 226-226 226Zm-546-80v-320h320v320H120Zm400 400v-320h320v320H520Zm-400 0v-320h320v320H120Zm80-480h160v-160H200v160Zm467 48 113-113-113-113-113 113 113 113Zm-67 352h160v-160H600v160Zm-400 0h160v-160H200v160Zm160-400Zm194-65ZM360-360Zm240 0Z"/></svg>
          </button>

            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/productform" element={<ProductForm />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/historique" element={<Historique />} />
              <Route path="/statistique" element={<Statistique />} />
              <Route path="/register" element={<Register />} />

              {/* Route par défaut qui redirige vers le Dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
