'use client'
import { useProduct } from '../hooks'
import { memo } from 'react'

const Product = memo(function ({ product }) {
  const { designers } = useProduct()
  return <div title={product.name} className="p-5 normal-card group flex flex-col gap-2 h-full w-full">
    <div className="grow max-w-max max-h-max overflow-hidden">
      <img className=" w-full group-hover:scale-110 transition-transform" src={product.avatar}></img>
    </div>
    <div className=" font-semibold text-center max-w-full overflow-hidden overflow-ellipsis text-nowrap">{product.name}</div>
    <div className="text-center max-w-full overflow-hidden overflow-ellipsis  text-nowrap">{designers.find(e => e._id == product.designer)?.name}</div>
    <div className="text-center max-w-full overflow-hidden overflow-ellipsis  text-nowrap">From USD {product.price}</div>
  </div>
})

Product.displayName = "Product"

export default Product