'use client'

import { useParams, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useRef} from "react";
import Link from "next/link";
import { Configure } from "../components";
import { useMetaData } from "@/app/hooks";
import { CartAPI, ProductAPI } from "@/apis";

const goTo = id => {
  var top = document.getElementById(id).getBoundingClientRect().top;
  window.scrollTo({
    top: top - 148 + window.scrollY,
    behavior: "smooth"
  });

}

function Navbar({ product }) {

  return <div className=" flex gap-5 items-center justify-between p-5 bg-black-1 text-grey-1 text-nowrap">
    <div>
      <Link className="hover:text-white-1" href={'/'}>LokiKurri</Link>/<Link className="hover:text-white-1" href={'/product'}>Products</Link>/<Link className="hover:text-white-1" href={'/product/detail/' + product.name}>{product.name}</Link>
    </div>
    <div className="flex gap-5 items-center">
      <div className="hover:text-white-2" onClick={() => goTo('inspirations')}>Inspirations</div>
      <div className="hover:text-white-2" onClick={() => goTo('configure')}>Configure</div>
      <div className="hover:text-white-2" onClick={() => goTo('configure')}>Information</div>
      <div className="hover:text-white-2" onClick={() => goTo('configure')}>Spare parts</div>
      <div className="hover:text-white-2" onClick={() => goTo('configure')}>Product family</div>
      <div className="hover:text-white-2" onClick={() => goTo('designer')}>Designer</div>
    </div>
  </div>
}

function Slider({ images }) {
  const ref = useRef()

  useEffect(() => {
    if (ref.current) {
      let posX = 0, isPress = false, scrollLeft = 0

      const handleMouseDown = e => {
        if (!isPress) {
          isPress = true
          posX = e.pageX
          scrollLeft = ref.current.scrollLeft
        }
      }
      const handleMouseMove = e => {
        if (isPress) {
          ref.current.scrollLeft = scrollLeft + (posX - e.pageX) * 1.5
        }
      }
      const handleMouseLeave = e => {
        if (isPress) {
          isPress = false
          let a = ref.current.scrollLeft
          ref.current.classList.add('snap-x')
          let b = ref.current.scrollLeft
          ref.current.classList.remove('snap-x')
          ref.current.scrollLeft = a
          ref.current.scrollTo({
            left: b,
            behavior: 'smooth'
          })
        }
      }
      ref.current.addEventListener('mousedown', handleMouseDown)
      ref.current.addEventListener('mousemove', handleMouseMove)
      ref.current.addEventListener('mouseup', handleMouseLeave)
      ref.current.addEventListener('mouseleave', handleMouseLeave)
      return () => {
        if (ref.current) {
          ref.current.removeEventListener('mousedown', handleMouseDown)
          ref.current.removeEventListener('mousemove', handleMouseMove)
          ref.current.removeEventListener('mouseup', handleMouseLeave)
          ref.current.removeEventListener('mouseleave', handleMouseLeave)
        }
      }
    }
  }, [])

  return <div className="flex flex-col gap-5">
    <div className="px-10 max-md:px-5">
      <div ref={ref} className=" flex overflow-x-hidden gap-2 select-none snap-mandatory h-96 max-md:h-48 ">
        {
          images.map((e, i) => {
            return <img draggable={false} key={e} src={e} className="snap-center"></img>
          })
        }
      </div>
    </div>

  </div>
}

function Designer({ product }) {

  return <div className="flex flex-col p-10 gap-5 bg-black-1 text-white-1 items-center">
    <div>This product was designed by</div>
    <div className="text-2xl font-semibold">{product.designer.name}</div>
    <div className=" flex gap-2">
      {product.designer.images.map((e, i) => <img className={`h-60 ${i == 0 ? '' : 'max-xl:hidden'}`} key={e} src={e} />)}
    </div>
    <div className="text-center">{product.designer.description}</div>
    <Link href={'/product/designer/' + product.designer._id}><div className=" border-y-2 border-white-3 md:w-max px-10 py-2 btn hover:bg-white-1 hover:text-black font-semibold transition-colors">LEARN MORE</div></Link>
  </div>
}

function Introduction({ product }) {
  return <div className=" p-10 flex items-center max-lg:flex-col max-lg:gap-10">
    <div className="basis-1/2 overflow-hidden">
      <img src={product.avatar} className="object-cover object-center"></img>
    </div>
    <div className=" basis-1/2 flex flex-col gap-5 max-lg:items-center">
      <div className=" text-5xl font-semibold">{product.name}</div>
      <div className=" text-2xl text-grey-1">{product.designer.name}</div>
      <div>{product.description}</div>
      <div className=" font-semibold text-xl">From USD {product.price}</div>
      <div onClick={() => goTo('configure')} className="bg-black-1 text-white-1 hover:opacity-90 transition-opacity py-2 px-5 w-max btn">CONFIGURE</div>
    </div>
  </div>
}

export default function Page() {
  let { id } = useParams()
  const { user }= useMetaData()
  const router = useRouter()

  const query = useQuery({
    queryKey: ['product', id],
    queryFn: () => ProductAPI.findById(id)
  })

  if (query.isLoading || query.isError) return <></>

  const product = query.data

  const handleSubmit = (data) => {
    if(user) {
      CartAPI.create(data)
    } else {
      router.push('/user/login')
    }
  }

  return <div className=" flex flex-col gap-10">
    <div className="sticky z-[1] top-[85px]"><Navbar product={product} /></div>
    <div id="inspirations" ><Introduction product={product} /></div>
    <Slider images={product.images} />
    <div id="configure"><Configure product={product} handleSubmit={handleSubmit} /></div>
    <div id="designer"><Designer product={product} /></div>
  </div>
}
