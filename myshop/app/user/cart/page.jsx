'use client'

import { useEffect, useMemo, useRef, useState } from "react"
import { useCart } from "./hooks"
import { Configure } from "@/app/product/detail/components"
import { IoMdClose } from "react-icons/io"
import Link from "next/link"
import { RiDeleteBinLine } from "react-icons/ri";
import Checkbox from "@/app/ui/checkbox"
import Input from "@/app/ui/input"

function Item({ item, setEstimatedPrices }) {
  const { API } = useCart()
  const [edit, setEdit] = useState(false)
  const [quantity, setQuantity] = useState(item.quantity)
  const [option, setOption] = useState(item.option)
  const [checked, setChecked] = useState(true)
  const chooseRef = useRef()

  const estimatedPrice = useMemo(() => {
    return Object.keys(option).reduce((prev, cur) => prev + item.product.option[cur][option[cur]].price, item.product.price) * quantity
  }, [option, quantity])

  useEffect(() => {
    if (checked) {
      setEstimatedPrices(prev => { return { ...prev, [item._id]: estimatedPrice } })
      return () => setEstimatedPrices(prev => { delete prev[item._id]; return { ...prev } })
    }
  }, [estimatedPrice, checked])

  useEffect(() => {
    if (edit) document.body.style.overflowY = 'hidden'
    return () => document.body.style.overflowY = 'auto'
  }, [edit])

  useEffect(() => {
    API.CartApi.updateById(item._id, { quantity: quantity })
  }, [quantity])

  useEffect(() => {
    API.CartApi.updateById(item._id, { option: option })
  }, [option])

  return <div className="p-5">
    {edit && <div className=" fixed z-10 top-0 left-0 h-screen w-screen bg-black-1 bg-opacity-80">
      <div className="absolute w-[90%] max-h-[90%] max-md:w-full max-md:max-h-full overflow-y-auto left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <IoMdClose className=" w-8 h-8 text-grey-1 hover:text-red-1 absolute right-2 top-2" onClick={() => setEdit(false)} />
        <Configure product={item.product} initalOption={item.option} handleSubmit={({ option }) => { setOption(option); setEdit(false) }} />
      </div>
    </div>}
    <div className=" flex max-md:flex-col gap-5 items-center">
      <div className="flex gap-5 items-center">
        <Checkbox onClick={() => setChecked(!checked)} checked={checked} ref={chooseRef} />
        <RiDeleteBinLine className="w-6 h-6 hover:text-red-1" />
        <img src={item.product.avatar} className="w-60"></img>
      </div>
      <div className="flex flex-col gap-2">
        <Link href={'/product/detail/' + item.product.name}><div className="text-xl font-semibold hover:text-red-1">{item.product.name}</div></Link>
        {Object.keys(option).map((e, i) => <div key={i}><b className=" capitalize">{e}: </b>{item.product.option[e][option[e]].name}</div>)}
        <div onClick={() => setEdit(true)} className="text-grey-1 hover:text-red-1 btn">Edit Configuration</div>
        <div className="w-max flex gap-5 items-center">
          <b>Quantity: </b>
          <div className="flex items-center border-2 border-white-3 text-base">
            <div onClick={() => setQuantity(t => Math.max(1, t - 1))} className=" w-6 h-6 content-center text-center border-r-2 btn">-</div>
            <div className=" w-6 h-6 content-center text-center">{quantity}</div>
            <div onClick={() => setQuantity(t => t + 1)} className="w-6 h-6 content-center text-center border-l-2 btn">+</div>
          </div>
        </div>
        <div><b>Estimated Price: </b>${estimatedPrice}</div>
      </div>
    </div>
  </div>
}

function CheckOut({ estimatedPrices, discount }) {

  const price = useMemo(() => {
    let total = Object.keys(estimatedPrices).reduce((prev, cur) => prev + estimatedPrices[cur], 0)
    let ship = 50
    let after = total + ship
    let voucher = discount?.value

    if (discount?.status == 'success') {
      if (discount.value[discount.value.length - 1] == '%') {
        after = Math.max(0, after - Number.parseFloat(discount.value) / 100 * after)
      } else {
        after = Math.max(0, after - Number.parseFloat(discount.value))
      }
    }
    after = Math.ceil(after)
    return { total, voucher, after, ship }
  }, [estimatedPrices, discount])

  const handleCheckOut = () => {
    const data = { items: Object.keys(estimatedPrices) }
    if(discount?.status == 'success') data.code = discount.code
    console.log(data)
  }


  return <div className="min-w-96 h-max sticky top-[85px] box-border p-5 bg-white-3 flex flex-col gap-5">
    <div className="flex justify-between text-xss">
      <div>Subtotal</div>
      <div>${price.total}</div>
    </div>
    <div className="flex justify-between text-xss">
      <div>Shipping </div>
      <div>${price.ship}</div>
    </div>
    {
      price.voucher && <div className="flex justify-between text-xss">
        <div>Voucher</div>
        <div>-{price.voucher}</div>
      </div>
    }
    <div className="flex justify-between text-xss font-semibold">
      <div>Total</div>
      <div>${price.after}</div>
    </div>

    <div onClick={handleCheckOut} className="bg-black-1 py-2 hover:opacity-90 transition-opacity text-center font-semibold btn text-white-1">CHECK OUT</div>
  </div>
}

function Discount({ setDiscount, discount }) {
  const { API } = useCart()
  const [edit, setEdit] = useState(false)
  const ref = useRef()

  const handleCheck = () => {
    API.CartApi.checkDiscount(ref.current.value)
      .then(val => setDiscount(val))
  }

  return <div className="py-5 border-y-2 border-white-3 flex flex-col gap-5">
    <div className="flex justify-between">
      <div>Do you have a discount code?</div>
      <div className="btn hover:text-red-1" onClick={() => setEdit(true)}>Enter discount code</div>
    </div>
    {
      edit && <div className=" flex flex-col gap-5">
        <Input ref={ref} placeholder="Enter your discount here" />
        {discount?.status == 'wrong' && <div className="text-xss text-red-1">{discount.info}</div>}
        {discount?.status == 'success' && <div className="text-xss text-green-600">{discount.info}</div>}
        <div className="flex gap-5">
          <div onClick={handleCheck} className="py-2 px-5 bg-black-1 text-white-1 hover:opacity-80 transition-opacity btn">CHECK DISCOUNT CODE</div>
          <div onClick={() => { setEdit(false); setDiscount(null) }} className="py-2 px-5 bg-black-1 text-white-1 hover:opacity-80 transition-opacity btn">CANCEL</div>
        </div>
      </div>
    }
  </div>
}


export default function Page() {
  const [estimatedPrices, setEstimatedPrices] = useState({})
  const [discount, setDiscount] = useState()
  const { carts } = useCart()

  return <div className="p-10 max-md:p-5 flex flex-col gap-5">
    <div className=" text-4xl text-center">Your Cart</div>
    <div className=" text-xss">The following products are in your shopping cart:</div>
    <div className="flex gap-5 text-xss max-xl:flex-col">
      <div className="grow shrink-0 flex flex-col gap-5 border-t-2 border-white-3">
        {carts.map((e, i) => <div key={e._id}><Item estimatedPrices={estimatedPrices} item={e} setEstimatedPrices={setEstimatedPrices} /></div>)}
        <Discount setDiscount={setDiscount} discount={discount} />
      </div>
      <CheckOut estimatedPrices={estimatedPrices} discount={discount} />
    </div>
  </div>
}