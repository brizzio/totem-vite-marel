import React, { useRef, useState } from 'react';


//chrome://device-log/?refresh=5
//Serial device added: path=COM3 instance_id=USB\VID_0C2E&PID_0B6A&MI_00\6&316AB8D1&0&0000 vid=0C2E pid=0B6A

export default function Scanner() {
  let [info, setInfo] = useState(null);
  //let [port, setPort] = useState(null);
  let [opened, setOpened] = useState(null);
  const [items, setItems] = useState([]);
  //const [item, setItem] = useState('')
  const [counter, setCounter] = useState(0)

  const list = useRef(new Array())
  const item = useRef(null)
  const port = useRef(null)

  
  //const [scanned, setScanned] = useState('');

  let start = async () => {
    if ('serial' in navigator) {
      // The Web Serial API is supported.

      // Prompt user to select an Arduino Uno device.
      console.log('Awesome, The serial port is supported.');
      console.log('window.serial',port.current);

      // Get all serial ports the user has previously granted the website access to.
      const ports = await navigator.serial.getPorts();
      console.log(ports);
      port.current = await navigator.serial.requestPort();
      // Wait for the serial port to open.
      await port.current.open({ baudRate:9600 });

      console.log('window.serial on opened port ',port.current.getInfo());

      await connect();
    }
  };

  const connect = async () => {
    // CODELAB: Add code to request & open port here.
    // - Request a port and open a connection.
    

    console.log(port.current.getInfo());
    setInfo(port.current.getInfo())
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

  return (
    <div>
      <h1 style={{ textDecoration: 'underline' }}>Web Serial Info</h1>
      <p>Check for the info of your connected USB devices on the web !</p>
      <br />
      <h3>Click [Start] to select device</h3>
      <p>
        {info ? (
          <>
            <code>{JSON.stringify(info, null, '\t')}</code>
            <code>{JSON.stringify(port.current, null, '\t')}</code>
          </>
        ) : (
          'Device not selected'
        )}
      </p>
      <button
        onClick={(e) => {
          start();
        }}
      >
        {' '}
        Start
      </button>
      <br />
      {item.current}
      <br />
      {counter}
      <br />
      {list.current.map((item,i)=><p key={i}>{item}</p>)}
    </div>
  );
}