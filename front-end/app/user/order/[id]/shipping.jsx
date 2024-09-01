import { ShippingAPI } from "@/apis"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

function Tracking({ order }) {
  const query = useQuery({
    queryKey: ['tracking', order],
    queryFn: () => ShippingAPI.trackByOrder(order),
  })

  if (query.isLoading) return <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" />
  if (query.isError) return <div className="p-10 text-center">Tracking not found</div>

  const tracking = query.data

  return <div className="flex flex-col gap-5">
    {tracking}
  </div>
}

function ConfirmShipment({ order, setStatus}) {
  const mutation = useMutation({
    mutationFn: () => { if (confirm("Confirm receiving order")) return ShippingAPI.confirmByOrder(order) },
    onSuccess: () => setStatus("Done")
  })
  return <div className="flex flex-col gap-5">
    <button onClick={mutation.mutate} className={`bg-black-1 w-max m-auto py-2 px-5 text-white text-center hover:opacity-90 transition-opacity ${mutation.isPending ? ' pointer-events-none' : ''}`}>
      {mutation.isPending ? <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" /> : "CONFIRM SHIPMENT"}
    </button>
    {mutation.isError && <div className="text-xss text-center text-red-1">{mutation.error.message}</div>}
  </div>
}

export default function Shipping({ order, status, setStatus }) {
  return <div className="flex flex-col gap-5">
    {(status === "Shipping"  || status === "Done") && <Tracking order={order}/>}
    {status === "Shipping" && <ConfirmShipment order={order} setStatus={setStatus}/>}
  </div>
}