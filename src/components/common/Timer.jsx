import React from 'react'

function Timer(props) {

    const [date, setDate] = React.useState(new Date());

    const style ={
      color: props.textColor,
      fontSize:'12px',
      marginTop:'3px'
    }
  
    //Replaces componentDidMount and componentWillUnmount
    React.useEffect(() => {
     var timerID = setInterval( () => tick(), 1000 );
     return function cleanup() {
         clearInterval(timerID);
       };
    });
   
      function tick() {
       setDate(new Date());
      }

      const option = {
            year: 'numeric',
            month: 'long',     //('long' || 'short' || 'numeric'),
            weekday: 'long',   //  ('long' || 'short'),
            day: 'numeric'
      }
    
      const locale = 'it-IT'  //'pt-br'
      const fulldate = new Date().toLocaleDateString( locale, option).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

   
      return (
         <div className={props.cn}>
           {fulldate} {date.toLocaleTimeString()}
         </div>
       );
}

export default Timer