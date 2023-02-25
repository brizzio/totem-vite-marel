import React, { useState, useRef } from 'react'
import NumericKb from '../components/common/NumericKb'

const SearchProducts = () => {
    const [code, setCode] = useState('')

    const ref = useRef()

    const handleCodeChange = (code) =>{
        console.log('handleCodeChange', code)
        if (code === '') ref.current.clearInput()
        setCode(code)
    }

  return (
     

    <div className='flex flex-col w-[40rem] h-full items-center justify-center'>

       <div className='flex flex-col w-full h-[15rem] items-center justify-center '>
       <span className='text-black font-thin text-3xl px-3 text-center w-full my-3'>Entra il codice del prodotto</span>
       <div className='relative flex items-center'>
        <input className='text-black font-thin text-3xl px-3 py-6 text-center w-[35rem]  bg-white rounded-xl shadow-lg' type="text" value={code} readOnly />
        <i 
        onClick={()=>handleCodeChange('')}
        className="absolute right-3 fa-regular fa-circle-xmark fa-xl text-zinc-600"></i>

       </div>
       

       </div>

        <NumericKb ref={ref} inputValue={code} change={handleCodeChange}/>
    </div>
    
   
  )
}

export default SearchProducts