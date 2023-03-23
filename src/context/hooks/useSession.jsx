import React, { useState, useEffect , useRef, useReducer} from 'react'
















  function deviceId()
    {
    var dev = sessionStorage.getItem("deviceId");
      // if it is the first time that this page is loaded
    if (dev == null)
        
        var id = crypto.randomUUID()
          // new computed value are saved in localStorage and in sessionStorage
        
          localStorage.setItem("deviceId",id);

          return id;
        
        
    }

  const useSession = () => {

    
    const sessionReducer = (state, action) => {

    
        console.log('session reducer' ,state, action)
        
        
        switch (action.type) {
    
        
          case 'CREATE':
            console.log('create session')
    
            let date =new Date()
            let utcTime = date.getTime() + date.getTimezoneOffset()
    
            formattedDate = [
                utcTime.getFullYear(),
                (utcTime.getMonth() + 1).toString().padStart(2, '0'),
                utcTime.getDate().toString().padStart(2, '0'),
              ].join('-')
    
            session = {
                date:formattedDate,
                session_id:crypto.randomUUID(),
                device_id:deviceId(),
                timestamp:new Date(utcTime).toISOString().replace(/\D/g, '')
            }
            
            return {
                ...state,
                ...session
                
            }
    
            case 'LOAD':
                console.log('Load session', action.data)
                           
                return {
                    ...state,
                    ...action.data
                    
                }
    
          /* case 'REMOVE':
            var item = state.list[action.key]
            console.log('to delete', item)
            return {
              ...state,
              //list: state.list.filter((item) => item.entry_id !== action.id),
              list:state.list.map((el,i)=>
                  i==action.key
                  ?{...el, deleted:true}
                  :el
              )
            
            }; */
    
          
          default:
            throw new Error();
        }
    
        
      };

      const [session, dispatchSession] = useReducer(sessionReducer,{
        date:'',
        id:'',
        device_id:'',
        timestamp:''
    })

    const init = ()=>dispatchSession({type:'CREATE'})

    const load = ()=>dispatchSession({type:'LOAD'})
        
       




    /* const init = ()=>{

        var sessionInStorage = JSON.parse(sessionStorage.getItem("session"));
        // if it is the first time that this page is loaded

        console.log('usSession sessionInStorage', sessionInStorage, sessionInStorage==null)


        if (sessionInStorage == null){
        console.log('usSession init create new session')
        dispatchSession({type:'CREATE'})
        
        }else{
        
        dispatchSession({type:'LOAD', data:sessionInStorage})

        }



    }
 */
    return {session, init, load}

  }

  export default useSession