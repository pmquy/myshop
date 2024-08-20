'use client'
import { useQuery } from '@tanstack/react-query'
import { ProductAPI } from '@/apis'

export default function Product({ _id }) {

  const query = useQuery({
    queryKey: ['product', _id],
    queryFn: () => ProductAPI.findById(_id),
    staleTime: Infinity,
  })

  if (query.isLoading || query.isError) return <></>

  const product = query.data

  return <div className="p-5 normal-card group flex flex-col gap-2">
    <img className=" w-full group-hover:scale-105 transition-transform" src={product.avatar}></img>
    <div className=" font-semibold text-center max-w-full overflow-hidden overflow-ellipsis  text-nowrap">{product.name}</div>
    <div className="text-center max-w-full overflow-hidden overflow-ellipsis  text-nowrap">{product.designer.name}</div>
    <div className="text-center max-w-full overflow-hidden overflow-ellipsis  text-nowrap">From USD {product.price}</div>
  </div>
}