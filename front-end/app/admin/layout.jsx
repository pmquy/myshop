'use client'

import { useRouter } from "next/navigation"
import { useMetaData } from "../hooks"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

export default function Layout({ children }) {
  const { user, isLoading } = useMetaData()
  const router = useRouter()

  if (isLoading) return <AiOutlineLoading3Quarters className="m-auto w-8 h-8 animate-loading" />

  if (user?.role != 'Admin') {
    router.push('/user/login')
    return <div></div>
  }

  return <div className="">
    {children}
  </div>
}