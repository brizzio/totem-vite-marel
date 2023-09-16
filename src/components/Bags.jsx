import React , {useState, useEffect}from 'react'
import useStore from '../context/hooks/useStore';
import { upsertCollectionLS , 
        itemBuilder, 
        removeItemFromCollectionLSById, 
        findBagItemInLSItems} from '../utils/functions';



const Bags = ({counter}) => {

    const {bags, handleUpdateBags, prices} = useStore()
    
    const [count, setCount] = useState(counter)

    

   
    
    useEffect(()=>{
      setCount(counter)
    
      return ()=>console.log('Bags unmount counter:', counter)
    },[counter])

    
    useEffect(()=>{
        handleUpdateBags(count)
        processBagUpdate()
        console.log('location:', location)
        //navigate(location.pathname)
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
            return 0;
          }
        });
        
      }

      async function processBagUpdate (){
        // Get the Array item which matchs the id "2"
        
        let bagItem = await findBagItemInLSItems()
        console.log('bagItem', bagItem)

        console.log('count == 0', count , 0 , count == 0)
        console.log('!bagItem', !bagItem)
        console.log('!!bagItem', !!bagItem)

        console.log('count == 0 && !!bagItem ', count == 0 && !!bagItem )

        if(count == 0 && !bagItem) return;

        if(count == 0 && !!bagItem ){
          console.log('count is zero', count , 0 , count == 0)
          findBagItemInLSItems().then(res=>{
              if (res) removeItemFromCollectionLSById(res.entry_id)
          })
          console.log('processBagUpdate before return', count)
          return;
        }
        if(count > 0 ){
        var info = prices.find(item => item.product_id === 145);
        let item = itemBuilder(info,1,1)
        item.quantity = count
        item.calculated_price= info.regular_price * count
        item.order=count
        console.log('process bag' , item)
        upsertCollectionLS('items', item)
        }

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