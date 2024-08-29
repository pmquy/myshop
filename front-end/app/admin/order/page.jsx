'use client'
import { OrderAPI, PaymentAPI } from "@/apis"
import { useMutation } from "@tanstack/react-query"
import { useMemo, useRef, useState } from "react"
import { Line } from "react-chartjs-2"
import * as DateUtils from "@/utils/date"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { Input } from "@/ui"

const nav = ['Order Summary', 'Payment Summary', 'Order detail']

function OrderDetail() {
  const idRef = useRef()
  const [order, setOrder] = useState()
  const [payment, setPayment] = useState()

  const searchMutation = useMutation({
    mutationFn: async e => {
      e.preventDefault()
      setOrder(await OrderAPI.findById(idRef.current.value))
      setPayment((await PaymentAPI.find({ order: idRef.current.value }))[0])
    }
  })

  const cancelMutation = useMutation({
    mutationFn: () => {
      if (confirm("Cancel this order"))
        return OrderAPI.cancelById(order._id)
    }
  })

  const payMutation = useMutation({
    mutationFn: () => {
      if (confirm("Confirm this order payment"))
        return PaymentAPI.payById(payment._id)
    }
  })

  return <div className="flex flex-col gap-5">
    <form onSubmit={searchMutation.mutate} className="flex gap-5 items-center">
      <Input className="grow" placeholder="Order id" ref={idRef} />
      <button onClick={searchMutation.mutate} className={`bg-black-1 py-2 px-5 w-max m-auto text-white text-center hover:opacity-90 transition-opacity ${searchMutation.isPending ? ' pointer-events-none' : ''}`}>
        {searchMutation.isPending ? <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" /> : "SEARCH"}
      </button>
    </form>
    {searchMutation.isError && <div className="text-xss text-center text-red-1">{searchMutation.error.message}</div>}
    {
      searchMutation.isSuccess && <div className="flex flex-col gap-5">
        <div><b>Order: </b>{order._id}</div>
        <div><b>User: </b>{order.user}</div>
        <div><b>Status: </b>{order.status}</div>
        <div><b>Created at: </b>{DateUtils.parseDate(order.createdAt)}</div>
        <div><b>Last change: </b>{DateUtils.parseDate(order.updatedAt)}</div>
        <div><b>Base price: </b>${payment.basePrice}</div>
        <div><b>Shipping price: </b>${payment.shippingPrice}</div>
        <div><b>Discount price: </b>${payment.discountPrice}</div>
        <div><b>Final price: </b>${payment.finalPrice}</div>
      </div>
    }
    {
      order?.status === 'Created' && <div className="flex justify-start gap-5">
        <button onClick={cancelMutation.mutate} className={`bg-red-1 py-2 px-5 w-max m-auto text-white text-center hover:opacity-90 transition-opacity ${cancelMutation.isPending ? ' pointer-events-none' : ''}`}>
          {cancelMutation.isPending ? <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" /> : "Cancel"}
        </button>
        <button onClick={payMutation.mutate} className={`bg-black-1 py-2 px-5 w-max m-auto text-white text-center hover:opacity-90 transition-opacity ${payMutation.isPending ? ' pointer-events-none' : ''}`}>
          {payMutation.isPending ? <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" /> : "Pay"}
        </button>
      </div>
    }
  </div>

}

function PaymentSummary() {

  const startAtRef = useRef(), endAtRef = useRef()
  const [summary1, setSummary1] = useState({ labels: [], datasets: [] })

  const searchMutation = useMutation({
    mutationFn: async () => {
      if (!startAtRef.current.value || !endAtRef.current.value) throw new Error("Please select start and end date")
      await PaymentAPI.summary1({ startAt: startAtRef.current.value, endAt: endAtRef.current.value }).then(setSummary1)
    },
  })

  return <div className="flex flex-col gap-5">
    <div className="flex flex-col gap-5">
      <div className="flex gap-5">
        <div>Start at</div>
        <input required={true} type="date" ref={startAtRef} />
      </div>
      <div className="flex gap-5">
        <div>End at</div>
        <input required={true} type="date" ref={endAtRef} />
      </div>
      <button onClick={searchMutation.mutate} className={`bg-black-1 py-2 px-5 w-max m-auto text-white text-center hover:opacity-90 transition-opacity ${searchMutation.isPending ? ' pointer-events-none' : ''}`}>
        {searchMutation.isPending ? <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" /> : "SEARCH"}
      </button>
      {searchMutation.isError && <div className="text-xss text-center text-red-1">{searchMutation.error.message}</div>}
    </div>

    <Line
      options={{
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'The payment summary',
          },
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'Price'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Time'
            }
          },
        }
      }}

      data={{
        labels: summary1.labels,
        datasets: summary1.datasets
      }}

    />
  </div>
}

function OrderSummary() {

  const startAtRef = useRef(), endAtRef = useRef()
  const [summary1, setSummary1] = useState({ labels: [], datasets: [] })


  const searchMutation = useMutation({
    mutationFn: async () => {
      if (!startAtRef.current.value || !endAtRef.current.value) throw new Error("Please select start and end date")
      await OrderAPI.summary1({ startAt: startAtRef.current.value, endAt: endAtRef.current.value }).then(setSummary1)
    },
  })

  return <div className="flex flex-col gap-5">
    <div className="flex flex-col gap-5">
      <div className="flex gap-5">
        <div>Start at</div>
        <input required={true} type="date" ref={startAtRef} />
      </div>
      <div className="flex gap-5">
        <div>End at</div>
        <input required={true} type="date" ref={endAtRef} />
      </div>
      <button onClick={searchMutation.mutate} className={`bg-black-1 py-2 px-5 w-max m-auto text-white text-center hover:opacity-90 transition-opacity ${searchMutation.isPending ? ' pointer-events-none' : ''}`}>
        {searchMutation.isPending ? <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" /> : "SEARCH"}
      </button>
      {searchMutation.isError && <div className="text-xss text-center text-red-1">{searchMutation.error.message}</div>}
    </div>

    <Line
      options={{
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'The order summary',
          },
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'Quantity of orders'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Time'
            }
          },
        }
      }}

      data={{
        labels: summary1.labels,
        datasets: summary1.datasets
      }}

    />
  </div>
}

export default function Page() {

  const [index, setIndex] = useState(0)

  return <div className="bg-white-4 py-10 lg:px-10">
    <div className="text-4xl font-semibold text-center py-10">Order</div>
    <div className="flex gap-10 font-semibold overflow-y-auto py-5 px-10">
      {nav.map((e, i) => <div key={i} onClick={() => setIndex(i)} className={` ${index == i ? 'text-red-1' : 'hover:text-red-1'} shrink-0 btn`}>{e}</div>)}
    </div>
    <div className="p-10 bg-white-1">
      {index === 0 && <OrderSummary />}
      {index === 1 && <PaymentSummary />}
      {index === 2 && <OrderDetail />}
    </div>
  </div>
}