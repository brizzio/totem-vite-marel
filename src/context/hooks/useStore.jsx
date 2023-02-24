import React, {useState, useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";


const useStore = () => {
 
  

  
  const [loading, setLoading] = useState(true)

//on startup
  console.log('Store on')
  
  const startLoading = ()=>setLoading(true)
  const stopLoading = ()=>setLoading(false)
  
        

    
    
    
  
  return (
    {
      loading,
      startLoading,
      stopLoading
    }
  )
}

export default useStore