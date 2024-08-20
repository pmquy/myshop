'use client'

import { useQuery } from "@tanstack/react-query"
import { ProductAPI } from "@/apis"
import Link from "next/link"
import Product from "./product"

export default function Products({ query }) {

  let q = useQuery({
    queryKey: ['products', query],
    queryFn: () => ProductAPI.find(query),
    staleTime: Infinity
  })  

  const products = q.isSuccess ? q.data : []

  return <div className="p-10 max-md:p-5">
    <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-5">
      {products.map(e => <Link key={e._id} href={'/product/detail/' + e._id}><Product _id={e._id}/></Link>)}
    </div>
  </div>
}
