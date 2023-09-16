import React, { useRef, useState } from 'react'

import BizerbaLogoSVG from '../../components/common/BizerbaLogoSVG'

import NumericKb from '../../components/common/NumericKb'


const InputFiscalCode = () => {

    const [code, setCode] = useState('')

    const ref=useRef()

  

   

    const handleCodeChange = (code) =>{
        console.log('handleCodeChange', code)
        if (code === '') ref.current.clearInput()
        setCode(code)
    }

    const handleEnter = (code) =>{
      console.log('handle Enter', code)

      if (code !== '') {
        
        //navigate('/home', { state: { code } })

      }
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

          <div className='relative flex items-center'>
            <input className='text-black font-thin text-3xl m-3 py-4 text-center w-[35rem]  bg-white rounded-xl shadow-lg' type="text" value={code} readOnly />
            <i 
            onClick={()=>handleCodeChange('')}
            className="absolute right-5 fa-regular fa-circle-xmark fa-xl text-zinc-600"></i>

          </div>
  
         <NumericKb ref={ref} inputValue={code} change={handleCodeChange} onEnter={handleEnter}/>
        </div>
  
        <button className="bg-orange-500  text-2xl rounded-full py-4 px-20 shadow-lg uppercase tracking-wider text-white"
        onClick={()=>console.log('/home')}>
            NO, GRAZIE
          </button>

          
          <img  className=" absolute bottom-1 left-0 p-2 w-28 " src='/marel-logo.png'/>
          <BizerbaLogoSVG cn="absolute bottom-0 right-0 pr-3"/> 
      </div>
          
          
          
      
    )
}

export default InputFiscalCode