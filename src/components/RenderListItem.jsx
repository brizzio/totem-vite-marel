import React , {useState, useEffect} from 'react'

const RenderListItem = (props) => {
    //console.log('list item: ', item)

    //console.log('index', index.toString())

    /* const item = {
        id: 1,
        price_date: "Fri Feb 24 2023 15:21:21 GMT-0300 (Horário Padrão de Brasília)",
        internal_code: "101101",
        upc: "8000990136401",
        brand: "nazionale",
        product_line: "nazionale",
        product_name: "CONTROFILETTO DI SCOTTONA NAZIONALE",
        manufacturer: null,
        department: null,
        category_id: 1,
        category: "carne",
        regular_price: 13.19,
        calculatedPrice:13.19,
        promo_type: "0",
        weight: 350,
        weight_unit: "g",
        currency: "€",
        nth_unit: null,
        references_id: null,
        image: null,
        order:'1/1',
      } */

    const { item, onTrashClick}  = props
    

    var total = item.calculated_price?parseFloat(item.calculated_price):0
    var priceType = item.promo_type>0?"P":"R"

   
    

    return (
    <div className='flex flex-row w-full px-3 py-0.5 items-center justify-between text-xs text-gray-900 border-b border-gray-400'>
        <div className='flex flex-row items-center'>
            <span className="px-2">{item.upc}</span> 
            <span className="px-2">{item.product_name}</span>       
            <span className="pl-2">{item.weight}</span>
            <span>{item.weight_unit}</span>          
        </div>  
        <div className="py-1 px-1">
            <div className="flex flex-row py-1 px-1 items-center gap-1">
                <span>
                {`( ${item.order} ) `}    
                </span>
                <span>{item.currency}</span>
                <span>{total.toFixed(2)}</span>
                <span className="px-2">{priceType}</span> 
                <button id={item.entry_id} 
                        onClick={onTrashClick}>
                    <i className="fa-regular fa-trash-can"></i>
                </button>
            </div>          
        </div>
    </div>
    )
}

export default RenderListItem