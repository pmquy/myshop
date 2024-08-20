'use client'

import { useMemo } from "react"
import { Filter, Products } from "../../components"
import { useParams, useSearchParams } from "next/navigation"
import { useProduct } from "../../hooks"
import { useQuery } from "@tanstack/react-query"
import { CategoryAPI } from "@/apis"

function Introduction({ category }) {
  return <div className=" flex overflow-auto max-lg:flex-col">
    <img src={category.avatar} className="max-h-96 basis-1/2 object-cover object-center"></img>
    <div className="basis-1/2 bg-black-1 text-white-2 p-10 content-center">
      <div className=" text-3xl font-semibold">{category.name}</div>
      <div className=" text-wrap mt-5 ">{category.description}</div>
    </div>
  </div>
}

export default function Page() {
  const { id } = useParams()
  const searchParams = useSearchParams()
  const { rooms, designers } = useProduct()

  const filter = useMemo(() => {
    return {
      room: rooms,
      designer: designers,
    }
  }, [rooms, designers])

  const q = useMemo(() => {
    const query = { $and: [{ category: id }] }
    Object.keys(filter).forEach(e => {
      const arr = searchParams.getAll(e)
      if (arr.length) {
        if (!query.$and) query.$and = []
        query.$and.push({ $or: arr.map(t => { return { [e]: filter[e].find(m => m.name === t)._id } }) })
      }
    })
    return query
  }, [searchParams])

  const query = useQuery({
    queryKey: ['category', id],
    queryFn: () => CategoryAPI.findById(id)
  })

  if (query.isError || query.isLoading) return <></>

  const category = query.data

  return <div className=" flex-col gap-5 flex">
    <Introduction category={category} />
    <Filter filter={filter} />
    <Products query={q} />
  </div>
}
