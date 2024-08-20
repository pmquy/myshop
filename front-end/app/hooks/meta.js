'use client'

import { createContext, useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { UserAPI } from '@/apis'

const MetaDataContext = createContext()

function MetaDataProvider({ children }) {
  const [user, setUser] = useState()

  const query = useQuery({
    queryKey: ['user', 'me'],
    queryFn: () => UserAPI.getMe().then(setUser),
  })

  if(query.isLoading) return <div></div>

  return <MetaDataContext.Provider value={{ user, setUser }}>
    {children}
  </MetaDataContext.Provider>
}

const useMetaData = () => {
  const data = useContext(MetaDataContext)
  if (!data) throw new Error('useMetaData() must be used inside a MetaData')
  return data
}

export { MetaDataProvider, useMetaData }