import React , {useState, useEffect} from 'react'
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


import BizerbaLogoSVG from '../components/common/BizerbaLogoSVG';



const SearchLayout = () => {

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
        <div className='absolute w-full bottom-3 px-3 flex items-center justify-between  '>
  
            <img  className=" w-28 " src='/marel-logo.png'/>
            
            <BizerbaLogoSVG/>

        </div>

        {/* CANCEL BUTTON ABSOLUTE POSITIONED */}

        <button className='absolute right-2 flex items-center'><i className="fa-solid fa-circle-xmark fa-3x text-red-700"></i>
        </button>

               
        
        
       
       
        <div className='flex flex-grow h-full items-center justify-center '
        >
            <Outlet />
        </div>

        
        


        


    </div>
    

   
  )
}

export default SearchLayout