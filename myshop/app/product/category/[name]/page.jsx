'use client'

import { useMemo } from "react"
import { Filter, Products } from "../../components"
import { useParams, useSearchParams } from "next/navigation"
import { useProduct } from "../../hooks"
import { Introduction } from "./components"
import { useQuery } from "@tanstack/react-query"

export default function Page() {
  const {name} = useParams()
  const searchParams = useSearchParams()
  const {rooms, designers} = useProduct()
  const {API} = useProduct()

  const filter = useMemo(() => {
    return {
      room: rooms.map(e => e.name),
      designer: designers.map(e => e.name),
    }
  }, [rooms, designers])
  
  const [filters, q] = useMemo(() => {
    const arr = [...searchParams.entries()]
    const query = {category: [name]}
    Object.keys(filter).forEach(e => query[e] = searchParams.getAll(e))
    return [arr, query]
  }, [searchParams])

  const query = useQuery({
    queryKey: ['category', name],
    queryFn: () => API.CategoryApi.findOne({name})
  })

  if(query.isError || query.isLoading) return <></>

  const category = query.data

  return <div className=" flex-col gap-5 flex">
    <Introduction category={category}/>
    <Filter filter={filter} filters={filters}/>
    <Products query={q} />
  </div>
}
