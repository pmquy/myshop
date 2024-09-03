'use client'

import { useQuery } from "@tanstack/react-query"
import { useEffect, useRef } from "react";
import Link from "next/link";
import Configure from "./configure";
import { DesignerAPI } from "@/apis";
import { useProduct } from "../../hooks";
import Rating from "./rating";

const goTo = id => {
  var top = document.getElementById(id).getBoundingClientRect().top;
  window.scrollTo({
    top: top - 148 + window.scrollY,
    behavior: "smooth"
  });
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
          console.log(a)
          let b = ref.current.scrollLeft
          console.log(b)
          ref.current.classList.remove('snap-x')
          ref.current.scrollLeft = a
          ref.current.scrollTo({
            left: b,
            behavior: 'smooth'
          })
        }
      }

      const handleTouchStart = e => {
        if (!isPress) {
          isPress = true
          posX = e.touches[0].pageX
          scrollLeft = ref.current.scrollLeft
        }
      }
      const handleTouchMove = e => {
        if (isPress) {
          ref.current.scrollLeft = scrollLeft + (posX - e.touches[0].pageX) * 1.5
        }
      }

      ref.current.addEventListener('mousedown', handleMouseDown)
      ref.current.addEventListener('mousemove', handleMouseMove)
      ref.current.addEventListener('mouseup', handleMouseLeave)
      ref.current.addEventListener('mouseleave', handleMouseLeave)
      ref.current.addEventListener('touchstart', handleTouchStart);
      ref.current.addEventListener('touchmove', handleTouchMove);
      ref.current.addEventListener('touchend', handleMouseLeave);
      ref.current.addEventListener("touchcancel", handleMouseLeave);
      return () => {
        if (ref.current) {
          ref.current.removeEventListener('mousedown', handleMouseDown)
          ref.current.removeEventListener('mousemove', handleMouseMove)
          ref.current.removeEventListener('mouseup', handleMouseLeave)
          ref.current.removeEventListener('mouseleave', handleMouseLeave)
          ref.current.removeEventListener('touchstart', handleTouchStart);
          ref.current.removeEventListener('touchmove', handleTouchMove);
          ref.current.removeEventListener('touchend', handleMouseLeave);
          ref.current.removeEventListener('touchcancel', handleMouseLeave);
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

  const query = useQuery({
    queryKey: ['designer', product.designer],
    queryFn: () => DesignerAPI.findById(product.designer),
    staleTime: Infinity
  })

  return <div className="flex flex-col p-10 gap-5 bg-black-1 text-white-1 items-center">
    <div>This product was designed by</div>
    <div className="text-2xl font-semibold">{query.data?.name}</div>
    <div className=" flex gap-2">
      {query.data?.images.map((e, i) => <img className={`h-60 ${i == 0 ? '' : 'max-xl:hidden'}`} key={e} src={e} />)}
    </div>
    <div className="text-center">{query.data?.description}</div>
    <Link href={'/product/designer/' + query.data?._id}><div className=" border-y-2 border-white-3 md:w-max px-10 py-2 btn hover:bg-white-1 hover:text-black font-semibold transition-colors">LEARN MORE</div></Link>
  </div>
}

function Introduction({ product }) {
  const { designers } = useProduct()
  return <div className="flex max-lg:flex-col gap-10">
    <img src={product.avatar} className="object-cover overflow-hidden basis-1/2 object-center"></img>
    <div className=" p-10 basis-1/2 flex flex-col gap-5 max-lg:items-center">
      <div className=" text-5xl font-semibold">{product.name}</div>
      <div className=" text-2xl text-grey-1">{designers.find(e => e._id === product.designer)?.name}</div>
      <div className="">{product.description}</div>
      <div className=" font-semibold text-xl">From USD {product.price}</div>
      <div onClick={() => goTo('configure')} className="bg-black-1 text-white-1 hover:opacity-90 transition-opacity py-2 px-5 w-max btn">CONFIGURE</div>
    </div>
  </div>
}

export default function ProductDetail({ product, handleSubmit }) {
  return <div className=" flex flex-col gap-10">
    <div id="inspirations" ><Introduction product={product} /></div>
    <Slider images={product.images} />
    <div id="configure"><Configure product={product} handleSubmit={handleSubmit} /></div>
    <div id="ratings"><Rating product_id={product._id} /></div>
    <div id="designer"><Designer product={product} /></div>
  </div>
}