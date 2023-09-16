import React, { useState, 
                useRef, 
                useEffect, 
                useMemo, 
                useReducer} from 'react'

import useStore from './useStore'

import { addItemToCollectionLS, itemBuilder, readLocalStorage, formatDate } from '../../utils/functions'
import usePrices from './usePrices'
import useSession from './useSession'



//https://codesandbox.io/s/react-input-autocomplete-knwn3?file=/src/InputAuto.js


const useCart = () => {
    //const [code, setCode] = useState('')
    //            const [found, setFound] = useState({})
    
    const [cart , setCart] = useState({})

    const [prices] = usePrices()
    const session = useSession().session.data
    const updateSessionCartList = useSession().updateCartList

    console.log('useCart prices', prices)
    console.log('useCart session', session)

    
      
      const currentCartModel = {
        active:false,
        cart_id:'',
        date:'',
        created_at:'',
        closed_at:'',
        count:0,
        total:0,
        fiscal_code:'',
        items:[]
    }
    
    
    const total = (arr, field) => arr.reduce((a,e)=>{
        let val = e.deleted?0:e[field]
        return a + val
      },0).toFixed(2)
    
    


      const currentCartReducer = (state, action) => {

    
        console.log('currentCart reducer' , state, action)
        
        let memo 
        
        readLocalStorage('currentCart').then(res=>memo=res)
       
        console.log('memo' , memo)
        
        switch (action.type) {
    
        
          case 'NEW':
            console.log('create new cart')
    
            let date =new Date()
            let utcTime = date.getTime() + date.getTimezoneOffset()
            let createdAt = new Date(utcTime).toISOString()
            let formattedDate = formatDate(new Date(utcTime))
            let id = new Date(utcTime).toISOString().replace(/\D/g, '')
    
            let newCart = {
                cart_id:id,
                date:formattedDate,
                created_at:createdAt,
                closed_at:'',
                items:[],
                total:0,
                count:0
            }
    
            localStorage.setItem('currentCart', JSON.stringify(newCart))
    
            
            return {
                ...state,
                ...newCart,
                ...action.propsObject
            }

            case 'ADD_FISCAL_CODE':
            console.log('add fiscal code')
    
    
            let currentCartWithFiscalCode = {
               ...state,
                fiscal_code:action.code
            }
    
            localStorage.setItem('currentCart', JSON.stringify(currentCartWithFiscalCode))
    
            
            return currentCartWithFiscalCode
    
    
            case 'INSERT_ITEM':
                console.log('currentCart insert item', action.item)
    
                const newList = [...state.items, action.item]
                const updatedState = {
                    ...state,
                    items: newList,
                    count: newList.length,
                    total: total(newList, 'calculated_price')
                }
    
                localStorage.setItem('currentCart', JSON.stringify(updatedState))
                           
                return updatedState
    
    
            case 'REMOVE_ITEM':
                    var item = state.items[action.key]
                    console.log('to delete', item)
    
                    const onDeleteList = state.items.map((el,i)=>
                        i==action.key
                        ?{...el, deleted:true}
                        :el
                    )
                    const removedState = {
                        ...state,
                        //list: state.list.filter((item) => item.entry_id !== action.id),
                        items:onDeleteList,
                        total: total(onDeleteList, 'calculated_price')
                    }
    
                localStorage.setItem('currentCart', JSON.stringify(removedState))
    
            return removedState;

            


            case 'DELETE_CART':
    
            console.log('remove currentCart ')
            localStorage.removeItem('currentCart')
        
            return currentCartModel; 
    
          
          default:
            throw new Error();
        }
    
        
      };  


    
    const [currentCart, dispatchCurrentCart] = useReducer(currentCartReducer, currentCartModel)

    console.log('currentCart', currentCart)

    
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

            item.entry_id = new Date(utcTime).toISOString().replace(/\D/g, '')
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

    const createCart = (obj)=>{
        console.log('create cart')
        dispatchCurrentCart({ type: 'NEW' , propsObject:obj})
        
    }

    const insertItem = async (upc)=>{
        console.log('insert new item')
        const newItem = await addItem(upc)
        if (newItem) dispatchCurrentCart({type:'INSERT_ITEM', item:newItem})
    }


    const removeItem = (key)=>{
        dispatchCurrentCart({ type: 'REMOVE_ITEM', key})
    }


    const deleteCart = (msg)=>{
        console.log('delete cart ' + msg)
        dispatchCurrentCart({type:'DELETE_CART'})
    }

    const addFiscalCode = (code)=>{
        console.log('add fiscal code to current cart: ' + code)
        dispatchCurrentCart({type:'ADD_FISCAL_CODE', code})
    }

    const closeCart = ()=>{
        console.log('close current cart')
        dispatchCurrentCart({type:'CLOSE_CART'})
    }

  

  return (
     

    {
        currentCart,
        addItem,
        insertItem,
        removeItem,
        createCart,
        deleteCart,
        addFiscalCode,
       
    }
   
  )
}

export default useCart