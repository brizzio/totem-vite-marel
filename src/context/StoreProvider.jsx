import React, { createContext } from 'react'
import useStore from './hooks/useStore'

const Context = createContext()



function StoreProvider({children}) {
  const values = useStore()
  console.log('useStore properties: ', values)
  return (
    <Context.Provider value={values}>
      {children}
    </Context.Provider>
  )
}

export default StoreProvider