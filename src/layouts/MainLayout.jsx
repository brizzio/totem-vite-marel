import React , {useState, useEffect} from 'react'
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import LotteryIconSVG from '../components/common/LotteryIconSVG';
import BizerbaLogoSVG from '../components/common/BizerbaLogoSVG';

import Bags from '../components/Bags';

const MainLayout = () => {

    const [location, setLocation] = useState(window.location)
    console.log(location.pathname)

    const navigate = useNavigate()

  return (
    
    
    <div className='relative flex h-full w-full items-center justify-center bg-zinc-100 rounded-xl'>

        {/* BACK BUTTON ABSOLUTE POSITIONED */}
        <div className='absolute left-2'>
            <button onClick={()=>navigate(-1)}>
                <i className="fa-solid fa-circle-chevron-left fa-3x text-teal-600"></i>
            </button>
            
        </div>
        
        
        {/* FOOTER ABSOLUTE POSITIONED */}
        <div className='absolute w-full bottom-0 flex items-center justify-between gap-2'>

            <img  className=" p-3 h-12 z-10" src='/marel-logo.png'/>

            <div className='flex items-center gap-3'>
                <img  className="p-3 h-20" src='/speaker.png'/>

                <img  className="p-3 h-20" src='/handicap.png'/>
            
                <div className='flex items-center justify-center border border-zinc-700 rounded-lg h-fit py-1 px-3 gap-2 shadow-md bg-white '>
                    <LotteryIconSVG />
                    <span className='text-black text-lg pr-2'>LOTTERIA SCONTRINI</span>
                </div>

                <button className='flex items-center text-xl border border-zinc-600 rounded-lg h-fit py-1 px-3 shadow-md bg-white '><i class="fa-solid fa-handshake-angle fa-2x pr-3 "></i>RICHIEDI ASSISTENZA
                </button>

                <Bags/>
            </div>
            

             <BizerbaLogoSVG cn="right-3 pr-3"/>

        
        </div>

        {/* CANCEL BUTTON ABSOLUTE POSITIONED */}

        <button className='absolute right-2 flex items-center'><i className="fa-solid fa-circle-xmark fa-3x text-red-700"></i>
        </button>

        {/* USER BUTTON ABSOLUTE POSITIONED */}

        <button className='absolute top-0 -right-1 flex items-center'><img  className="p-5 h-20" src='/user.png'/>
        </button>
        
        
        
        
       
       
        <div className='flex flex-grow h-full m-16 '>
            <Outlet />
        </div>

        
        


        


    </div>
    

   
  )
}

export default MainLayout