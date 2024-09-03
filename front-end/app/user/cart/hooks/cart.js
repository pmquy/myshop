'use client'
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { CartAPI } from "@/apis";
import { bounce } from '@/utils';
import { useMutation } from '@tanstack/react-query';

const updateById = (function () {
  let id
  let update = {}
  return (_id, data) => {
    if (id) clearTimeout(id)
    Object.assign(update, data)
    id = setTimeout(() => {
      CartAPI.updateById(_id, update)
      update = {}
    }, 500)
  }
})()

const deleteById = bounce(100, CartAPI.deleteById)

const CartContext = createContext()

function CartProvider({ children }) {
  const [carts, setCarts] = useState([])
  const pageRef = useRef(0)
  const hasMoreRef = useRef(true)

  const loadMutation = useMutation({
    mutationFn: async () => {
      if (hasMoreRef.current) {
        return CartAPI.find({ q: {}, page: pageRef.current, limit: 3 }).then(res => { pageRef.current += 1; setCarts(prev => [...prev, ...res.carts]); hasMoreRef.current = res.hasMore })
      }
    }
  })

  useEffect(() => {
    CartAPI.find({ q: {}, page: pageRef.current, limit: 3 }).then(res => { pageRef.current = 1; setCarts(res.carts); hasMoreRef.current = res.hasMore })
  }, [])

  const updateByIndex = useCallback((i, update) => {
    setCarts(carts => {
      updateById(carts[i]._id, update)
      Object.assign(carts[i], update)
      return [...carts]
    })
  })

  const deleteByIndex = useCallback(i => {
    setCarts(carts => {
      deleteById(carts[i]?._id)
      return carts.filter((_, j) => j != i)
    })
  })

  return <CartContext.Provider value={{ carts, setCarts, updateByIndex, deleteByIndex, loadMutation, hasMoreRef}}>
    {children}
  </CartContext.Provider>
}

const useCart = () => {
  const data = useContext(CartContext)
  if (!data) throw new Error('useCart() must be used inside a CartProvider')
  return data
}

export { CartProvider, useCart }