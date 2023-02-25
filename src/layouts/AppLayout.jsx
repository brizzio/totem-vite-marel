import React , {useState, useEffect} from 'react'
import Spinner from '../components/spinner/Spinner'
import useStore from '../context/hooks/useStore'

const AppLayout = ({children}) => {

    const {loading } = useStore()

    useEffect(()=>{
        //verify loading state
        //setLoading(true)

        return ()=>console.log('App Layout Unmount loading ', loading)
    })

    console.log('loading',loading)

    if(loading){

        return(

        <div className="flex justify-center items-center w-screen h-screen bg-white">
    
            <div className="flex justify-center items-center w-[84rem] h-[38rem] bg-teal-900 bg-opacity-50 box-border border-zinc-300 rounded-2xl shadow shadow-2xl">

               <Spinner/>

            </div>

        </div>
            
        )
    }

    /* style={{background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)"}} */
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-white">
        
        <div className="w-[84rem] h-[40rem] bg-white box-border border-zinc-300 rounded-2xl shadow shadow-2xl"
        >

                 {children}

        </div>

    </div>
  )
}

export default AppLayout