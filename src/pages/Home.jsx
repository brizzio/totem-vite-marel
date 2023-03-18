import React, { useState, useEffect , useRef} from 'react'
import RenderListItem from '../components/RenderListItem'
import useStore from '../context/hooks/useStore'
import { useNavigate } from 'react-router-dom'
import { getLocalStorageCollectionDataByKey, getCartValue } from '../utils/functions'

const Home = () => {

  const { prices, bags } = useStore()

  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [isScannerOn, setIsScannerOn] = useState(false)
  const [counter, setCounter] = useState(0)
 
  const hasSerial = useRef(!!('serial' in navigator))
  const list = useRef(new Array())
  const item = useRef(null)
  const port = useRef(null)
  const portInfo = useRef(null)

  const navigate = useNavigate()


  
 console.log('hasSerial', hasSerial.current)

  useEffect(()=>{

    getLocalStorageCollectionDataByKey('items').then(res=>{
        console.log('home effect local storage items changed', res)

        let sumItemsCalculatedPrice = getCartValue(res)
        setTotal(sumItemsCalculatedPrice)
        setItems(res)
    })


          
      
    return ()=>console.log('home effect unmount items changed', items)
  }, [localStorage.getItem('items')])


  
  

  const getPorts =  async () => {
    // Prompt user to select any serial port.
    let ports =  await navigator.serial.getPorts();
    if (Array.isArray(ports) && ports.length) {
        // array exists and is not empty
        console.log('ports', ports)
       return ports[0]
   
    }else{
        return undefined
    }

    

  };

  

  let start = async () => {
    
    if (!hasSerial.current) return; 
    
    // The Web Serial API is supported.
    console.log('Awesome, The serial port is supported.');
    console.log('Port is active?',port.current);

    // Get all serial ports the user has previously granted the website access to.
    const ports = await navigator.serial.getPorts();
    console.log(ports);

    if (!port.current){
    console.log('we dont have any port selected, lets get one!!');
    port.current = await navigator.serial.requestPort();
    // Wait for the serial port to open.
    await port.current.open({ baudRate:9600 });
    setIsScannerOn(true)
    }
    
    console.log('Now we have an opened port ... ', port.current.getInfo());

    await connect();
    
  };

  

  const connect = async () => {

    // connect & listen to port messages
    console.log(port.current.getInfo());
    portInfo.current = port.current.getInfo()
    let scanned = '';
    let end = false
    while (port.current.readable) {
      // Listen to data coming from the serial device.
      const textDecoder = new TextDecoderStream();
      const readableStreamClosed = port.current.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();
      
      while (true) {
        const scan = await reader.read();
        
        console.log(scan);
        console.log(JSON.stringify(scan))

         end = (JSON.stringify(scan).indexOf('r')>-1)
         scanned = scanned + scan.value
         console.log('end?', end);
         console.log('scanned on end',scanned, end);
         if(end){
            console.log('at end>>', scanned, scan)

            item.current = scanned.replace(/\W/g, "");
            list.current.push(scanned.replace(/\W/g, ""))
            setCounter(list.current.length)

            scanned=''
            end=false
            //scan.done = true
         }
         
         console.log('list', list.current)
          
        if (scan.done) {
          // Allow the serial port.current to be closed later.
          console.log('done', scan.done);
          reader.releaseLock();
          break;
        }
        // value is a string will be streaming here.
      }
    }
  };



  const requestPort =  async () => {
    // Prompt user to select any serial port.
    const p = await navigator.serial.requestPort();
    // Wait for the serial port to open.
    console.log('request port', p)
    setPort(p)
  };






  const payment = ()=>{

    console.log('payment')
    navigate('/payment')


  }

  

  
    
  return (
    <>
        
        <div className='flex flex-col items-start justify-start  border-zinc-600 w-1/2 bg-white mx-2 mt-4 rounded-tl-2xl rounded-tr-2xl'>
            <div className='flex items-center  w-full bg-teal-600 py-3 rounded-tl-2xl rounded-tr-2xl pr-2'>
                <span className='text-white text-lg pl-3'>LA TUA SPESA</span>
                
                <span className="text-white text-lg pl-3">Cliente: 58659</span>  
                
                <span className="text-white text-lg pl-3">26/12/2022</span>  

                <span className="text-white text-lg pl-3">{bags}</span> 
            </div>
            <div className="flex flex-col w-full h-[30rem] items-center justify-center overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
               {/*  {Array.from(items).length>0
                ? items.map((el,i)=><RenderListItem key={i} item={el}/>)
                :<span className='text-blue font-thin text-3xl px-3 w-[16rem] my-3'>Passa i prodotti nello scanner...</span>} */}
                {Array.from(list.current).length>0
                ? list.current.map((el,i)=><div key={i}>{el}</div>)
                :<span className='text-blue font-thin text-3xl px-3 w-[16rem] my-3'>Passa i prodotti nello scanner...</span>}
            </div>

        </div>

        

        <div className='static flex flex-col items-left justify-start  border-zinc-600 w-1/2 gap-5 ml-3 mt-4'>
            
           {/*  <div className=" flex flex-row items-center justify-center border border-black w-full">
                
                    <span className='mt-3 text-indigo-800 font-thin text-3xl px-3 self-center  '>Importo Totale:</span>
                    <span className='text-zinc-900 font-normal text-4xl self-center '> $ 12,90</span>
            </div>

            <div className=" -mt-5 flex flex-row items-center justify-center border border-black w-full">
                
                    <span className='text-indigo-800 font-thin text-3xl px-3 self-center  '>Prodotti nel Carrello:</span>
                    <span className='text-zinc-900 font-normal text-4xl self-center '>18</span>
            </div>
 */}

 {
    isScannerOn &&
 
            <div className=" flex flex-row h-[8rem]  border-zinc-600 bg-white shadow-lg rounded-2xl  w-[26rem] ">
                <img  className="  h-[8rem] p-3 " src='/scanner.gif'/>
                <div className=" flex flex-col w-full ">
                    <span className='text-blue font-thin text-3xl px-3 self-center w-[16rem] my-3'>Il scanner non legge il prodotto?</span>
                    <button className='bg-indigo-500  py-2 mx-2 rounded-lg shadow-xl text-white font-semibold w-[14rem] text-2xl'
                    onClick={()=>navigate('/search')}>CLICCA
                    </button>
                </div>   
            </div>
}

{
    !isScannerOn &&
 
            <div className=" flex flex-row h-[8rem]  border-zinc-600 bg-white shadow-lg rounded-2xl  w-[26rem] ">
                <img  className="  h-[8rem] p-3 " src='/scanner.gif'/>
                <div className=" flex flex-col w-full ">
                    <span className='text-blue font-thin text-3xl px-3 self-center w-[16rem] my-3'>Seleziona la porta</span>
                    <button className='bg-red-500  py-2 mx-2 rounded-lg shadow-xl text-white font-semibold w-[14rem] text-2xl'
                    onClick={start}>ATTIVARE
                    </button>
                </div>   
            </div>
}

            <div className=" absolute top-8 right-24 flex flex-col h-[8rem] items-center justify-center border-zinc-600 bg-white shadow-lg rounded-2xl  w-[8rem] pb-6 ">

                
                <img  className="  w-[5rem]" src='/lotteryIcon.png'/>

                <span className='text-blue font-thin text-xl px-3 text-center w-[10rem] leading-6'>LOTTERIA SCONTRINI</span>
                    
            </div>
            
           
            <span className='flex items-center justify-start mt-3 text-indigo-800 font-thin text-3xl px-3 text-left w-full'>Ti occorre qualcos'altro?</span>


            <div className=" flex flex-col h-fit items-center border-zinc-600  w-full gap-3 ">

                <div className=" flex flex-row w-full gap-3 items-center">
                    <div className=" flex flex-col items-center justify-center h-[8rem]  border-zinc-600 bg-white shadow-lg rounded-2xl  w-[12rem] " >
                        <i className="fa-solid fa-mobile-screen-button fa-3x"></i>
                        <span className='text-blue font-thin text-2xl px-3 w-full'>Ricarica Telefono</span>
                    </div>
                    <div className=" flex flex-col items-center justify-center h-[8rem]  border-zinc-600 bg-white shadow-lg rounded-2xl  w-[12rem] ">
                        <i className="fa-solid fa-percent fa-3x"></i>
                        <span className='text-blue font-thin text-2xl px-3 
                        w-full'>Applica Sconto</span>
                    </div>
                    <div className=" flex flex-col items-center justify-center h-[8rem]  border-zinc-600 bg-white shadow-lg rounded-2xl  w-[12rem] ">
                        <i className="fa-solid fa-basket-shopping fa-3x"></i>
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
                <span className='text-zinc-900 font-normal text-4xl text-center py-3 px-1 '> € </span>
                    <span className='text-zinc-900 font-normal text-4xl text-center py-3 '> {total.toFixed(2)}</span>
            </div>
            
            <button className={`bg-teal-600  py-6 mx-2 rounded-lg shadow-md text-white font-semibold w-full text-2xl ${total == 0?'disabled':''}`}
            onClick={payment}>PROCEDI COL PAGAMENTO
            </button>

        
            
           
           
            
           
        
            

        </div>

    </>
  )
}

export default Home