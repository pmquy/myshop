'use client'

import { useCallback, useMemo, useState } from "react"
import { Filter, Products } from "./components"
import { useSearchParams } from "next/navigation"
import { useProduct } from "./hooks"
import { Input } from "@/ui"
import { bounce } from "@/utils"

export default function Page() {
  const searchParams = useSearchParams()
  const { rooms, designers, categories } = useProduct()
  const [searchName, setSearchName] = useState()

  const handleChangeSearchName = useCallback(bounce(1000, setSearchName), [setSearchName])

  const filter = useMemo(() => {
    return {
      room: rooms,
      designer: designers,
      category: categories,
    }
  }, [rooms, designers, categories])

  const q = useMemo(() => {
    const query = {}
    Object.keys(filter).forEach(e => {
      const arr = searchParams.getAll(e)
      if (arr.length) {
        if (!query.$and) query.$and = []
        query.$and.push({ $or: arr.map(t => { return { [e]: filter[e].find(m => m.name === t)._id } }) })
      }
    })
    return query
  }, [searchParams])

  const query = useMemo(() => {
    if (!searchName) return q
    return { ...q, $text: { $search: searchName } }
  }, [q, searchName])

  return <div className=" flex-col gap-5 flex">
    <div className=" relative max-h-96 overflow-hidden">
      <img className=" object-cover object-center" src="https://static.vitra.com/media-resized/7ceC7c8z0vyzqaBwwuAixpPB1dRNHpx-zX4_e15PyOo/fill/1920/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgzNzg1MTAvc3RvcmFnZS92X3BhcmFsbGF4XzE5MjB4MTA4MC83ODA4NDU5NS5qcGc.jpg"></img>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white-1 text-4xl font-mono">Products</div>
    </div>
    <div className="p-10">
      <Input onChange={e => handleChangeSearchName(e.target.value)} placeholder="Search by name" />
    </div>
    <Filter filter={filter} />
    <Products query={query} />
  </div>
}
