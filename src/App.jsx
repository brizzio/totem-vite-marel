import { useRef, useState, useEffect } from 'react'
import AppLayout from './layouts/AppLayout';
import MainLayout from './layouts/MainLayout';


import StoreProvider from './context/StoreProvider';

//pages
//import Welcome from './pages/Welcome';
//import InputFiscalCode from './pages/flow/InputFiscalCode';
import Home from './pages/Home';
//import SearchProducts from './pages/SearchProducts';
//import Payment from './pages/Payment';

//utils
import api from './api/api';
import useStore from './context/hooks/useStore';
import Greetings from './pages/flow/Greetings';

function App() {

  const {bags} = useStore()

  

  return (

   

      <StoreProvider>
         <AppLayout>
          <MainLayout>
            <Home bags={bags}/>
          </MainLayout>
         </AppLayout>
      </StoreProvider>
  
   
  )
}

export default App
