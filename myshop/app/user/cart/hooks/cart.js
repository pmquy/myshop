'use client'

import { useQueries } from "@tanstack/react-query";
import { createContext, useContext } from 'react'
import * as API from '../apis'

const CartContext = createContext()

function CartProvider({ children }) {
  const query = useQueries({
    queries: [
      {
        queryKey: ['carts', {username : 'username'}],
        queryFn: () => API.CartApi.findMany({username : 'username'}),
      },
    ],
  })

  if (query.some(e => e.isError || e.isLoading)) return <></>

  const carts = query[0].data

  return <CartContext.Provider value={{ carts , API}}>{children}</CartContext.Provider>
}

const useCart = () => {
  const data = useContext(CartContext)
  if (!data) throw new Error('useCart() must be used inside a CartProvider')
  return data
}

export { CartProvider, useCart }