import React, {useState, useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {

    const navigate = useNavigate()

    const [authenticated, setAuthenticated] = useState(false)
    const [loading , setLoading] = useState(true)

    var loggedUser = useRef('')

    useEffect(()=>{
        const token = verifyToken()

        if(token){
            
            setAuthenticated(true)
        }
    },[])

    function verifyToken(){
        setLoading(true)
        const token = localStorage.getItem('token');
        console.log('verifyToken', !!token)
        setLoading(false)
        return token

    }

    async function handleLogin(payload){

    
        /* const payload = {
            "email":"antimo@gmail.com",
            "password":"123456"
        } */

        const users = {
            cashier:{
                name:'Mary Jane',
                email:'mary@gmail.com',
                role:'cashier',
                read:true,
                write:true,
                delete:false,
                update:false,
                picture:'https://via.placeholder.com/80'
            },
            admin:{
                name:'Antimo Gionti',
                email:'antimo@gmail.com',
                role:'admin',
                read:true,
                write:true,
                delete:true,
                update:true,
                picture:'https://via.placeholder.com/80'
            },
            superuser:{
                name:'Fabrizio Salvade',
                email:'fabrizio.salvade@gmail.com',
                role:'superuser',
                read:true,
                write:true,
                delete:true,
                update:true,
                picture:'https://via.placeholder.com/80'
            }
        }
        

        console.log('auth')
        console.log('login as : ', payload)

        localStorage.setItem('token', JSON.stringify(payload.type))
        localStorage.setItem('loggedUser', JSON.stringify(users[payload.type]))

        loggedUser = users[payload.type]

        console.log('loggedUser:',loggedUser)


        setAuthenticated(true)


        return navigate("/");

    }

    async function handleLogout(){

        localStorage.removeItem('token')
        localStorage.removeItem('loggedUser')

        setAuthenticated(false)

        loggedUser = ''

        return navigate("/login");
        
        

    }

  return (
    {loading, authenticated, handleLogin, handleLogout}
  )
}

export default useAuth