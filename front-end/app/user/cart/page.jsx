'use client'

import { useState } from "react"
import { useCart } from "./hooks"
import Discount from "./discount"
import CartItem from "./item"
import CheckOut from "./checkout"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

export default function Page() {
  const [estimatedPrices, setEstimatedPrices] = useState({})
  const [voucher, setVoucher] = useState()
  const { carts, loadMutation, hasMoreRef} = useCart()

  return <div className="p-10 max-md:p-5 flex flex-col gap-5">
    <div className=" text-4xl text-center">Your Cart</div>
    <div className="">The following products are in your shopping cart:</div>
    <div className="flex gap-5 text-xss max-xl:flex-col relative">
      <div className="grow flex flex-col gap-5 ">
        {carts.map((e, i) => <div key={e._id}><CartItem index={i} setEstimatedPrices={setEstimatedPrices} /></div>)}
        {carts.length === 0 && <div className="mx-auto">Cart is empty</div>}
        {hasMoreRef.current && <button onClick={loadMutation.mutate} className="text-grey-1 hover:text-red-1 btn w-max mx-auto">{loadMutation.isPending ? <AiOutlineLoading3Quarters className="animate-loading" /> : "Load more"}</button>}
        <Discount setVoucher={setVoucher} voucher={voucher} />
      </div>
      <CheckOut estimatedPrices={estimatedPrices} voucher={voucher} />
    </div>
  </div>
}