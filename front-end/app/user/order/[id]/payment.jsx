import { OrderAPI, PaymentAPI } from "@/apis"
import { parseDate } from "@/utils"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

function PaymentDetail({ order, status }) {
  const query = useQuery({
    queryKey: ['payment', order],
    queryFn: () => PaymentAPI.findByOrder(order),
  })

  if (query.isLoading) return <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" />
  if (query.isError) return <div className="p-10 text-center">Payment not found</div>

  const payment = query.data

  return <div className="flex flex-col gap-5">
    <div><b>Payment id: </b>{payment._id}</div>
    <div><b>Base price: </b>${payment.basePrice}</div>
    <div><b>Shipping price: </b>${payment.shippingPrice}</div>
    <div><b>Discount price: </b>${payment.discountPrice}</div>
    <div><b>Final price: </b>${payment.finalPrice}</div>
    <div><b>Status: </b>{payment.status}</div>
    <div><b>Created at: </b>{parseDate(payment.createdAt)}</div>
    {status === 'Paid' && <div><b>Paid at: </b>{parseDate(payment.updatedAt)}</div>}
  </div>
}

function CancelOrder({ order, setStatus }) {
  const mutation = useMutation({
    mutationFn: () => OrderAPI.cancelById(order),
    onSuccess: () => setStatus("Canceled")
  })
  return <div className="flex flex-col gap-5">
    <button onClick={mutation.mutate} className={`bg-black-1 w-max m-auto py-2 px-5 text-white text-center hover:opacity-90 transition-opacity ${mutation.isPending ? ' pointer-events-none' : ''}`}>
      {mutation.isPending ? <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" /> : "CANCLE ORDER"}
    </button>
    {mutation.isError && <div className="text-xss text-center text-red-1">{mutation.error.message}</div>}
  </div>
}

export default function Payment({ order, status, setStatus }) {
  return <div className="flex flex-col gap-5">
    {status != "Canceled" && <PaymentDetail status={status} order={order._id} />}
    {status === "Created" && <CancelOrder order={order._id} setStatus={setStatus} />}
  </div>
}