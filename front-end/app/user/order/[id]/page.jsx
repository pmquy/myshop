'use client'

import { OrderAPI } from "@/apis"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import Items from "./items"
import Payment from "./payment"
import Summary from "./summary"
import Shipping from "./shipping"

const nav = ['Summary', 'Items', 'Payment', 'Shipping']

export default function Page() {
  const [index, setIndex] = useState(0)
  const params = useParams()
  const [status, setStatus] = useState()

  const query = useQuery({
    queryKey: ['order', params.id],
    queryFn: () => OrderAPI.findById(params.id).then(t => {setStatus(t.status);return t}),
  })

  if (query.isLoading) return <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" />
  if (query.isError) return <div className="p-10 text-center">Order not found</div>

  return <div className="bg-white-4 lg:px-5 py-10">
    <div className="text-4xl font-semibold text-center py-10 max-md:text-xl">Order {params.id}</div>
    <div className="flex gap-10 font-semibold overflow-y-auto py-5 px-10">
      {nav.map((e, i) => <div key={i} onClick={() => setIndex(i)} className={` ${index == i ? 'text-red-1' : 'hover:text-red-1'} shrink-0 btn`}>{e}</div>)}
    </div>
    <div className="p-10 bg-white flex flex-col gap-5">
      {index === 0 && <Summary order={query.data} status={status} />}
      {index === 1 && <Items items={query.data.items} />}
      {index === 2 && <Payment order={query.data._id} status={status} setStatus={setStatus}/>}
      {index === 3 && <Shipping order={query.data._id} status={status} setStatus={setStatus}/>}
    </div>
  </div>
}