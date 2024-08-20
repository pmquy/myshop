'use client'

import { OrderAPI, PaymentAPI, ProductAPI } from "@/apis"
import { parseDate } from "@/utils"
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useMemo, useState } from "react"

const nav = ['Summary', 'Items', 'Address', 'Payment', 'Shipping']

function Summary({ order, payment }) {

  return <div className="flex flex-col gap-5">
    <div><b>Order: </b>{order._id}</div>
    <div><b>Created at: </b>{parseDate(order.createdAt)}</div>
    <div><b>Status: </b>{order.status}</div>
    <div><b>Code: </b>{order.code ? order.code : 'NONE'}</div>
    {order.status != 'Canceled' && <div><b>Final price : </b>${payment.finalPrice}</div>}
    <div>
      <b>Shipping address: </b>
      <div className="text-xss">{order.address.salutation + ' ' + order.address.firstName + ' ' + order.address.lastName + ' - ' + order.address.phoneNumber}</div>
      <div className="text-xss">{order.address.detail + ', ' + order.address.ward + ', ' + order.address.district + ', ' + order.address.province}</div>
    </div>
    <div><b>Note: </b>{order.note}</div>
  </div>
}

function Item({ item }) {
  const query = useQuery({
    queryKey: ['product', item.product],
    queryFn: () => ProductAPI.findById(item.product)
  })

  const product = query.data

  const estimatedPrice = useMemo(() => {
    if (product) return Object.entries(item.option).reduce((prev, [key, val]) => prev + product.options[key][val].price, product.price) * item.quantity
  }, [product])

  if (query.isLoading || query.isError) return <div></div>


  return <div className="p-5 flex flex-col gap-2 text-xss">
    <img src={product.avatar} className="w-60"></img>
    <Link href={'/product/detail/' + product._id}><div className="text-xl font-semibold hover:text-red-1">{product.name}</div></Link>
    {Object.keys(item.option).map((e, i) => <div key={i}><b className="capitalize">{e}: </b>{product.options[e][item.option[e]].name}</div>)}
    <div><b>Quantity: </b>{item.quantity}</div>
    <div><b>Estimated price: </b>{estimatedPrice}</div>
  </div>
}

function Address({ address }) {
  return <div className={`flex flex-col gap-5`}>
    <div className=" font-semibold">{address.salutation + ' ' + address.firstName + ' ' + address.lastName}</div>
    <div className=""><b>Phone: </b>{address.phoneNumber}</div>
    <div className=""><b>Detail: </b>{address.detail}</div>
    <div className=""><b>Ward: </b>{address.ward}</div>
    <div className=""><b>District: </b>{address.district}</div>
    <div className=""><b>Province: </b>{address.province}</div>
  </div>
}

function Payment({ payment }) {

  const handleCancel = () => {
    OrderAPI.cancelById(payment.order).catch(err => alert(err.message))
  }

  const handlePay = () => {
    PaymentAPI.payById(payment._id).catch(err => alert(err.message))
  }

  return <div className="flex flex-col gap-5">
    <div><b>Payment id: </b>{payment._id}</div>
    <div><b>Base price: </b>${payment.basePrice}</div>
    <div><b>Shipping price: </b>${payment.shippingPrice}</div>
    <div><b>Discount price: </b>${payment.discountPrice}</div>
    <div><b>Final price: </b>${payment.finalPrice}</div>
    <div><b>Status: </b>{payment.status}</div>
    <div><b>Created at: </b>{parseDate(payment.createdAt)}</div>
    {payment.status == 'Done' && <div><b>Paid at: </b>{parseDate(payment.updatedAt)}</div>}
    {payment.status === 'Created' && <div className="flex gap-5">
      <div onClick={handlePay} className="btn py-2 px-5 bg-black-1 hover:opacity-90 transition-opacity text-white-1 w-max">CLICK TO PAY</div>
      <div onClick={handleCancel} className="btn py-2 px-5 bg-black-1 hover:opacity-90 transition-opacity text-white-1 w-max">CANCEL ORDER</div>
    </div>}
  </div>
}

export default function Page() {
  const [index, setIndex] = useState(0)
  const params = useParams()

  const query = useQueries({
    queries: [
      {
        queryKey: ['order', params.id],
        queryFn: () => OrderAPI.findById(params.id)
      },
      {
        queryKey: ['payment', { order: params.id }],
        queryFn: () => PaymentAPI.find({ order: params.id })
      }
    ]
  })

  return <div className="bg-white-4 lg:px-5 py-10">
    <div className="text-4xl font-semibold text-center py-10 max-md:text-xl">Order {params.id}</div>

    <div className="flex gap-10 font-semibold overflow-y-auto py-5 px-10">
      {nav.map((e, i) => <div key={i} onClick={() => setIndex(i)} className={` ${index == i ? 'text-red-1' : 'hover:text-red-1'} shrink-0 btn`}>{e}</div>)}
    </div>

    {query.every(e => e.isSuccess) && <div className="p-10 bg-white flex flex-col gap-5">

      {index === 0 && <Summary order={query[0].data} payment={query[1].data[0]} />}

      {index === 1 && <div style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }} className="grid gap-5">
        {query[0].data.items.map((e, i) => <div className="m-auto" key={i}>
          <Item item={e} />
        </div>)}
      </div>}

      {index === 2 && <Address address={query[0].data.address} />}

      {index === 3 && (query[0].data.status === 'Canceled' ? <div>The order was canceled</div> : <Payment payment={query[1].data[0]} />)}
    </div>}
  </div>
}