'use client'

import { useMetaData } from "@/app/hooks"
import { useRouter } from "next/navigation"
import { CartProvider } from "./hooks"

export default function Layout({children}) {
  const router = useRouter()
  const {user} = useMetaData()
  if(!user) {
    router.push('/user/login')
    return <div></div>
  }
  return <CartProvider>
    {children}  
  </CartProvider>
}