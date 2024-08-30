'use client'

import { useEffect, useMemo, useRef, useState } from "react"
import { useCart } from "./hooks"
import { Configure } from "@/app/product/detail/components"
import { IoMdCheckmark, IoMdClose, IoMdCloseCircle } from "react-icons/io"
import Link from "next/link"
import { RiDeleteBinLine } from "react-icons/ri";
import Checkbox from "@/ui/checkbox"
import Input from "@/ui/input"
import { VoucherAPI, OrderAPI, ProductAPI } from "@/apis"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useMetaData } from "@/app/hooks"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

function CartItem({ index, setEstimatedPrices }) {
  const { carts, updateByIndex, deleteByIndex } = useCart()
  const chooseRef = useRef()
  const [edit, setEdit] = useState(false)
  const [checked, setChecked] = useState(true)
  const item = carts[index]

  useEffect(() => {
    if (edit) document.body.style.overflowY = 'hidden'
    return () => document.body.style.overflowY = 'auto'
  }, [edit])

  const query = useQuery({
    queryKey: ['product', item.product],
    queryFn: () => ProductAPI.findById(item.product)
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
        <IoMdClose className=" w-8 h-8 text-grey-1 hover:text-red-1 absolute right-2 top-2" onClick={() => setEdit(false)} />
        <Configure product={product} initialOption={item.option} handleSubmit={({ option }) => { updateByIndex(index, { option }); setEdit(false) }} />
      </div>
    </div>}
    <div className=" flex max-md:flex-col gap-5">
      <div className="flex gap-5 items-center">
        <Checkbox onClick={() => setChecked(!checked)} checked={checked} ref={chooseRef} />
        <RiDeleteBinLine onClick={() => deleteByIndex(index)} className="w-6 h-6 hover:text-red-1" />
      </div>
      <div className="overflow-hidden">
        <img src={product.avatar} className="object-cover object-center md:w-72 h-full " />
      </div>
      <div className="flex flex-col gap-2">
        <Link href={'/product/detail/' + product._id}><div className="text-xl font-semibold hover:text-red-1">{product.name}</div></Link>
        {Object.keys(item.option).map((e, i) => <div key={i} className=""><b className=" capitalize">{e}: </b>{product.options[e][item.option[e]].name}</div>)}
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
}

function CheckOut({ estimatedPrices, voucher }) {
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
      const data = { items: Object.keys(estimatedPrices).map(e => { return { quantity: carts[e].quantity, option: carts[e].option, product: carts[e].product } }) }
      if (!noteRef.current.value) throw new Error("Note is empty")
      if (address === undefined) throw new Error("Please select shipping address")
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
          <IoMdCloseCircle onClick={() => setOpen(false)} className="absolute right-2 top-2 w-6 h-6"></IoMdCloseCircle>
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

function Discount({ setVoucher, voucher }) {
  const [edit, setEdit] = useState(false)
  const ref = useRef()

  const mutation = useMutation({
    mutationFn: async () => {
      if (!ref.current.value) throw new Error("Code is empty")
      return VoucherAPI.findByCode(ref.current.value).then(voucher => {
        if (voucher.quantity <= 0) throw new Error("Voucher is unavailable")
        setVoucher(voucher)
      })
    }
  })

  return <div className="p-5 border-y-2 border-white-3 flex flex-col gap-5">
    <div className="flex justify-between">
      <div>Do you have a discount code?</div>
      <div className="btn hover:text-red-1" onClick={() => setEdit(true)}>Enter discount code</div>
    </div>
    {
      edit && <div className=" flex flex-col gap-5">
        <Input ref={ref} placeholder="Enter your discount code here" />
        {mutation.isSuccess && <div className="text-xss text-green-600">{voucher.description}</div>}
        <div className="flex gap-5 items-center">
          <button onClick={mutation.mutate} className={`bg-black-1 py-2 px-5 w-max m-auto text-white text-center hover:opacity-90 transition-opacity ${mutation.isPending ? ' pointer-events-none' : 'opacity-90'}`}>
            {mutation.isPending ? <AiOutlineLoading3Quarters className="animate-loading m-auto w-6 h-6" /> : "CHECK DISCOUNT CODE"}
          </button>
          <div onClick={() => { setEdit(false); setVoucher(null) }} className="py-2 px-5 bg-black-1 text-white-1 hover:opacity-80 transition-opacity btn">CANCEL</div>
        </div>
        {mutation.isError && <div className="text-xss text-center text-red-1">{mutation.error.message}</div>}
      </div>
    }
  </div>
}

export default function Page() {
  const [estimatedPrices, setEstimatedPrices] = useState({})
  const [voucher, setVoucher] = useState()
  const { carts } = useCart()

  return <div className="p-10 max-md:p-5 flex flex-col gap-5">
    <div className=" text-4xl text-center">Your Cart</div>
    <div className="">The following products are in your shopping cart:</div>
    <div className="flex gap-5 text-xss max-xl:flex-col relative">
      <div className="grow shrink-0 flex flex-col gap-5 ">
        {carts.map((e, i) => <div key={e._id}><CartItem index={i} setEstimatedPrices={setEstimatedPrices} /></div>)}
        <Discount setVoucher={setVoucher} voucher={voucher} />
      </div>
      <CheckOut estimatedPrices={estimatedPrices} voucher={voucher} />
    </div>
  </div>
}