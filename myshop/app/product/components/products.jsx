'use client'

import { useQuery } from "@tanstack/react-query"
import { ProductApi } from "../apis"
import Link from "next/link"

export default function Products({ query }) {

  let q = useQuery({
    queryKey: ['products', query],
    queryFn: () => ProductApi.get(query)
  })

  if (q.isLoading || q.isError) return <></>

  const products = q.data

  return <div className="p-10 max-md:p-5">
    <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-5">
      {
        products.map(e => {
          return <div key={e._id}>
            <Link href={'/product/detail/' + e.name}>
              <div className="p-5 normal-card group flex flex-col items-center gap-2">
                <img className=" w-full group-hover:scale-105 transition-transform" src={e.avatar}></img>
                <div className=" font-semibold">{e.name}</div>
                <div className="">{e.designer}</div>
                <div className="">From USD {e.price}</div>
              </div>
            </Link>
          </div>
        })
      }
    </div>
  </div>
}
