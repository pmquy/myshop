'use client'

import { useMemo } from "react"
import { Filter, Products } from "../../components"
import { useParams, useSearchParams } from "next/navigation"
import { useProduct } from "../../hooks"
import { useQuery } from "@tanstack/react-query"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { DesignerAPI } from "@/apis"

function Introduction({designer}) {
  return <div className=" flex overflow-auto max-lg:flex-col">
    <img src={designer.avatar} className="max-h-96 basis-1/2 object-cover object-center"></img>
    <div className="basis-1/2 bg-black-1 text-white-2 p-10 content-center">
      <div className=" text-3xl font-semibold">{designer.name}</div>
      <div className=" text-wrap mt-5 ">{designer.description}</div>
    </div>
  </div>
}

export default function Page() {
  let { id } = useParams()
  const searchParams = useSearchParams()
  const { rooms, categories } = useProduct()

  const filter = useMemo(() => {
    return {
      room: rooms,
      category: categories
    }
  }, [rooms, categories])

  const q = useMemo(() => {
    const query = { $and: [{ designer: id }] }
    Object.keys(filter).forEach(e => {
      const arr = searchParams.getAll(e)
      if (arr.length) {
        query.$and.push({ $or: arr.map(t => { return { [e]: filter[e].find(m => m.name === t)._id } }) })
      }
    })
    return query
  }, [searchParams])

  const query = useQuery({
    queryKey: ['designer', id],
    queryFn: () => DesignerAPI.findById(id)
  })

  if (query.isLoading || query.isError) return <AiOutlineLoading3Quarters className="w-8 h-8 m-auto animate-loading" />

  const designer = query.data

  return <div className=" flex-col gap-5 flex">
    <Introduction designer={designer} />
    <Filter filter={filter} />
    <Products query={q} />
  </div>
}
