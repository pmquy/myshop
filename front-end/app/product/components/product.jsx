'use client'
import { useQuery } from '@tanstack/react-query'
import { ProductAPI } from '@/apis'
import { useProduct } from '../hooks'

export default function Product({ _id }) {

  const { designers } = useProduct()

  const query = useQuery({
    queryKey: ['product', _id],
    queryFn: () => ProductAPI.findById(_id),
    staleTime: Infinity,
  })

  if (query.isLoading || query.isError) return <></>

  const product = query.data

  return <div title={product.name} className="p-5 normal-card group flex flex-col gap-2 h-full w-full">
    <div className="grow max-w-max max-h-max overflow-hidden">
      <img className=" w-full group-hover:scale-110 transition-transform" src={product.avatar}></img>
    </div>
    <div className=" font-semibold text-center max-w-full overflow-hidden overflow-ellipsis text-nowrap">{product.name}</div>
    <div className="text-center max-w-full overflow-hidden overflow-ellipsis  text-nowrap">{designers.find(e => e._id == product.designer)?.name}</div>
    <div className="text-center max-w-full overflow-hidden overflow-ellipsis  text-nowrap">From USD {product.price}</div>
  </div>
}