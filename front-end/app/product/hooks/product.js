'use client'

import { useQueries } from "@tanstack/react-query"
import { createContext, useContext } from 'react'
import { RoomAPI, DesignerAPI, ProductAPI, CategoryAPI} from "@/apis"

const ProductContext = createContext()

function ProductProvider({ children }) {
  const query = useQueries({
    queries: [
      {
        queryKey: ['rooms'],
        queryFn: () => RoomAPI.find({})
      },
      {
        queryKey: ['designers'],
        queryFn: () => DesignerAPI.find({})
      },
      {
        queryKey: ['categories'],
        queryFn: () => CategoryAPI.find({})
      },
      {
        queryKey: ['products'],
        queryFn: () => ProductAPI.find({})
      }
    ],
  })

  const rooms = query[0].isSuccess ? query[0].data : []
  const designers = query[1].isSuccess ? query[1].data : []
  const categories = query[2].isSuccess ? query[2].data : []
  const products = query[3].isSuccess ? query[3].data : []

  return <ProductContext.Provider value={{ rooms, designers, categories, products }}>{children}</ProductContext.Provider>
}

const useProduct = () => {
  const data = useContext(ProductContext)
  if (!data) throw new Error('useProduct() must be used inside a ProductProvider')
  return data
}

export { ProductProvider, useProduct }