'use client'

import { createContext, useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { UserAPI } from '@/apis'

const MetaDataContext = createContext()

function MetaDataProvider({ children }) {
  const [user, setUser] = useState()

  const query = useQuery({
    queryKey: ['user', 'me'],
    queryFn: () => UserAPI.getMe().then(setUser),
  })

  return <MetaDataContext.Provider value={{ user, setUser, isLoading: query.isLoading, isError: query.isError }}>
    {children}
  </MetaDataContext.Provider>
}

const useMetaData = () => {
  const data = useContext(MetaDataContext)
  if (!data) throw new Error('useMetaData() must be used inside a MetaData')
  return data
}

export { MetaDataProvider, useMetaData }