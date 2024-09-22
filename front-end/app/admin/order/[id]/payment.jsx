import { PaymentAPI } from "@/apis"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AiOutlineLoading3Quarters } from "react-icons/ai"


function PaymentDetail({ order }) {
  const query = useQuery({
    queryKey: ['payment', order],
    queryFn: () => PaymentAPI.findByOrder(order),
  })

  if (query.isLoading) return <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" />
  if (query.isError) return <div className="p-10 text-center">Payment not found</div>

  const payment = query.data
  return <div className="flex flex-col gap-5">
    <div><b>Base price: </b>${payment.basePrice}</div>
    <div><b>Shipping price: </b>${payment.shippingPrice}</div>
    <div><b>Discount price: </b>${payment.discountPrice}</div>
    <div><b>Final price: </b>${payment.finalPrice}</div>
    <div><b>Status: </b>{payment.status}</div>
  </div>
}

function ConfirmPayment({ order, setStatus }) {
  const mutation = useMutation({
    mutationFn: () => {
      if(confirm("Confirm ?")) return PaymentAPI.confirmPayByOrder(order)
    },
    onSuccess: () => setStatus("Paid")
  })
  return <div className="flex flex-col gap-5 w-max m-auto">
    <button onClick={mutation.mutate} className={`bg-black-1 py-2 px-5 text-white text-center hover:opacity-90 transition-opacity ${mutation.isPending ? ' pointer-events-none' : ''}`}>
      {mutation.isPending ? <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" /> : "COMFIRM PAYMENT"}
    </button>
    {mutation.isError && <div className="text-xss text-center text-red-1">{mutation.error.message}</div>}
  </div>
}

function RevokePayment({ order, setStatus }) {
  const mutation = useMutation({
    mutationFn: () => {
      if(confirm("Confirm ?")) return PaymentAPI.revokePayByOrder(order)
    },
    onSuccess: () => setStatus("Created")
  })
  return <div className="flex flex-col gap-5 w-max m-auto">
    <button onClick={mutation.mutate} className={`bg-black-1 py-2 px-5 text-white text-center hover:opacity-90 transition-opacity ${mutation.isPending ? ' pointer-events-none' : ''}`}>
      {mutation.isPending ? <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" /> : "REVOKE PAYMENT"}
    </button>
    {mutation.isError && <div className="text-xss text-center text-red-1">{mutation.error.message}</div>}
  </div>
}

export default function Payment({ order, status, setStatus }) {
  return <div className="flex flex-col gap-5">
    {status != "Canceled" && <PaymentDetail order={order} />}
    {status == "Created" && <ConfirmPayment order={order} setStatus={setStatus} />}
    {status == "Paid" && <RevokePayment order={order} setStatus={setStatus} />}
  </div>
}