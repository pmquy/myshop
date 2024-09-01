import { parseDate } from "@/utils"

export default function Summary({ order, status }) {
  return <div className="flex gap-10 justify-between">
    <div className="flex flex-col gap-5 basis-1/2">
      <div className="text-xl font-semibold text-red-1">Summary</div>
      <div><b>Order: </b>{order._id}</div>
      <div><b>User: </b>{order.user}</div>
      <div><b>Status: </b>{status}</div>
      <div><b>Created at: </b>{parseDate(order.createdAt)}</div>
      <div><b>Updated at: </b>{parseDate(order.updatedAt)}</div>
    </div>
    <div className="flex flex-col gap-5 basis-1/2">
      <div className="text-xl font-semibold text-red-1">Shipping address</div>
      <div className="">{order.address.salutation + ' ' + order.address.firstName + ' ' + order.address.lastName}</div>
      <div className=""><b>Phone: </b>{order.address.phoneNumber}</div>
      <div className=""><b>Detail: </b>{order.address.detail}</div>
      <div className=""><b>Ward: </b>{order.address.ward}</div>
      <div className=""><b>District: </b>{order.address.district}</div>
      <div className=""><b>Province: </b>{order.address.province}</div>
      <div className=""><b>Province: </b>{order.address.province}</div>
      <div className=""><b>Note: </b>{order.note}</div>
    </div>
  </div>
}