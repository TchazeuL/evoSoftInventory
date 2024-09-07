import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import InventoryPage from './pages/inventory/InventoryPage';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import MagasinPage from './pages/magasins/MagasinPage';
import ProduitPage from './pages/produits/ProduitPage';
import ErrorPage from './pages/error/ErrorPage';
import { useTranslation } from 'react-i18next';


function App() {

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const lng = localStorage.getItem("i18nextLng");
    console.log(lng);
    if (lng !== null){
      i18n.changeLanguage(lng);
    }
  }, [i18n])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Navbar title="evoSoftInventory" textColor="white" />
          }>
            <Route path="inventaire" index element={<InventoryPage />}></Route>
            <Route path="" element={<InventoryPage />}></Route>
            <Route path="magasins" element={<MagasinPage title={t("store.title")} />}></Route>
            <Route path="produits" element={<ProduitPage title={t("product.title")} />}></Route>
            <Route path="/*" element={<ErrorPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
