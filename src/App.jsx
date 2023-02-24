import { useState } from 'react'
import AppLayout from './layouts/AppLayout';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import StoreProvider from './context/StoreProvider';

function App() {
  

  return (

    <AppLayout>

    <Router>
      <StoreProvider>
        <Routes>
          <Route index element={<Welcome/>} />
          <Route path="/home" element={<Home/>} />
        </Routes>  
      </StoreProvider>
    </Router>
    </AppLayout>
    
  )
}

export default App
