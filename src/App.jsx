import { useRef, useState, useEffect } from 'react'
import AppLayout from './layouts/AppLayout';
import MainLayout from './layouts/MainLayout';
import SearchLayout from './layouts/SearchLayout';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";

import StoreProvider from './context/StoreProvider';

//pages
import Welcome from './pages/Welcome';
import InputFiscalCode from './pages/flow/InputFiscalCode';
import Home from './pages/Home';
import SearchProducts from './pages/SearchProducts';
import Payment from './pages/Payment';

//utils
import api from './api/api';
import useStore from './context/hooks/useStore';

function App() {

  const {bags} = useStore()

  

  return (

    <AppLayout>

    <Router>
      <StoreProvider>
        <Routes>
          <Route index element={<Welcome/>} />
          <Route path="/flow-1" element={<InputFiscalCode/>} />
          <Route element={<MainLayout/>}>
            <Route path="/home" element={<Home bags={bags}/>} />
            <Route path="/payment" element={<Payment />} />
          </Route> 
          <Route element={<SearchLayout/>}>
            <Route path="/search" element={<SearchProducts/>} />
          </Route> 
       </Routes>  
      </StoreProvider>
    </Router>
    </AppLayout>
    
  )
}

export default App
