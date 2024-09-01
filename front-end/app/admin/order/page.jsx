'use client'
import { OrderAPI, PaymentAPI } from "@/apis"
import { parseDate } from "@/utils"
import { useMutation, useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { useRef, useState } from "react"
import { Line } from "react-chartjs-2"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

const nav = ['Order charts', 'Payment charts', "Orders"]

function Orders() {
  const query = useQuery({
    queryKey: ['orders', { q: {} }],
    queryFn: () => OrderAPI.find({ q: {} }),
    initialData: []
  })
  
  const orders = query.data
  
  return <div className="flex gap-10">
    <div className="flex flex-col gap-5 grow">
      <div className="text-xl font-semibold text-red-1">All orders</div>
      {orders.length == 0 && <div className="">No orders found.</div>}
      {
        orders.map(e => <div key={e._id}>
          <div className="text-xss">Order <Link className="underline text-grey-1 hover:text-red-1" href={`/admin/order/${e._id}`}>{e._id}</Link></div>
        </div>)
      }
    </div>
    <div className="flex flex-col gap-5">
      <div className="text-xl font-semibold text-red-1">Status</div>
      {
        orders.map(e => <div key={e._id}>
          <div className="text-xss">{e.status}</div>
        </div>)
      }
    </div>
    <div className="flex flex-col gap-5">
      <div className="text-xl font-semibold text-red-1">Created at</div>
      {
        orders.map(e => <div key={e._id}>
          <div className="text-xss">{parseDate(e.createdAt)}</div>
        </div>)
      }
    </div>
  </div>
}

function PaymentCharts() {

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

function OrderCharts() {

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
      {index === 0 && <OrderCharts />}
      {index === 1 && <PaymentCharts />}
      {index === 2 && <Orders />}
    </div>
  </div>
}