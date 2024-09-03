'use client'

import { ProductAPI } from "@/apis"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { useMemo } from "react"


function Item({ item }) {
  const query = useQuery({
    queryKey: ['product', item.product],
    queryFn: () => ProductAPI.findById(item.product)
  })

  const product = query.data

  const estimatedPrice = useMemo(() => {
    if (product) return Object.entries(item.option ? item.option : {}).reduce((prev, [key, val]) => prev + product.options[key][val].price, product.price) * item.quantity
  }, [product])

  if (query.isLoading || query.isError) return <div></div>


  return <div className="p-5 flex flex-col gap-2 text-xss">
    <img src={product.avatar} className="w-60 m-auto"></img>
    <Link href={'/product/detail/' + product._id}><div className="text-xl font-semibold hover:text-red-1">{product.name}</div></Link>
    {Object.keys(item.option ? item.option : {}).map((e, i) => <div key={i}><b className="capitalize">{e}: </b>{product.options[e][item.option[e]].name}</div>)}
    <div><b>Quantity: </b>{item.quantity}</div>
    <div><b>Estimated price: </b>${estimatedPrice}</div>
  </div>
}

export default function Items({ items }) {
  return <div style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }} className="grid gap-5">
    {
      items.map((e, i) => <div key={i}>
        <Item item={e} />
      </div>)
    }
  </div>
}