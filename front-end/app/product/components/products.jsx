'use client'

import { ProductAPI } from "@/apis"
import Link from "next/link"
import Product from "./product"
import { useEffect, useRef, useState } from "react"

export default function Products({ query }) {
  const [products, setProducts] = useState([])
  const pageRef = useRef(0)
  const hasMoreRef = useRef(true)
  const ref = useRef()

  useEffect(() => {
    pageRef.current = 0
    hasMoreRef.current = true
    setProducts([])
    const observer = new IntersectionObserver(entries => {
      entries.forEach(async e => {
        if (e.isIntersecting && hasMoreRef.current) {
          const res = await ProductAPI.find({ q: query, page: pageRef.current, limit: 10 })
          setProducts(prev => [...prev, ...res.products])
          hasMoreRef.current = res.hasMore
          pageRef.current += 1
        }
      })
    }, { rootMargin: '100px' })
    if (ref.current) observer.observe(ref.current)
    return () => {
      if (ref.current) observer.unobserve(ref.current)
      observer.disconnect()
    }
  }, [query])

  return <div className="p-10 max-md:p-5 flex flex-col gap-10">
    <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-5">
      {products.map(e => <Link key={e._id} href={'/product/detail/' + e._id} className=""><Product product={e} /></Link>)}
    </div>
    <div ref={ref} />
  </div>
}
