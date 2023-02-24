import React, { useState } from 'react'

import BizerbaLogoSVG from '../../components/common/BizerbaLogoSVG'
import { useNavigate } from 'react-router-dom'

const InputFiscalCode = () => {

    const [code, setCode] = useState('')

    const navigate = useNavigate()

    const handleCodeChange=(e)=>{
        setCode(e.target.value)
    }



    return (
      <div className='relative flex flex-col h-full w-full items-center justify-center bg-teal-300 rounded-xl'
      style={{background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)"}}>
          
          <div className=" px-6">
          <h2 className="text-4xl font-bold mb-2 text-white text-center">
            CODICE FISCALE
          </h2>
          <h3 className="text-2xl mb-8 text-gray-200">
            Vuoi il tuo codice fiscale stampato nello scontrino?
          </h3>
          <input className='w-[28rem] h-[4rem] rounded-lg'
                 type='text' 
                 value={code} 
                 onChange={(event)=>handleCodeChange(event)}/>
  
         
        </div>
  
        <button className="bg-orange-500  text-2xl rounded-full py-4 px-20 shadow-lg uppercase tracking-wider text-white"
        onClick={()=>navigate('/home')}>
            NO, GRAZIE
          </button>
        
          <BizerbaLogoSVG cn="absolute bottom-0 right-0 pr-3"/> 
      </div>
          
          
          
      
    )
}

export default InputFiscalCode