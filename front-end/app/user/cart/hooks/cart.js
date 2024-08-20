'use client'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { CartAPI } from "@/apis";

const updateById = (function () {
  let id
  let update = {}
  return (_id, data) => {
    if (id) clearTimeout(id)
    Object.assign(update, data)
    id = setTimeout(() => {
      CartAPI.updateById(_id, update)
      update = {}
    }, 1000)
  }
})()

const CartContext = createContext()

function CartProvider({ children }) {
  const [carts, setCarts] = useState([])

  useEffect(() => {
    CartAPI.find({}).then(setCarts)
  }, [])

  const updateByIndex = useCallback((i, update) => {
    setCarts(carts => {
      updateById(carts[i]._id, update)
      Object.assign(carts[i], update)
      return [...carts]
    })
  }, [])
  
  const deleteByIndex = useCallback(i => {
    setCarts(carts => {
      CartAPI.deleteById(carts[i]._id)
      carts.splice(i, 1)
      return [...carts]
    })
  }, [])

  return <CartContext.Provider value={{ carts, setCarts, updateByIndex, deleteByIndex}}>
    {children}
  </CartContext.Provider>
}

const useCart = () => {
  const data = useContext(CartContext)
  if (!data) throw new Error('useCart() must be used inside a CartProvider')
  return data
}

export { CartProvider, useCart }