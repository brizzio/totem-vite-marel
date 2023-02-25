import { useState } from 'react'
import AppLayout from './layouts/AppLayout';
import MainLayout from './layouts/MainLayout';
import SearchLayout from './layouts/SearchLayout';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";

import StoreProvider from './context/StoreProvider';

import Welcome from './pages/Welcome';
import InputFiscalCode from './pages/flow/InputFiscalCode';
import Home from './pages/Home';
import SearchProducts from './pages/SearchProducts';



function App() {
  

  return (

    <AppLayout>

    <Router>
      <StoreProvider>
        <Routes>
          <Route index element={<Welcome/>} />
          <Route path="/flow-1" element={<InputFiscalCode/>} />
          <Route element={<MainLayout/>}>
            <Route path="/home" element={<Home/>} />
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
