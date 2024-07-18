'use client'

import { createContext, useContext, useState } from 'react'
import * as API from '../apis'
import { useRouter } from "next/navigation";

const UserContext = createContext()

function UserProvider({ children }) {
  const [user, setUser] = useState()

  return <UserContext.Provider value={{ API, user, setUser }}>
    {children}
  </UserContext.Provider>
}

const useUser = () => {
  const data = useContext(UserContext)
  if (!data) throw new Error('useUser() must be used inside a UserProvider')
  return data
}

export { UserProvider, useUser }