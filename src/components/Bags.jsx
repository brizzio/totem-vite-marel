import React , {useState, useEffect}from 'react'
import useStore from '../context/hooks/useStore';

const Bags = () => {

    const {bags, handleUpdateBags} = useStore()
    
    const [count, setCount] = useState(bags)

    useEffect(()=>{
        handleUpdateBags(count)
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