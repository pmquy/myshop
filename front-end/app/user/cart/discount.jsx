import { VoucherAPI } from "@/apis"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { IoMdCheckbox } from "react-icons/io"

export default function Discount({ setVoucher, voucher }) {
  const [open, setOpen] = useState(false)

  const query = useQuery({
    queryKey: ['vouchers', { q: {} }],
    queryFn: () => VoucherAPI.find({ q: {} }),
    initialData: [],
    enabled: open
  })

  return <div className="p-5 border-y-2 border-white-3 flex flex-col gap-5">
    <div className="flex justify-between">
      <div>Do you have a discount code?</div>
      <div className="btn hover:text-red-1" onClick={() => setOpen(true)}>Enter discount code</div>
    </div>
    {open && <div className=" flex flex-col gap-5">
      {query.data.map(e => <div key={e._id} className="flex gap-5 items-center">
        <IoMdCheckbox onClick={() => setVoucher(e)} className={`w-8 h-8 ${e._id === voucher?._id ? 'text-black-1' : 'text-gray-200'}`}/>
        <div className="flex gap-5 text-nowrap flex-wrap items-end gap-y-2">
          <div><b>Code: </b>{e.code}</div>
          <div><b>Quantity: </b>{e.quantity}</div>
          <div className="text-xs text-green-600 max-w-full overflow-hidden overflow-ellipsis">{e.description}</div>
        </div>
      </div>)}
      <button onClick={() => {setOpen(false); setVoucher(null)}} className="w-max m-auto bg-black-1 text-white-1 px-5 py-2">CANCEL</button>
    </div>}
  </div>
}