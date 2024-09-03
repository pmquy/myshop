'use client'

import { memo, useEffect, useMemo, useState } from "react"
import { useCart } from "./hooks"
import { Configure } from "@/app/product/detail/components"
import { IoMdCheckbox, IoMdCloseCircle } from "react-icons/io"
import Link from "next/link"
import { ProductAPI } from "@/apis"
import { useQuery } from "@tanstack/react-query"

const CartItem = memo(function ({ index, setEstimatedPrices }) {
  const { carts, updateByIndex, deleteByIndex} = useCart()
  const [edit, setEdit] = useState(false)
  const [checked, setChecked] = useState(false)
  const item = carts[index]

  useEffect(() => {
    if (edit) document.body.style.overflowY = 'hidden'
    return () => document.body.style.overflowY = 'auto'
  }, [edit])

  const query = useQuery({
    queryKey: ['product', item.product],
    queryFn: () => ProductAPI.findById(item.product),
    staleTime: Infinity
  })

  const product = query.data

  const estimatedPrice = useMemo(() => {
    if (query.isSuccess) return Object.entries(item.option).reduce((prev, [key, val]) => prev + product.options[key][val].price, product.price) * item.quantity
  }, [item.option, query.isSuccess, item.quantity])

  useEffect(() => {
    if (checked) {
      setEstimatedPrices(prev => { return { ...prev, [index]: estimatedPrice } })
      return () => setEstimatedPrices(prev => { delete prev[index]; return { ...prev } })
    }
  }, [estimatedPrice, checked])

  if (query.isLoading || query.isError) return <div></div>

  return <div className="p-5">
    {edit && <div className=" fixed z-10 top-0 left-0 h-screen w-screen bg-black-1 bg-opacity-80">
      <div className="absolute w-[90%] max-h-[90%] max-md:w-full max-md:max-h-full overflow-y-auto left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <IoMdCloseCircle className=" w-8 h-8 text-grey-1 hover:text-red-1 absolute right-2 top-2" onClick={() => setEdit(false)} />
        <Configure product={product} initialOption={item.option} handleSubmit={({ option }) => { updateByIndex(index, { option }); setEdit(false) }} />
      </div>
    </div>}
    <div className=" flex max-md:flex-col gap-5 md:items-center">
      <IoMdCheckbox onClick={() => setChecked(prev => !prev)} className={`w-8 h-8 shrink-0 btn ${checked ? 'text-black-1' : 'text-gray-200'}`} />
      <div className="overflow-hidden"><img src={product.avatar} className="object-cover object-center max-w-72 m-auto max-h-full" /></div>
      <div className="flex flex-col gap-2 grow">
        <div className="flex gap-5 justify-between">
          <Link href={'/product/detail/' + product._id}><div className="text-xl font-semibold hover:text-red-1">{product.name}</div></Link>
          <IoMdCloseCircle onClick={() => deleteByIndex(index)} className="w-8 h-8 btn text-grey-1 hover:text-red-1" />
        </div>
        {Object.keys(item.option).map((e, i) => <div key={i} className="max-w-full overflow-hidden overflow-ellipsis text-nowrap"><b className=" capitalize">{e}: </b>{product.options[e][item.option[e]].name}</div>)}
        <div onClick={() => setEdit(true)} className="text-grey-1 hover:text-red-1 btn">Edit Configuration</div>
        <div className="w-max flex gap-5 items-center">
          <b>Quantity: </b>
          <div className="flex items-center border-2 border-white-3 text-base">
            <div onClick={() => updateByIndex(index, { quantity: Math.max(1, item.quantity - 1) })} className=" w-6 h-6 content-center text-center border-r-2 btn">-</div>
            <div className="h-6 px-2 content-center text-center">{item.quantity}</div>
            <div onClick={() => updateByIndex(index, { quantity: item.quantity + 1 })} className="w-6 h-6 content-center text-center border-l-2 btn">+</div>
          </div>
        </div>
        <div><b>Estimated: </b>${estimatedPrice}</div>
      </div>
    </div>
  </div>
})

CartItem.displayName = "CartItem"

export default CartItem