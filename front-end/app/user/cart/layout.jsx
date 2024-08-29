'use client'

import { useMetaData } from "@/app/hooks"
import { useRouter } from "next/navigation"
import { CartProvider } from "./hooks"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

export default function Layout({ children }) {
  const router = useRouter()
  const { user, isLoading } = useMetaData()
  
  if(isLoading) 
    return <div className="h-full">
      <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto"/>
    </div>

  if (!user) {
    router.push('/user/login')
    return <div></div>
  }

  return <CartProvider>
    {children}
  </CartProvider>
}