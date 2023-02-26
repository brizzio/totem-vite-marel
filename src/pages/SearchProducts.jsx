import React, { useState, useRef, useEffect } from 'react'
import NumericKb from '../components/common/NumericKb'
import useStore from '../context/hooks/useStore'
import { useNavigate } from 'react-router-dom'

import { addItemToCollectionLS, itemBuilder } from '../utils/functions'

//https://codesandbox.io/s/react-input-autocomplete-knwn3?file=/src/InputAuto.js

const SearchProducts = () => {
    const [code, setCode] = useState('')
    const [found, setFound] = useState({})

    const {prices, addItem} = useStore()

    const ref = useRef()

    const navigate = useNavigate()

    useEffect(()=>{
        console.log('effect search products prices' , prices)
    },[prices])

    const handleCodeChange = (code) =>{
        //console.log('handleCodeChange', code)
        if (code === '') ref.current.clearInput()
        const match = prices.filter(el => (el.upc === code))
        if (match.length == 1) {
            setFound(match[0])
            console.log('found', found)
        }
        setCode(code)

    }

    const tryAgain = () =>{
        console.log('tryAgain', code)

        setFound({})
        setCode('')
    }

    const addToCart = async () =>{
        console.log('addToCart', code)
        let item = await itemBuilder(found,1,1)
        addItemToCollectionLS('items', item)
        setFound({})
        setCode('')
        navigate(-1)
    }


  return (
     

    <div className='flex flex-col w-[40rem] h-full items-center justify-center'>
        
       {Object.keys(found).length>0 
       ? <div className='flex flex-col w-[40rem] h-[40rem] items-center justify-start border border-black m-6 p-6 bg-white rounded-xl'>
        <span className='text-blue font-thin text-xl px-3 w-fit my-3'>Questo é il prodotto che cercavi?</span>
         <img  className="h-[16rem] " src={found.image}/>
         <span className='text-blue font-thin text-3xl px-3 self-center w-fit my-3'>{found.product_name}</span>
         <div className='flex flex-row w-full h-fit items-center justify-between border border-black mt-12 p-6 bg-white rounded-xl'>
            <button className='bg-red-600  py-2 mx-2 rounded-lg shadow-xl text-white font-semibold w-[14rem] text-2xl'
            onClick={tryAgain}>
                NO, PROVIAMO ANCORA
            </button>
            <button className='bg-green-600  py-2 mx-2 rounded-lg shadow-xl text-white font-semibold w-[14rem] text-2xl'
            onClick={addToCart}>
                SI, AGGIUNGI AL CARRELLO
            </button>

         </div>
        </div>
       :
       <>
              <div className='flex flex-col w-full h-[15rem] items-center justify-center '>
                <span className='text-black font-thin text-3xl px-3 text-center w-full my-3'>Entra il codice del prodotto</span>
                <div className='relative flex items-center'>
                    <input className='text-black font-thin text-3xl px-3 py-6 text-center w-[35rem]  bg-white rounded-xl shadow-lg' type="text" value={code} readOnly />
                    <i 
                    onClick={()=>handleCodeChange('')}
                    className="absolute right-3 fa-regular fa-circle-xmark fa-xl text-zinc-600"></i>

                </div>
                

                </div>

                    <NumericKb ref={ref} inputValue={code} change={handleCodeChange}/>
                
        </>

       
       } 

       
    </div>
    
   
  )
}

export default SearchProducts