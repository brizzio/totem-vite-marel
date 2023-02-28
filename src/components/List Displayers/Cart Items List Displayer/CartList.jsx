import React , { useState , useEffect} from 'react'
import { getLocalStorageCollectionDataByKey, removeItemFromCollectionLSById } from '../../../utils/functions'
import CartListItem from './CartListItem'

const CartList = ({
    localStorageKey, 
    totalizer, 
    back, 
    confirm
}) => {

    
    const [list, setList] = useState([])
    const [filtered, setFiltered] = useState([])
    const [reload, setReload] = useState(0)

    useEffect(()=>{

        getLocalStorageCollectionDataByKey(localStorageKey).then(res=>{
            console.log('CartList effect local storage items read', res)
            setList(res)
        })
              
          
        return ()=>console.log('CartList effect unmount items changed', list)
      },[])

    useEffect(()=>{
        let t = list.reduce((a, el)=>{  
            console.log('reduce', a, el.calculated_price)
            return a + Number(el.calculated_price)
        },0)
        totalizer(t)

        return () => {
            // Remove the handler when the component unmounts
            console.log('effect total unmount', t)
        };
    },[list])


    const filter = (filterObj) =>{
        const {key, value} = filterObj
        let selection = []
        prices.filter(el => {
            if(el[key]==value) selection.push(el)
        })
        console.log('selection',selection)
        
        setFiltered(selection)
    }

    const removeItem = async (entryId) =>{
        console.log('removeItem entryId', entryId)
        await removeItemFromCollectionLSById(entryId)
        getLocalStorageCollectionDataByKey(localStorageKey).then(res=>{
            console.log('removeItem local storage items read', res)
            setList(res)
        })

    }

   
    return(

    <div className='flex flex-col h-full w-full p-4 gap-5 '>

        <div className='flex items-center justify-between w-full bg-sky-700 py-3 rounded-tl-2xl rounded-tr-2xl px-2'>
            <span className='text-white text-2xl pl-3'>La tua spesa</span> 

            <i className="flex gap-2 fa-solid fa-cart-shopping fa-xl text-white mx-2">{list.length}</i>

        </div>    
        
        <div className='flex flex-col h-[25rem] w-full p-1 gap-2 overflow-y-auto [&::-webkit-scrollbar]:hidden'>
            
            {list.map((el, i)=><CartListItem 
                            key={i} 
                            item={el} 
                            trashAction={removeItem}/>)}     

        </div>
 
    </div>

    )
}


export default CartList