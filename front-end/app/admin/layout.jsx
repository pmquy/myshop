'use client'

import { useRouter } from "next/navigation"
import { useMetaData } from "../hooks"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import Link from "next/link"

function NavBar() {
  return <div className="sticky top-32 flex flex-col">
    <Link href={'/admin/product'} className="py-3 btn px-10 hover:bg-white-1 transition-color font-semibold">PRODUCT</Link>
    <Link href={'/admin/order'} className="py-3 btn px-10 hover:bg-white-1 transition-color font-semibold">ORDER</Link>
    <Link href={'/admin/voucher'} className="py-3 btn px-10 hover:bg-white-1 transition-color font-semibold">VOUCHER</Link>
    <Link href={'/admin/category'} className="py-3 btn px-10 hover:bg-white-1 transition-color font-semibold">CATEGORY</Link>
    <Link href={'/admin/designer'} className="py-3 btn px-10 hover:bg-white-1 transition-color font-semibold">DESIGNER</Link>
    <Link href={'/admin/room'} className="py-3 btn px-10 hover:bg-white-1 transition-color font-semibold">ROOM</Link>
  </div>
}


export default function Layout({ children }) {
  const { user, isLoading } = useMetaData()
  const router = useRouter()

  if (isLoading) return <AiOutlineLoading3Quarters className="m-auto w-8 h-8 animate-loading" />

  if (user?.role != 'Admin') {
    router.push('/user/login')
    return <div></div>
  }

  return <div className="flex">
    <div className="bg-white-3">
      <NavBar />
    </div>
    <div className="grow">
      {children}
    </div>
  </div>
}