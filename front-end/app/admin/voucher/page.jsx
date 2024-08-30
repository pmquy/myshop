'use client'

import { VoucherAPI } from "@/apis"
import { Input, Select } from "@/ui"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRef, useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

const nav = ["Vouchers", "Create", "Select voucher"]

function SelectVoucher() {
  const searchRef = useRef()
  const codeRef = useRef(), userRef = useRef(), quantityRef = useRef(), typeRef = useRef(), amountRef = useRef(), descriptionRef = useRef()
  const [voucher, setVoucher] = useState()

  const searchMutation = useMutation({
    mutationFn: () => {
      if (!searchRef.current.value) throw new Error("Code is empty")
      return VoucherAPI.findByCode(searchRef.current.value).then(setVoucher)
    }
  })

  const updateMutation = useMutation({
    mutationFn: e => {
      e.preventDefault()
      if (!codeRef.current.value) throw new Error("Code is empty")
      if (!quantityRef.current.value) throw new Error("Quantity is empty")
      if (!typeRef.current.value) throw new Error("Type is empty")
      if (!amountRef.current.value) throw new Error("Amount is empty")
      if (!descriptionRef.current.value) throw new Error("Descripiton is empty")
      return VoucherAPI.updateByCode(voucher.code, {
        code: codeRef.current.value,
        quantity: quantityRef.current.value,
        user: userRef.current.value ? userRef.current.value : undefined,
        type: typeRef.current.value,
        amount: amountRef.current.value,
        description: descriptionRef.current.value
      })
    }
  })

  const deleteMutation = useMutation({
    mutationFn: () => VoucherAPI.deleteByCode(voucher.code).then(setVoucher(null))
  })

  return <div className="flex flex-col gap-5">
    <Input ref={searchRef} placeholder="Input the code" />
    <button onClick={searchMutation.mutate} className={`bg-black-1 text-white-1 w-max m-auto px-5 py-2 hover:opacity-90 ${searchMutation.isPending ? 'pointer-events-none' : ''}`}>
      {searchMutation.isPending ? <AiOutlineLoading3Quarters className="w-6 h-6 animate-loading" /> : "FIND"}
    </button>
    {searchMutation.isError && <div className="text-red-1 text-xss text-center">{searchMutation.error.message}</div>}
    {
      voucher && <form onSubmit={updateMutation.mutate} className="flex flex-col gap-5">
        <Input defaultValue={voucher.code} ref={codeRef} placeholder="Code" />
        <Input defaultValue={voucher.user} ref={userRef} placeholder="User(default for all)" />
        <Input defaultValue={voucher.quantity} ref={quantityRef} placeholder="Quantity" type="number" />
        <Select defaultValue={voucher.type} choices={["Fixed", "Percentage"]} placeholder="Type" ref={typeRef} />
        <Input defaultValue={voucher.amount} ref={amountRef} placeholder="Amount" />
        <Input defaultValue={voucher.description} ref={descriptionRef} placeholder="Description" />
        <button className={`bg-black-1 text-white-1 w-max m-auto px-5 py-2 hover:opacity-90 ${updateMutation.isPending ? 'pointer-events-none' : ''}`}>
          {updateMutation.isPending ? <AiOutlineLoading3Quarters className="w-6 h-6 animate-loading" /> : "UPDATE"}
        </button>
        {updateMutation.isError && <div className="text-red-1 text-xss text-center">{updateMutation.error.message}</div>}
      </form>
    }
    {voucher && <div className="flex flex-col gap-5">
      <button onClick={deleteMutation.mutate} className={`bg-red-1 text-white-1 w-max m-auto px-5 py-2 hover:opacity-90 ${deleteMutation.isPending ? 'pointer-events-none' : ''}`}>
        {deleteMutation.isPending ? <AiOutlineLoading3Quarters className="w-6 h-6 animate-loading" /> : "DELETE"}
      </button>
      {deleteMutation.isError && <div className="text-red-1 text-xss text-center">{deleteMutation.error.message}</div>}
    </div>}
  </div>
}

function Vouchers() {
  const query = useQuery({
    queryKey: ['vouchers', { q: {} }],
    queryFn: () => VoucherAPI.find({ q: {} }),
    initialData: []
  })

  return <div className="flex flex-col gap-10">
    {query.data.map(e => <div key={e._id} className="flex flex-wrap gap-5">
      <div><b>Code: </b>{e.code}</div>
      <div><b>Users: </b>{e.user}</div>
      <div><b>Quantity: </b>{e.quantity}</div>
      <div><b>Type: </b>{e.type}</div>
      <div><b>Amount: </b>{e.amount}</div>
      <div><b>Description: </b>{e.description}</div>
    </div>)}
  </div>
}

function Create() {
  const codeRef = useRef(), userRef = useRef(), quantityRef = useRef(), typeRef = useRef(), amountRef = useRef(), descriptionRef = useRef()

  const mutation = useMutation({
    mutationFn: e => {
      e.preventDefault()
      if (!codeRef.current.value) throw new Error("Code is empty")
      if (!quantityRef.current.value) throw new Error("Quantity is empty")
      if (!typeRef.current.value) throw new Error("Type is empty")
      if (!amountRef.current.value) throw new Error("Amount is empty")
      if (!descriptionRef.current.value) throw new Error("Descripiton is empty")
      return VoucherAPI.create({
        code: codeRef.current.value,
        quantity: quantityRef.current.value,
        user: userRef.current.value ? userRef.current.value : undefined,
        type: typeRef.current.value,
        amount: amountRef.current.value,
        description: descriptionRef.current.value
      })
    }
  })

  return <form onSubmit={mutation.mutate} className="flex flex-col gap-5">
    <Input ref={codeRef} placeholder="Code" />
    <Input ref={userRef} placeholder="User(default for all)" />
    <Input ref={quantityRef} placeholder="Quantity" defaultValue={1} type="number" />
    <Select choices={["Fixed", "Percentage"]} placeholder="Type" ref={typeRef} />
    <Input ref={amountRef} placeholder="Amount" />
    <Input ref={descriptionRef} placeholder="Description" />
    <button className={`bg-black-1 text-white-1 w-max m-auto px-5 py-2 hover:opacity-90 ${mutation.isPending ? 'pointer-events-none' : ''}`}>
      {mutation.isPending ? <AiOutlineLoading3Quarters className="w-6 h-6 animate-loading" /> : "CREATE"}
    </button>
    {mutation.isError && <div className="text-red-1 text-xss text-center">{mutation.error.message}</div>}
  </form>
}

export default function Page() {
  const [index, setIndex] = useState(0)

  return <div className="bg-white-4 py-10 lg:px-10">
    <div className="text-4xl font-semibold text-center py-10">Vouchers</div>
    <div className="flex gap-10 font-semibold overflow-y-auto py-5 px-10">
      {nav.map((e, i) => <div key={i} onClick={() => setIndex(i)} className={` ${index == i ? 'text-red-1' : 'hover:text-red-1'} shrink-0 btn`}>{e}</div>)}
    </div>
    <div className="p-10 bg-white-1">
      {index === 0 && <Vouchers />}
      {index === 1 && <Create />}
      {index === 2 && <SelectVoucher />}
    </div>
  </div>
}