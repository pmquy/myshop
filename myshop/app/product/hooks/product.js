'use client'

import { useQueries } from "@tanstack/react-query"
import { createContext, useContext } from 'react'
import * as API from '../apis'
import { CartApi } from "@/app/user/cart/apis"

API.CartApi = CartApi

const ProductContext = createContext()

function ProductProvider({ children }) {
  const query = useQueries({
    queries: [
      {
        queryKey: ['rooms'],
        queryFn: () => API.RoomApi.get({}),
      },
      {
        queryKey: ['designers'],
        queryFn: () => API.DesignerApi.get({}),
      },
      {
        queryKey: ['categories'],
        queryFn: () => API.CategoryApi.get({}),
      },
      {
        queryKey: ['products'],
        queryFn: () => API.ProductApi.get({}),
      }
    ],
  })

  if (query.some(e => e.isError || e.isLoading)) return <></>
  
  const rooms = query[0].data
  const designers = query[1].data
  const categories = query[2].data
  const products = query[3].data

  return <ProductContext.Provider value={{ rooms, designers, categories, products, API }}>{children}</ProductContext.Provider>
}

const useProduct = () => {
  const data = useContext(ProductContext)
  if (!data) throw new Error('useProduct() must be used inside a ProductProvider')
  return data
}

export { ProductProvider, useProduct }