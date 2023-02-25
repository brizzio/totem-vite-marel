import React, {useState, useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import api from '../../api/api'


const useStore = () => {
 
  

  
  const [loading, setLoading] = useState(true)
  const [bags, setBags] = useState(0)
  
  const [prices, setPrices] = useState([])
  const [items, setItems] = useState([])

  useEffect(()=>{
      api.get('priceList').then(result => {
      //localStorage.setItem('prices', JSON.stringify(result))
      setPrices(result)
      setLoading(false)

    }) 
    
    return ()=>console.log('useStore unmount')
  }, [])

  useEffect(()=>{

    console.log('effect items changed', items)


  
  return ()=>console.log('unmount items changed', items)
}, [items])

//on startup
  console.log('Store on')
  //console.log('Store prices', prices)

  console.log('Store bags>>', bags)
  
  const loadState = (bool)=>setLoading(bool)
  const setPriceList = (prices)=>setPrices(prices)
  
  const handleUpdateBags=(numberOfBags)=>setBags(numberOfBags)

  
    
    
  
  return (
    {
      loading,
      prices,
      loadState,
      setPriceList,
      bags,
      handleUpdateBags,
      
    }
  )
}

export default useStore