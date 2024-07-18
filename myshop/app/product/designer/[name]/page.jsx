'use client'

import { useMemo } from "react"
import { Filter, Products } from "../../components"
import { useParams, useSearchParams } from "next/navigation"
import { useProduct } from "../../hooks"
import { Introduction } from "./components"
import { useQuery } from "@tanstack/react-query"

export default function Page() {
  let { name } = useParams(); name = decodeURIComponent(name)
  const searchParams = useSearchParams()
  const {rooms, categories} = useProduct()
  const {API} = useProduct()

  const filter = useMemo(() => {
    return {
      room: rooms.map(e => e.name),
      category: categories.map(e => e.name),
    }
  }, [rooms, categories])
  
  const [filters, q] = useMemo(() => {
    const arr = [...searchParams.entries()]
    const query = {designer: [name]}
    Object.keys(filter).forEach(e => query[e] = searchParams.getAll(e))
    return [arr, query]
  }, [searchParams])

  const query = useQuery({
    queryKey: ['designer', name],
    queryFn: () => API.DesignerApi.findOne({name})
  })

  if(query.isError || query.isLoading) return <></>

  const designer = query.data

  return <div className=" flex-col gap-5 flex">
    <Introduction designer={designer}/>
    <Filter filter={filter} filters={filters}/>
    <Products query={q} />
  </div>
}
