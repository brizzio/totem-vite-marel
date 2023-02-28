import React, { useRef, useState, useEffect } from 'react'

import BizerbaLogoSVG from '../../components/common/BizerbaLogoSVG'
import { useNavigate } from 'react-router-dom'
import NumericKb from '../../components/common/NumericKb'

const Greetings = () => {

    const [grade, setGrade] = useState(0)


    const navigate = useNavigate()


    useEffect(()=>{

        
      console.log('Greetings effect')
      

        
    
  return ()=>{
      console.log('Greetings effect unmount navigate')
      setTimeout(() => {
          navigate('/')
       }, 10000)
  }
},[])

    const handleGradeChange = (grade) =>{
        console.log('GradeChange', grade)
        setGrade(grade)
    }




    return (
      <div className='relative flex flex-col h-full w-full items-center justify-center bg-teal-300 rounded-xl gap-9'
      style={{background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)"}}>
          
          <span className='flex items-center justify-start mt-4 text-white font-thin text-4xl px-6 py-3  w-fit  '>Grazie per essere venuto!</span>


        <div className=" flex flex-col h-fit items-center border-zinc-600  w-4/6 gap-3 ">

            <div className=" grid grid-flow-row-dense grid-cols-3 grid-rows-1 gap-3 w-full p-3 mt-2">


              
              <div className=" flex flex-col items-center justify-center h-[8rem]  bg-red-700 shadow-xl rounded-2xl  w-full gap-2" 
            onClick={()=>handleGradeChange(1)}>
                <i className={`fa-regular fa-face-frown fa-3x text-white`}></i>
            </div>
              <div className=" flex flex-col items-center justify-center h-[8rem]  bg-yellow-200 shadow-xl rounded-2xl  w-full gap-2" 
                onClick={()=>handleGradeChange(2)}>
                  <i className={`fa-regular fa-face-meh fa-3x text-zinc-400`}></i>
              </div>
              <div className=" flex flex-col items-center justify-center h-[8rem]  bg-green-700 shadow-xl rounded-2xl  w-full gap-2" 
              onClick={()=>handleGradeChange(3)}>
                  <i className={`fa-regular fa-face-smile fa-3x text-white`}></i>
              </div>
           
                
                
            </div> 
        </div>

          <img  className=" absolute bottom-1 left-0 p-2 w-28 " src='/marel-logo.png'/>
          <BizerbaLogoSVG cn="absolute bottom-0 right-0 pr-3"/> 
      </div>
          
          
          
      
    )
}

export default Greetings