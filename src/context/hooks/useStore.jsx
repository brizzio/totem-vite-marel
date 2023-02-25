import React, {useState, useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import api from '../../api/api'


const useStore = () => {
 
  

  
  const [loading, setLoading] = useState(false)
  const [bags, setBags] = useState(0)
  
  const prices = useRef()

  useEffect(()=>{
   /*  api.get('priceList').then(result => {
      localStorage.setItem('prices', JSON.stringify(result))
      prices.current=result
      setLoading(false)

    }) */
    
    return ()=>console.log('useStore unmount')
  }, [])

//on startup
  console.log('Store on')
  console.log('Store prices', prices.current)

  console.log('Store bags>>', bags)
  
  const startLoading = ()=>setLoading(true)
  const stopLoading = ()=>setLoading(false)
  
  const handleUpdateBags=(numberOfBags)=>setBags(numberOfBags)

    
    
    
  
  return (
    {
      loading,
      prices,
      startLoading,
      stopLoading,
      bags,
      handleUpdateBags
    }
  )
}

export default useStore