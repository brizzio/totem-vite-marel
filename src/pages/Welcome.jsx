import React from 'react'
import IdiomSelector from '../components/common/IdiomSelector'
import BizerbaLogoSVG from '../components/common/BizerbaLogoSVG'
import { useNavigate } from 'react-router-dom'
import useStore from '../context/hooks/useStore'

const Welcome = () => {

    const navigate = useNavigate()

    const {initCart} = useStore()

    const handleInit = () =>{
      initCart()
      navigate('/flow-1')
    }
    

  return (
    <div className='relative flex flex-col h-full w-full items-center justify-center bg-teal-300 rounded-xl'
    style={{background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)"}}>
        
        <div className=" px-6">
        <h2 className="text-4xl font-bold mb-2 text-white text-center">
          Clicca per iniziare il cassa!
        </h2>
        <h3 className="text-2xl mb-8 text-gray-200">
          Scannerizza i prodotti del tuo carrello e poi paga direttamente qui, senza perdere tempo!
        </h3>

       
      </div>

      <button className="bg-orange-500  text-2xl rounded-full py-4 px-20 shadow-lg uppercase tracking-wider text-white"
      onClick={handleInit}>
          INIZIO
        </button>
        <IdiomSelector cn="absolute top-0 right-0 pt-3"/>
        <img  className=" absolute bottom-1 left-0 p-2 w-28 " src='/marel-logo.png'/>
        <BizerbaLogoSVG cn="absolute bottom-0 right-0 pr-3"/> 
    </div>
        
        
        
    
  )
}

export default Welcome