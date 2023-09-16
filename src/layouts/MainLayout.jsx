import React , {useState, useEffect} from 'react'
import { Outlet } from 'react-router-dom';

import useStore from '../context/hooks/useStore';

import LotteryIconSVG from '../components/common/LotteryIconSVG';
import BizerbaLogoSVG from '../components/common/BizerbaLogoSVG';
import useCart from '../context/hooks/useCart';
import Bags from '../components/Bags';

const MainLayout = ({children}) => {

    const [location, setLocation] = useState(window.location)
    console.log(location.pathname)

    const {bags} = useStore()

    

    const { deleteCart } = useCart()

    const cancel = () => {
        console.log('cancel')
        var m = 'message'
        deleteCart(m)
    }

  return (
    
    
    <div className='relative flex h-full w-full items-center justify-center bg-zinc-100 rounded-xl'>

        {/* BACK BUTTON ABSOLUTE POSITIONED */}
        <div className='absolute left-2'>
            <button onClick={()=>console.log('/')}>
                <i className="fa-solid fa-circle-chevron-left fa-3x text-teal-600"></i>
            </button>
            
        </div>
        
        
        {/* FOOTER ABSOLUTE POSITIONED */}
        <div className='absolute w-full bottom-0 flex items-center justify-between  '>

            

            <div className='flex gap-8 items-center'>

               <img  className=" w-28 " src='/marel-logo.png'/>

                <img  className="p-2 h-20 " src='/speaker.png'/>

                <img  className="p-2 h-20 " src='/handicap.png'/>
            
                {/* <div className='flex items-center justify-center border rounded-lg h-fit py-1 px-3 gap-2 shadow-md bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg '>
                    <LotteryIconSVG />
                    <span className='text-black text-lg pr-2'>LOTTERIA SCONTRINI</span>
                </div> */}

                <button className='flex items-center text-xl  rounded-lg h-fit py-1 px-3 shadow-md bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg '><i className="fa-solid fa-handshake-angle fa-2x pr-3 "></i>RICHIEDI ASSISTENZA
                </button>

                <Bags counter={bags}/>
            </div>
            

             <BizerbaLogoSVG/>

        
        </div>

        {/* CANCEL BUTTON ABSOLUTE POSITIONED */}

        <button className='absolute right-2 flex items-center' onClick={cancel}><i className="fa-solid fa-circle-xmark fa-3x text-red-700"></i>
        </button>

        {/* USER BUTTON ABSOLUTE POSITIONED */}

        <button className='absolute top-0 -right-1 flex items-center' ><img  className="p-5 h-20" src='/user.png'/>
        </button>
        
        
        
        
       
       
        <div className='flex flex-grow h-full m-16 '
        >
            {children}
        </div>

        
        


        


    </div>
    

   
  )
}

export default MainLayout