import React from 'react'
import RenderListItem from '../components/RenderListItem'

const Home = () => {
  return (
    <>
        <div className='flex flex-col items-start justify-start  border-zinc-600 w-1/2 bg-white mx-2 mt-4 rounded-tl-2xl rounded-tr-2xl'>
            <div className='flex items-center  w-full bg-teal-600 py-3 rounded-tl-2xl rounded-tr-2xl pr-2'>
                <span className='text-white text-lg pl-3'>LA TUA SPESA</span>
                
                <span className="text-white text-lg pl-3">Cliente: 58659</span>  
                
                <span className="text-white text-lg pl-3">26/12/2022</span>  
            </div>
            <div>
                <RenderListItem/>
            </div>

        </div>

        

        <div className='static flex flex-col items-left justify-start  border-zinc-600 w-1/2 gap-6 ml-3 mt-4'>
            
           {/*  <div className=" flex flex-row items-center justify-center border border-black w-full">
                
                    <span className='mt-3 text-indigo-800 font-thin text-3xl px-3 self-center  '>Importo Totale:</span>
                    <span className='text-zinc-900 font-normal text-4xl self-center '> $ 12,90</span>
            </div>

            <div className=" -mt-5 flex flex-row items-center justify-center border border-black w-full">
                
                    <span className='text-indigo-800 font-thin text-3xl px-3 self-center  '>Prodotti nel Carrello:</span>
                    <span className='text-zinc-900 font-normal text-4xl self-center '>18</span>
            </div>
 */}
            <div className=" flex flex-row h-[8rem]  border-zinc-600 bg-white shadow-lg rounded-2xl  w-[26rem] ">
                <img  className="  h-[8rem] p-3 " src='/scanner.gif'/>
                <div className=" flex flex-col w-full ">
                    <span className='text-blue font-thin text-3xl px-3 self-center w-[16rem] my-3'>Il scanner non legge il prodotto?</span>
                    <button className='bg-orange-600  py-2 mx-2 rounded-lg shadow-xl text-white font-semibold w-[14rem] text-2xl'>CLICCA
                    </button>
                </div>   
            </div>
            
           
            <span className='flex items-center justify-start mt-3 text-indigo-800 font-thin text-3xl px-3 text-left w-full'>Ti occorre qualcos'altro?</span>


            <div className=" flex flex-col h-fit items-center border-zinc-600  w-full gap-3 ">

                <div className=" flex flex-row w-full gap-3 items-center">
                    <div className=" flex flex-col items-center justify-center h-[8rem]  border-zinc-600 bg-white shadow-lg rounded-2xl  w-[12rem] " >
                        <i class="fa-solid fa-mobile-screen-button fa-3x"></i>
                        <span className='text-blue font-thin text-2xl px-3 w-full'>Ricarica Telefono</span>
                    </div>
                    <div className=" flex flex-col items-center justify-center h-[8rem]  border-zinc-600 bg-white shadow-lg rounded-2xl  w-[12rem] ">
                        <i class="fa-solid fa-percent fa-3x"></i>
                        <span className='text-blue font-thin text-2xl px-3 
                        w-full'>Applica Sconto</span>
                    </div>
                    <div className=" flex flex-col items-center justify-center h-[8rem]  border-zinc-600 bg-white shadow-lg rounded-2xl  w-[12rem] ">
                        <i class="fa-solid fa-basket-shopping fa-3x"></i>
                        <span className='text-blue font-thin text-2xl px-3 w-full '>La Mia Borsa</span>
                    </div>
                </div> 

                {/*  <div className=" flex flex-row w-full gap-3 ">
                    <div className=" flex flex-row h-[8rem]  border-zinc-600 bg-white shadow-lg rounded-2xl  w-[12rem] ">
                        <span className='text-blue font-thin text-2xl px-3 self-center w-[16rem] my-3'>La Mia Borsa</span>
                    </div>
                    <div className=" flex flex-row h-[8rem]  border-zinc-600 bg-white shadow-lg rounded-2xl  w-[12rem] ">
                        <span className='text-blue font-thin text-2xl px-3 self-center w-[16rem] my-3'>Il scanner non legge il prodotto?</span>
                    </div>
                </div>    */}
            </div>

            <div className=" flex flex-row h-fit items-center justify-center border-zinc-600 bg-white shadow-lg rounded-2xl  w-full ">
                    <span className='text-zinc-900 font-normal text-4xl text-center py-3 '> $ 12,90</span>
            </div>
            
            <button className='bg-teal-600  py-6 mx-2 rounded-lg shadow-md text-white font-semibold w-full text-2xl'>PROCEDI COL PAGAMENTO
            </button>

        
            
           
           
            
           
        
            

        </div>

    </>
  )
}

export default Home