'use client'

import { OrderAPI } from "@/apis"
import { useQuery } from "@tanstack/react-query"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { useState } from "react"
import { useParams } from "next/navigation"
import Summary from "./summary"
import Items from "./items"
import Payment from "./payment"
import Actions from "./actions"
import Shipping from "./shipping"

const nav = ['Summary', "Items", "Payment", "Shipping", 'Actions']

export default function Page() {
  const [index, setIndex] = useState(0)
  const [status, setStatus] = useState()
  const params = useParams()
  const query = useQuery({
    queryKey: ['order', params.id],
    queryFn: () => OrderAPI.findById(params.id).then(t => {
      setStatus(t.status)
      return t
    }),
  })

  if (query.isLoading) return <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" />
  if (query.isError) return <div className="p-10 text-center">Order not found</div>

  return <div className="bg-white-4 py-10 lg:px-10">
    <div className="text-4xl font-semibold text-center py-10">Order {params.id}</div>
    <div className="flex gap-10 font-semibold overflow-y-auto max-w-full py-5 px-10">
      {nav.map((e, i) => <div key={i} onClick={() => setIndex(i)} className={` ${index == i ? 'text-red-1' : 'hover:text-red-1'} shrink-0 btn`}>{e}</div>)}
    </div>
    <div className="p-10 bg-white-1">
      {index === 0 && <Summary status={status} order={query.data} />}
      {index === 1 && <Items items={query.data.items} />}
      {index === 2 && <Payment status={status} setStatus={setStatus} order={query.data._id} />}
      {index === 3 && <Shipping status={status} setStatus={setStatus} order={query.data} />}
      {index === 4 && <Actions status={status} setStatus={setStatus} order={query.data._id} />}
    </div>
  </div>
}