'use client'

import { useMemo, useRef, useState } from "react"
import { useCart } from "./hooks"
import { IoMdCheckmark, IoMdCloseCircle } from "react-icons/io"
import Input from "@/ui/input"
import { OrderAPI } from "@/apis"
import { useMutation } from "@tanstack/react-query"
import { useMetaData } from "@/app/hooks"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

export default function CheckOut({ estimatedPrices, voucher }) {
  const { carts } = useCart()
  const { user } = useMetaData()
  const [open, setOpen] = useState(false)
  const [address, setAddress] = useState()
  const noteRef = useRef()

  const price = useMemo(() => {
    let basePrice = Object.keys(estimatedPrices).reduce((prev, cur) => prev + estimatedPrices[cur], 0)
    let shippingPrice = 50
    let discountPrice = 0
    switch (voucher?.type) {
      case "Fixed": {
        discountPrice = voucher.amount
        break
      }
      case "Percentage": {
        discountPrice = basePrice * voucher.amount / 100
      }
    }
    let finalPrice = basePrice + shippingPrice - discountPrice
    return { basePrice, shippingPrice, discountPrice, finalPrice }
  }, [estimatedPrices, voucher])

  const mutation = useMutation({
    mutationFn: async () => {
      if (!noteRef.current.value) throw new Error("Note is empty")
      if (address === undefined) throw new Error("Please select shipping address")
      if(Object.keys(estimatedPrices).length === 0) throw new Error("Please select at least one item")
      const data = { items: Object.keys(estimatedPrices).map(e => { return { quantity: carts[e].quantity, option: carts[e].option, product: carts[e].product } }) }
      if (voucher) data.code = voucher.code
      data.note = noteRef.current.value
      data.address = user.addresses[address]
      return OrderAPI.create(data).then(() => setOpen(false))
    }
  })

  return <div className="">
    {
      open && <div className="z-10 fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-60">
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 max-h-screen overflow-y-auto -translate-y-1/2 p-10 bg-white rounded-lg flex flex-col gap-5">
          <IoMdCloseCircle onClick={() => setOpen(false)} className="absolute btn right-2 top-2 w-8 h-8 text-grey-1 hover:text-red-1"></IoMdCloseCircle>
          <div className="text-xl font-semibold">Take A Note</div>
          <Input placeholder="Take a note" ref={noteRef} />
          <div className="text-xl font-semibold">Shipping Address</div>
          {user.addresses.length == 0 && <div className="">Shipping address book is empty.</div>}
          {
            user.addresses.map((e, i) => <div onClick={() => setAddress(i)} key={i} className="flex gap-5 items-center btn">
              <IoMdCheckmark className={`w-6 h-6 ${address === i ? 'text-black-1' : 'text-transparent'} border-2 border-white-3`} />
              <div className="">
                <div className="font-semibold">{e.salutation + ' ' + e.firstName + ' ' + e.lastName}</div>
                <div className="text-xss">{e.detail + ', ' + e.ward + ', ' + e.district + ', ' + e.province}</div>
              </div>
            </div>)
          }
          <div onClick={mutation.mutate} className={`bg-black-1 py-2 text-white text-center text-xl hover:opacity-90 btn transition-opacity ${mutation.isPending ? ' pointer-events-none' : ''}`}>
            {mutation.isPending ? <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" /> : "CHECK OUT"}
          </div>
          {mutation.isError && <div className="text-xss text-center text-red-1">{mutation.error.message}</div>}
        </div>
      </div>
    }
    <div className="min-w-96 h-max sticky top-[85px] box-border p-5 bg-white-3 flex flex-col gap-5">
      <div className="flex justify-between text-xss">
        <div>Base</div>
        <div>${price.basePrice}</div>
      </div>
      <div className="flex justify-between text-xss">
        <div>Shipping</div>
        <div>${price.shippingPrice}</div>
      </div>
      <div className="flex justify-between text-xss">
        <div>Discount</div>
        <div>-${price.discountPrice}</div>
      </div>
      <div className="flex justify-between text-xss font-semibold">
        <div>Estimated</div>
        <div>${price.finalPrice}</div>
      </div>

      <div onClick={() => setOpen(true)} className="bg-black-1 py-2 hover:opacity-90 transition-opacity text-center font-semibold btn text-white-1">CHECK OUT</div>
    </div>
  </div>
}