import React , {useState, useEffect}from 'react'
import useStore from '../context/hooks/useStore';
import { upsertCollectionLS , 
        itemBuilder, 
        removeItemFromCollectionLSById, 
        findBagItemInLSItems} from '../utils/functions';
import { useNavigate } from 'react-router-dom';

const Bags = () => {

    const {bags, handleUpdateBags, prices} = useStore()
    
    const [count, setCount] = useState(0)

    const navigate = useNavigate()
    
    
    useEffect(()=>{
        handleUpdateBags(count)
        if(count > 0 ) processBagUpdate()
        navigate('/home')
        return ()=>console.log('Bags unmount count:', count)
    },[count])

    

    function increment() {
        //setCount(prevCount => prevCount+=1);
        setCount(function (prevCount) {
          return (prevCount += 1);
        });
        
      }
  
      function decrement() {
        setCount(function (prevCount) {
          if (prevCount > 0) {
            return (prevCount -= 1); 
          } else {
            return (prevCount = 0);
          }
        });
        
      }

      function processBagUpdate(){
        // Get the Array item which matchs the id "2"
        if(count == 0 ){
          let bag = findBagItemInLSItems()
          if (index) removeItemFromCollectionLSById(bag.entry_id)

        }
        var info = prices.find(item => item.id === 145);
        let item = itemBuilder(info,1,1)
        item.quantity = count
        item.calculated_price= info.calculated_price * count
        item.order=count
        console.log('process bag' , item)
        upsertCollectionLS('items', item)

      }

  return (
    <div className='flex items-center text-xl  bg-white  rounded-lg h-fit py-1 px-1 shadow-md '>
         <button onClick={decrement}>
            <i className="fa-solid fa-minus text-left w-16 pl-2"></i>
        </button>
        <img  className=" h-10" src='/bag.png'/>
        <span className={`text-4xl font-thin pl-3`}>{count}</span>
        <button onClick={increment}>
            <i className="fa-solid fa-plus text-right w-16 pr-2"></i>
        </button>
    </div>
  )
}

export default Bags