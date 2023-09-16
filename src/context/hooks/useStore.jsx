import React, {useState, useRef, useEffect} from "react";

import api from '../../api/api'

//import usePrices from "./usePrices";

import { alphaIdGenerator, 
         getLocalStorageKeySync,
         deviceId,
         idFromMillis
} from "../../utils/functions";




const useStore = () => {
 
  

  
  const [loading, setLoading] = useState(false)
  const [bags, setBags] = useState(0)

  
  const [prices, setPrices] = useState([])
  const [items, setItems] = useState([])
  const [cart, setCart] = useState({})
  const [cartActive, setCartActive] = useState(false)

  const [fiscalCode, setFiscalCode] =useState({})

  //const {prices} = usePrices()


 
  

 /*  useEffect(()=>{
      api.get('priceList').then(result => {
      localStorage.setItem('prices', JSON.stringify(result))
      setPrices(result)
      setLoading(false)

    }) 
    
    return ()=>console.log('unmount Store prices')
  }, [])

 */
 

  
  
  const loadState = (bool)=>setLoading(bool)

  
  const handleUpdateBags=(numberOfBags)=>setBags(numberOfBags)

  const updateFiscalCode = (code)=>setFiscalCode(code)


  const initCart = ()=>{

    let existing = getLocalStorageKeySync('cart')

    if(existing && existing.id){
      setCartActive(true)
      return;
    }
    
    let newCart = {
      id:alphaIdGenerator(),
      store_id:456,
      device_id:deviceId(),
      date_open:new Date().toISOString()
    }


    //localStorage.setItem('cart', JSON.stringify(newCart))

    setCart(newCart)

    setCartActive(true)
  

  }

  const addItem = (item)=>{

    let date =new Date()
    let utcTime = date.getTime() + date.getTimezoneOffset()

    item.entry_id = idFromMillis()
    item.deleted = false
    item.date_added=[
      date.getFullYear(),
      (date.getMonth() + 1).toString().padStart(2, '0'),
      date.getDate().toString().padStart(2, '0'),
    ].join('-'),
    item.time_added= utcTime
    item.order=`1/1`
    item.quantity=1
    console.log('new item',item)
    let newlist = [...items, item]
    console.log('newlist', newlist)
    setItems(newlist)
    
    

  }

  const get = (key)=>{
    return getLocalStorageKeySync(key)
  }

   
  
  return (
    {
      loading,
      prices,
      items,
      addItem,
      loadState,
     
      bags,
      handleUpdateBags,
      initCart,
      get,
      updateFiscalCode, 
      fiscalCode
      
    }
  )
}

export default useStore