import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import InventoryPage from './pages/inventory/InventoryPage';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import MagasinPage from './pages/magasins/MagasinPage';
import ProduitPage from './pages/produits/ProduitPage';
import ErrorPage from './pages/error/ErrorPage';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Navbar title="evoSoftInventory" textColor="white" />
          }>
            <Route path="inventaire" index element={<InventoryPage />}></Route>
            <Route path="" element={<InventoryPage />}></Route>
            <Route path="magasins" element={<MagasinPage title="Table des magasins" />}></Route>
            <Route path="produits" element={<ProduitPage title="Table des produits" />}></Route>
            <Route path="/*" element={<ErrorPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
