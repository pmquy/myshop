import { ShippingAPI } from "@/apis"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { useEffect, useRef, useState } from "react"
import { Input, Select } from "@/ui"
import { IoCloseCircle } from "react-icons/io5"

function CreateShipment({ order, setStatus }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto'
    return () => document.body.style.overflow = 'auto'
  }, [open])
  const shippingCode = useRef(), providerRef = useRef()

  const mutation = useMutation({
    mutationFn: () => {
      if (!shippingCode.current.value) throw new Error("Shipping code is empty")
      if (!providerRef.current.value) throw new Error("Provider is empty")
      if (confirm("Create a shipmemt"))
        return ShippingAPI.create({
          order: order._id,
          user: order.user,
          shippingCode: shippingCode.current.value,
          provider: providerRef.current.value
        })
    },
    onSuccess: () => setStatus("Shipping")
  })

  return <div className="">
    {open && <div className="fixed top-0 left-0 w-screen h-screen bg-black-1 bg-opacity-60 z-10">
      <div className="p-10 bg-white-1 w-72 flex-col gap-5 flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg">
        <IoCloseCircle className="w-8 h-8 absolute right-2 top-2" onClick={() => setOpen(false)} />
        <Input ref={shippingCode} placeholder="Shipping code" />
        <Select ref={providerRef} placeholder="Select provider" choices={["GHN", "GHTK", "VNPOST", "VTPOST", "J&T"]} />
        <button onClick={mutation.mutate} className={`bg-black-1 py-2 px-5 text-white text-center hover:opacity-90 transition-opacity ${mutation.isPending ? ' pointer-events-none' : ''}`}>
          {mutation.isPending ? <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" /> : "CREATE SHIPMENT"}
        </button>
        {mutation.isError && <div className="text-xss text-center text-red-1">{mutation.error.message}</div>}
      </div>
    </div>}
    <button onClick={() => setOpen(true)} className="bg-black-1 m-auto w-max py-2 px-5 text-white text-center hover:opacity-90 transition-opacity">CREATE A SHIPMENT</button>
  </div>
}

function ShippingDetail({ order }) {
  const query = useQuery({
    queryKey: ['shipping', order],
    queryFn: () => ShippingAPI.findByOrder(order)
  })

  const shippingCode = useRef(), providerRef = useRef()

  const mutation = useMutation({
    mutationFn: () => {
      if (!shippingCode.current.value) throw new Error("Shipping code is empty")
      if (!providerRef.current.value) throw new Error("Provider is empty")
      if (confirm("Update ?"))
        return ShippingAPI.updateByOrder(order, {
          shippingCode: shippingCode.current.value,
          provider: providerRef.current.value
        })
    }
  })

  if (query.isLoading) return <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" />
  if (query.isError) return <div className="p-10 text-center">Shipment not found</div>

  const shipping = query.data

  return <div className="flex flex-col gap-5 w-72">
    <Input ref={shippingCode} placeholder="Shipping code" defaultValue={shipping.shippingCode} />
    <Select ref={providerRef} placeholder="Select provider" defaultValue={shipping.provider} choices={["GHN", "GHTK", "VNPOST", "VTPOST", "J&T"]} />
    <button onClick={mutation.mutate} className={`bg-black-1 py-2 px-5 text-white text-center hover:opacity-90 transition-opacity ${mutation.isPending ? ' pointer-events-none' : ''}`}>
      {mutation.isPending ? <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" /> : "UPDATE SHIPMENT"}
    </button>
    {mutation.isError && <div className="text-xss text-center text-red-1">{mutation.error.message}</div>}
  </div>
}

export default function Shipping({ order, status, setStatus }) {
  return <div>
    {status === "Paid" && <CreateShipment order={order} setStatus={setStatus} />}
    {status === "Shipping" && <ShippingDetail order={order._id} />}
  </div>
}