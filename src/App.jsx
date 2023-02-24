import { useState } from 'react'
import AppLayout from './layouts/AppLayout';
import MainLayout from './layouts/MainLayout';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";

import StoreProvider from './context/StoreProvider';

import Welcome from './pages/Welcome';
import InputFiscalCode from './pages/flow/InputFiscalCode';
import Home from './pages/Home';



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
       </Routes>  
      </StoreProvider>
    </Router>
    </AppLayout>
    
  )
}

export default App
