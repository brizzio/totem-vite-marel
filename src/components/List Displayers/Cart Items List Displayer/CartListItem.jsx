import React from 'react'

const CartListItem = (props)=>{

    let item = props.item
    
    return(
        <div className='flex flex-row h-[2rem] w-full items-center justify-between border border-2 rounded-lg '>
            <div className='flex flex-row w-fit gap-6 items-center text-lg'>
                {/* <img className='h-[4rem]' src={item.image} alt="product image"/> */}
                <div className='w-fit '>{item.product_name}</div>
                
            </div>
            <div className='flex items-center justify-around w-[9rem]'>
                <div className='h-full w-fit  font-thin '>( {item.order} )</div>
                <div className='h-full w-fit  font-thin'>
                    <span className='px-1'>{item.currency}</span> 
                    <span className='font-semibold'>{item.calculated_price.toFixed(2) }</span> 
                </div>
                 <i onClick={()=>props.trashAction(item.entry_id)} className="fa-regular fa-trash-can fa-lg pr-3 text-red-400"></i>
            </div>
           
        </div>
        
        
    )
}

export default CartListItem