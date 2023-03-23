import React, { useState, useRef, useEffect, useMemo } from 'react'

import useStore from './useStore'

import { addItemToCollectionLS, itemBuilder, getLocalStorageCollectionDataByKey } from '../../utils/functions'
import usePrices from './usePrices'


//https://codesandbox.io/s/react-input-autocomplete-knwn3?file=/src/InputAuto.js

const useCart = () => {
    //const [code, setCode] = useState('')
    //            const [found, setFound] = useState({})
    
    const [cart , setCart] = useState({})

    const [prices] = usePrices()

    console.log('useCart prices', prices)

    //get cart data
    useEffect(()=>{

        getLocalStorageCollectionDataByKey('cart').then(res=>{
            console.log('SearchProducts effect local storage cart', res)
            setCart(res)
        })
          
        
      }, [])

    
    const searchCode = (code) =>{

        console.log('code prices', prices)
        const match = prices.filter(el => (el.upc == code))
        console.log('match', match)
        if (match.length == 1) {
            console.log('match', match[0])
            return match[0]
        }

    }

    
    const addItem = async (code) =>{

        console.log('call useCart', code)
        let date =new Date()
        let utcTime = date.getTime() + date.getTimezoneOffset()
        
        try {

            const item = await searchCode(code)
            console.log('addToCart', item, cart)

            item.entry_id = Math.random()
            item.deleted = false
            item.date_added= date
            item.time_added= utcTime
            item.order='1/1'
            item.quantity=1
            //console.log('mountItem', item)
            item.cart_id=cart.id
            item.device_id=cart.device_id
            item.store_id=cart.store_id
            console.log('cartItem', item)
            return item
        
        } catch (error) {
            console.log('addItem Cart error', error)
        }

        
    }

    const createCart = ()=>{
        console.log('create cart')
    }


    const deleteCart = (msg)=>{
        console.log('delete cart ' + msg)
    }

  

  return (
     

    {

        addItem,
        createCart,
        deleteCart

    }
   
  )
}

export default useCart