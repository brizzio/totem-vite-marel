import React, { useState, useEffect , useRef, useReducer} from 'react'

import { formatDate } from '../../utils/functions';


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


    let sessionModel =  {
            exists:false,
        data:{
            date:'',
            id:'',
            device_id:'',
            timestamp:'',
            opened_at:'',
            closed_at:'' 
        }
    }

  const useSession = () => {

    
    const sessionReducer = (state, action) => {

    
        console.log('session reducer' , state, action)
        
        
        switch (action.type) {
    
        
          case 'CREATE':
            console.log('create session')
    
            let date =new Date()
            let utcTime = date.getTime() + date.getTimezoneOffset()
    
            let formattedDate = formatDate(new Date(utcTime))
    
            let newSession = {
                date:formattedDate,
                session_id:crypto.randomUUID(),
                device_id:deviceId(),
                timestamp:new Date(utcTime).toISOString().replace(/\D/g, '')
            }

            localStorage.setItem('session', JSON.stringify({
                exists:true,
                data:newSession
            }))

            
            return {
                ...state,
                exists:true,
                data:newSession
                
            }
    
            case 'LOAD':
                console.log('Load session', action.data)
                           
                return {
                    ...state,
                    ...action.data
                    
                }
    
            case 'CLOSE':

            console.log('close session ')
            localStorage.removeItem('session')
            
            let closeDate = new Date(date.getTime() + date.getTimezoneOffset()).toISOString()

            var closedSession = {
                ...state,
                //list: state.list.filter((item) => item.entry_id !== action.id),
                exists:false,
                data: {...data, closed_at:closeDate}
              
              }; 
            
            localStorage.setItem('closed_session', closedSession)
           
            return closedSession; 
    
          
          default:
            throw new Error();
        }
    
        
      };



      const [session, dispatchSession] = useReducer(sessionReducer, sessionModel)


    console.log('session',session)

    const readLocalStorage = async (key) => {
        return new Promise((resolve, reject) => {
            
        let result = localStorage.getItem(key)  
        
        if (result === undefined) {
            reject();
        } else {
            resolve(JSON.parse(result));
        }
         
        });
      };


    const evaluate = async ()=>{
        var sessionInStorage = await readLocalStorage("session");
        console.log('useSession sessionInStorage', sessionInStorage, sessionInStorage==null)
        if (sessionInStorage == null){
            console.log('usSession init create new session')
            dispatchSession({type:'CREATE'})
            
            }else{
            
            if( !session.exists ) dispatchSession({type:'LOAD', data:sessionInStorage})
    
            }
    }

    evaluate()

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
    return {session}

  }

  export default useSession