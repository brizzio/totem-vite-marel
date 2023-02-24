import React, {useState, useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";


const useStore = () => {
 
  

  
  const [loading, setLoading] = useState(false)
  const [bags, setBags] = useState(0)

//on startup
  console.log('Store on')

  console.log('Store bags>>', bags)
  
  const startLoading = ()=>setLoading(true)
  const stopLoading = ()=>setLoading(false)
  
  const handleUpdateBags=(numberOfBags)=>setBags(numberOfBags)

    
    
    
  
  return (
    {
      loading,
      startLoading,
      stopLoading,
      bags,
      handleUpdateBags
    }
  )
}

export default useStore