import React , { useState , useEffect} from 'react'
import { readLocalStorage } from '../../../utils/functions'

const CartList = ({
    list
}) => {

    
    
    

    const cartListItem = (item, index)=>{

        
        return(
            <div key={index} className='flex flex-row h-[2rem] w-full items-center justify-between border border-2 rounded-lg '>
                <div className='flex flex-row w-fit gap-6 items-center text-lg'>
                    {/* <img className='h-[4rem]' src={item.image} alt="product image"/> */}
                    <div className='w-fit '>{item.product_name}</div>
                    
                </div>
                <div className='flex items-center justify-around w-[9rem]'>
                    <div className='h-full w-fit  font-thin '>( {item.order} )</div>
                    <div className='h-full w-fit  font-thin'>
                        <span className='px-1'>{item.currency}</span> 
                        <span className='font-semibold'>{item.calculated_price}</span> 
                    </div>
                     
                </div>
               
            </div>
            
            
        )
    }
    

   
    return(

    <div className='flex flex-col h-full w-full p-4 gap-5 '>

        <div className='flex items-center justify-between w-full bg-sky-700 py-3 rounded-tl-2xl rounded-tr-2xl px-2'>
            <span className='text-white text-2xl pl-3'>La tua spesa</span> 

            <i className="flex gap-2 fa-solid fa-cart-shopping fa-xl text-white mx-2">{list.length}</i>

        </div>    
        
        <div className='flex flex-col h-[25rem] w-full p-1 gap-2 overflow-y-auto [&::-webkit-scrollbar]:hidden'>
            
            {list.length && list.map((el, i)=> cartListItem(el, i))}     

        </div>
 
    </div>

    )
}


export default CartList