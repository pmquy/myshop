'use client'

import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { ProductAPI } from "@/apis"
import Link from "next/link"
import Product from "./product"
import { useState } from "react"
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io"

export default function Products({ query }) {

  const [page, setPage] = useState(0)

  let q = useQuery({
    queryKey: ['products', { q: query, page, limit: 10 }],
    queryFn: () => ProductAPI.find({ q: query, page, limit: 10 }),
    initialData: { products: [] },
  },)

  return <div className="p-10 max-md:p-5 flex flex-col gap-10">
    <div className="flex gap-5 m-auto font-semibold text-xl select-none">
      <IoMdArrowDropleftCircle onClick={() => setPage(prev => prev - 1)} className={`w-8 h-8 btn ${page == 0 ? 'pointer-events-none opacity-80' : ''}`} />
      <div>{page}</div>
      <IoMdArrowDroprightCircle onClick={() => setPage(prev => prev + 1)} className={`w-8 h-8 btn ${q.data.hasMore ? '' : 'pointer-events-none opacity-80'}`} />
    </div>
    <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-5">
      {q.data.products.map(e => <Link key={e._id} href={'/product/detail/' + e._id} className=""><Product _id={e._id} /></Link>)}
    </div>
  </div>
}
