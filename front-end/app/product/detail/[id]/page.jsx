'use client'

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useMetaData } from "@/app/hooks";
import { CartAPI, ProductAPI } from "@/apis";
import { ProductDetail } from "../components";
import Link from 'next/link'

const goTo = id => {
  var top = document.getElementById(id).getBoundingClientRect().top;
  window.scrollTo({
    top: top - 148 + window.scrollY,
    behavior: "smooth"
  });

}

function Navbar({ product }) {

  return <div className=" flex gap-5 items-center justify-between p-5 bg-black-1 text-grey-1 text-nowrap overflow-hidden">
    <div>
      <Link className="hover:text-white-1" href={'/'}>LokiKurri</Link>/<Link className="hover:text-white-1" href={'/product'}>Products</Link>/<Link className="hover:text-white-1" href={'/product/detail/' + product._id}>{product.name}</Link>
    </div>
    <div className="flex gap-5 items-center">
      <div className="hover:text-white-2" onClick={() => goTo('inspirations')}>Inspirations</div>
      <div className="hover:text-white-2" onClick={() => goTo('configure')}>Configure</div>
      <div className="hover:text-white-2" onClick={() => goTo('configure')}>Information</div>
      <div className="hover:text-white-2" onClick={() => goTo('ratings')}>Ratings</div>
      <div className="hover:text-white-2" onClick={() => goTo('configure')}>Product family</div>
      <div className="hover:text-white-2" onClick={() => goTo('designer')}>Designer</div>
    </div>
  </div>
}

export default function Page() {
  let { id } = useParams()
  const { user, isLoading } = useMetaData()
  const router = useRouter()

  const query = useQuery({
    queryKey: ['product', id],
    queryFn: () => ProductAPI.findById(id),
    staleTime: Infinity
  })

  if (query.isLoading || query.isError) return <></>

  const handleSubmit = (data) => {
    if (isLoading) return
    if (!user) return router.push('/user/login')
    return CartAPI.create(data)
  }

  return <div>
    <div className="sticky z-[1] top-[85px]"><Navbar product={query.data} /></div>
    <ProductDetail product={query.data} handleSubmit={handleSubmit}/>
  </div>
}
