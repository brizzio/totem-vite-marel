import React, { useState ,useEffect, useRef,forwardRef, useImperativeHandle} from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "../../index.css";


const NumericKb = forwardRef((props, ref) => {

    
  
  const [input, setInput] = useState({});
  const [layoutName, setLayoutName] = useState("default");
  const keyboard = useRef();

//console.log('inputs no kb: ', input)
useEffect(() => {
  setInput(props.inputValue);

  return () => {
    console.log('effect numeric keyboard', input)
  }
}, [])


useImperativeHandle(ref, () => ({
  clearInput() {
    console.log('imperative.clearInput()')
    clear('')
  }
}));


const onChange = input => {
  setInput(input);
  props.change(input)
  //console.log("Input changed", input);
  //props.onChange(input.default)
  
};

const handleShift = () => {
  const newLayoutName = layoutName === "default" ? "shift" : "default";
  setLayoutName(newLayoutName);
};

const handleEnter = () => {
  //console.log('keyboard says: ', input.default)
  //console.log("input no done", input);
  props.onEnter(input)
  clear('')
};

const onKeyPress = button => {
  //console.log("Button pressed", button);

  /**
   * If you want to handle the shift and caps lock buttons
   */
  if (button === "{shift}" || button === "{lock}") handleShift();
  if (button === "{enter}" || button === "{lock}") handleEnter();
};

function onChangeInput(event){
  const input = event.target.value;
  //console.log('event.target.value: ', event.target.value)
    setInput(input);
    keyboard.current.setInput(input);
};

function clear(value){
  const input = value
  //console.log('event.target.value: ', value)
    setInput(input);
    keyboard.current.setInput(input);
};





  return (
    <>
              
      <div className="pb-2">
        <input className="hidden shadow appearance-none border rounded w-full py-2 px-1 text-black" 
            value={input}
            onChange={onChangeInput} 
        />
        {/* buttons: "1 2 3 4 5 6 7 8 9 {shift} 0 {bksp}" */}
        <Keyboard
        keyboardRef={r => (keyboard.current = r)}

        layoutName={layoutName}
        onKeyPress={onKeyPress}
        onChange={onChange}
        theme={"hg-theme-default hg-layout-numeric numeric-theme myTheme gap-0"}
        buttonTheme= {[
          {
            class: 'hg-red',
            buttons: "1 2 3 4 5 6 7 8 9 0 "
          },
          {
            class: 'shifted',
            buttons: "! / # $ % ^ & * ( ) + "
          },
          {
            class: 'hg-side',
            buttons: "{enter} {bksp}"
          },
          {
            class: 'enter',
            buttons: "{enter}"
          },
          {
            class: 'del',
            buttons: "{bksp}"
          }
        ]}
        layout={{
          'default': ["1 2 3", "4 5 6", "7 8 9", "{bksp} 0 {enter}"],
          'shift': ["! / #", "$ % ^", "& * (", "{shift} ) +"],
          'alpha': [
            '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
            '{tab} q w e r t y u i o p [ ] \\',
            '{lock} a s d f g h j k l ; \' {enter}',
            '{shift} z x c v b n m , . / {shift}',
            '.com @ {space}'
          ],
          'shiftAlpha': [
            '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
            '{tab} Q W E R T Y U I O P { } |',
            '{lock} A S D F G H J K L : " {enter}',
            '{shift} Z X C V B N M < > ? {shift}',
            '.com @ {space}'
          ]
        }}
        display={{
          '{bksp}': ' ',
          '{enter}': ' ',
          '{shift}': 'SHIFT',
          '{s}': 'shift',
          '{tab}': 'tab',
          '{lock}': 'caps',
          '{accept}': 'Submit',
          '{space}': ' ',
          '{//}': ' '
        }}
        
        />


      </div>
        
    </>
  );
});

export default NumericKb;