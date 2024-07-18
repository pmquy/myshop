'use client'

import { useMemo } from "react"
import { Filter, Products } from "./components"
import { useSearchParams } from "next/navigation"
import { useProduct } from "./hooks"

export default function Page() {
  const searchParams = useSearchParams()
  const {rooms, designers, categories} = useProduct()
  
  const filter = useMemo(() => {
    return {
      room: rooms.map(e => e.name),
      designer: designers.map(e => e.name),
      category: categories.map(e => e.name),
    }
  }, [rooms, designers, categories])
  
  const [filters, q] = useMemo(() => {
    const arr = [...searchParams.entries()]
    const query = {}
    Object.keys(filter).forEach(e => query[e] = searchParams.getAll(e))
    return [arr, query]
  }, [searchParams])

  return <div className=" flex-col gap-5 flex">
    <div className=" relative max-h-96 overflow-hidden">
      <img className=" object-cover object-center" src="https://static.vitra.com/media-resized/7ceC7c8z0vyzqaBwwuAixpPB1dRNHpx-zX4_e15PyOo/fill/1920/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgzNzg1MTAvc3RvcmFnZS92X3BhcmFsbGF4XzE5MjB4MTA4MC83ODA4NDU5NS5qcGc.jpg"></img>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white-1 text-4xl font-mono">Products</div>
    </div>
    <Filter filter={filter} filters={filters}/>
    <Products query={q} />
  </div>
}
