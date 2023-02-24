import React, { createContext } from 'react'
import useAuth from './hooks/useAuth'

const Context = createContext()



function AuthProvider({children}) {
  const values = useAuth()
  return (
    <Context.Provider value={values}>
      {children}
    </Context.Provider>
  )
}

export default AuthProvider