import React, {useState, useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import api from '../../api/api'
import { useLocation } from 'react-router-dom';

import { alphaIdGenerator, 
         getLocalStorageKeySync,
         deviceId 
} from "../../utils/functions";




const useStore = () => {
 
  

  
  const [loading, setLoading] = useState(true)
  const [bags, setBags] = useState(0)

  
  const [prices, setPrices] = useState([])
  const [items, setItems] = useState([])
  const [cart, setCart] = useState({})
  const [cartActive, setCartActive] = useState(false)

  

  

  useEffect(()=>{
      api.get('priceList').then(result => {
      localStorage.setItem('prices', JSON.stringify(result))
      setPrices(result)
      setLoading(false)

    }) 
    
    return ()=>console.log('unmount Store prices', prices)
  }, [])


  

 
  
  const loadState = (bool)=>setLoading(bool)

  const setPriceList = (prices)=>setPrices(prices)
  
  const handleUpdateBags=(numberOfBags)=>setBags(numberOfBags)

  console.log((+new Date).toString(36).slice(-6) + "-" + Math.random().toString(36).slice(-3));
  

  const initCart = ()=>{

    let existing = getLocalStorageKeySync('cart')

    if(existing && existing.id){
      setCartActive(true)
      return;
    }
    
    let newCart = {
      id:alphaIdGenerator(),
      store_id:456,
      device_id:deviceId()
    }

    localStorage.setItem('cart', JSON.stringify(newCart))

    setCartActive(true)
  

  }

  const get = (key)=>{
    return getLocalStorageKeySync(key)
  }

  

  
    
    
  
  return (
    {
      loading,
      prices,
      loadState,
      setPriceList,
      bags,
      handleUpdateBags,
      initCart,
      get
      
    }
  )
}

export default useStore