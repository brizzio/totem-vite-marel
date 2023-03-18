import React, { useState } from 'react';
import './style.css';

export default function App() {
  let [info, setInfo] = useState(null);
  let [port, setPort] = useState(null);
  let [opened, setOpened] = useState(null);
  const [items, setItems] = useState([]);
  const [scanned, setScanned] = useState('');

  let start = async () => {
    if ('serial' in navigator) {
      // The Web Serial API is supported.

      // Prompt user to select an Arduino Uno device.
      console.log('Awesome, The serial port is supported.');

      await connect();
    }
  };

  const connect = async () => {
    // CODELAB: Add code to request & open port here.
    // - Request a port and open a connection.
    port = await navigator.serial.requestPort();
    // Wait for the serial port to open.
    await port.open({ baudRate: 9600 });
    while (port.readable) {
      // Listen to data coming from the serial device.
      const textDecoder = new TextDecoderStream();
      const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();
      while (true) {
        const scan = await reader.read();
        console.log(scan);
        console.log(scan.value);
        setItems((prev) => [...prev, scan.value]);
        if (scan.done) {
          // Allow the serial port to be closed later.
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
            <code>{JSON.stringify(port, null, '\t')}</code>
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
      </button><br />
      {JSON.stringify(items)}
    </div>
  );
}
