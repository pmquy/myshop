'use client'

import { useEffect, useRef } from "react"

export default function Page () {
  const ref = useRef()

  useEffect(() => {
    if (ref.current) {
      let posX = 0, isPress = false, scrollLeft = 0
      const handleMouseDown = e => {
        isPress = true
        posX = e.pageX
        scrollLeft = ref.current.scrollLeft
      }
      const handleMouseMove = e => {
        if (isPress) ref.current.scrollLeft = scrollLeft + (posX - e.pageX) * 1.5
      }
      const handleMouseLeave = e => {
        if (isPress) isPress = false
      }

      const handleTouchStart = e => {
        isPress = true
        posX = e.touches[0].pageX
        scrollLeft = ref.current.scrollLeft
      }
      const handleTouchMove = e => {
        if (isPress) ref.current.scrollLeft = scrollLeft + (posX - e.touches[0].pageX) * 2
      }
      const handleTouchEnd = e => {
        if (isPress) isPress = false
      }
      ref.current.addEventListener('mousedown', handleMouseDown)
      ref.current.addEventListener('mousemove', handleMouseMove)
      ref.current.addEventListener('mouseup', handleMouseLeave)
      ref.current.addEventListener('mouseleave', handleMouseLeave)
      ref.current.addEventListener('touchstart', handleTouchStart);
      ref.current.addEventListener('touchmove', handleTouchMove);
      ref.current.addEventListener('touchend', handleTouchEnd);
      ref.current.addEventListener('touchcancel', handleTouchEnd);
      return () => {
        if (ref.current) {
          ref.current.removeEventListener('mousedown', handleMouseDown)
          ref.current.removeEventListener('mousemove', handleMouseMove)
          ref.current.removeEventListener('mouseup', handleMouseLeave)
          ref.current.removeEventListener('mouseleave', handleMouseLeave)
          ref.current.removeEventListener('touchstart', handleTouchStart);
          ref.current.removeEventListener('touchmove', handleTouchMove);
          ref.current.removeEventListener('touchend', handleTouchEnd);
          ref.current.removeEventListener('touchcancel', handleTouchEnd);
        }
      }
    }
  }, [])

  return <div className=" flex flex-col">
    <div className="relative group bg-white-1">
      <video className=" h-[500px] object-cover w-screen object-center group-hover:brightness-75 transition-[filter]" autoPlay={true} loop={1000000} src="/video1.mp4" />
      <div className="absolute transition-all duration-500 text-white text-5xl left-1/2 -translate-x-1/2 top-0 translate-y-56 group-hover:translate-y-32">Soft Pad Chair EA 231</div>
      <div className="absolute transition-all duration-500 text-white text-2xl left-1/2 -translate-x-1/2 top-0 translate-y-72 group-hover:translate-y-52 opacity-0 group-hover:opacity-100">The new, cosy variant for the home office</div>
      <div className="absolute transition-all duration-500 text-black bg-white hover:brightness-90 px-5 py-2 text-xl left-1/2 -translate-x-1/2 top-0 translate-y-80 group-hover:translate-y-72 opacity-0 group-hover:opacity-100 select-none cursor-pointer">Discover</div>
    </div>
    <div className=" grid grid-cols-2 gap-5 px-5 py-20 max-md:grid-cols-1 bg-white-1">
      <div className="group flex flex-col gap-5">
        <div className=" overflow-hidden"><img className=" group-hover:scale-105 group-hover:brightness-75 object-cover transition-all" src="https://static.vitra.com/media-resized/_TeqUy5-VTehEJ0SInlSLuJd2S904EPWqpv0w_-hRnE/fill/1440/810/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzkxNzE5MDcvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC84MzA0NDI3OC5qcGc.jpg"></img></div>
        <div className=" text-center text-grey-1 group-hover:text-red-1 text-xss">Mikado<br />The chair that moves with you</div>
      </div>
      <div className="group flex flex-col gap-5">
        <div className=" overflow-hidden"><img className=" group-hover:scale-105 group-hover:brightness-75 object-cover transition-all" src="https://static.vitra.com/media-resized/ytz9tdfQHitmM7yMRLtM1rYTGJYhAP1MnnLRxTBeUv0/fill/1440/810/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzkxNTU1NzEvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC84MzA0NzkxMi5qcGc.jpg"></img></div>
        <div className=" text-center text-grey-1 group-hover:text-red-1 text-xss">VitraHaus Loft<br />New Installation in the VitraHaus, Level 4</div>
      </div>
      <div className="group flex flex-col gap-5">
        <div className=" overflow-hidden"><img className=" group-hover:scale-105 group-hover:brightness-75 object-cover transition-all" src="https://static.vitra.com/media-resized/Hwm-FyI9gl9kFEAuiTLQ20ZrSFtVgdR6b0s7iR-nIpc/fill/1440/810/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzkxNTY1MjYvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC84MzAzMTE4MS5qcGc.jpg"></img></div>
        <div className=" text-center text-grey-1 group-hover:text-red-1 text-xss">Khudi Bari<br />A new addition to the Vitra Campus architecture: Khudi Bari</div>
      </div>
      <div className="group flex flex-col gap-5">
        <div className=" overflow-hidden"><img className=" group-hover:scale-105 group-hover:brightness-75 object-cover transition-all" src="https://static.vitra.com/media-resized/RtsAdSRtrlDfxl5UijCU7SsfNB29vtdeuN-Ilb7zx_A/fill/1440/810/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzYxMTc5MzMvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC82NzE1Njc5My5qcGc.jpg"></img></div>
        <div className=" text-center text-grey-1 group-hover:text-red-1 text-xss">Outdoor<br />Inspirations for home</div>
      </div>
    </div>

    <img className="-z-10 fixed w-screen h-screen bg-contain bg-repeat-y" style={{backgroundImage : 'url("https://static.vitra.com/media-resized/vp3mrjN96bOE6U-kgYIGSSK5LFAi6UeFpsXcxePNnf0/fill/1920/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgyMzMyNjcvc3RvcmFnZS92X3BhcmFsbGF4XzE5MjB4MTA4MC83Nzk2MTI5OC5qcGc.jpg")'}}></img>
    <div className=" content-center text-center p-10">
      <div className="text-5xl text-center">Vitra’s Environmental<br /> Mission</div>
      <div className=" border-y-2 border-black px-10 py-3 hover:bg-black hover:text-white mt-5 w-max m-auto transition-colors btn">MORE DETAIL</div>
    </div>

    <div className=" grid grid-cols-2 gap-5 px-5 py-20 max-md:grid-cols-1 bg-white-1">
      <div className=" basis-1/2 group flex flex-col gap-5 overflow-hidden">
        <div className=" overflow-hidden"><img className=" group-hover:scale-105 group-hover:brightness-75 object-cover transition-all" src="https://static.vitra.com/media-resized/MuSW9bGZWI328acFDBjjc-4F-nkRytL7U4Y64xgiyPI/fill/1440/810/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzg5OTcxMzQvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC84Mjc2MjAzNC5qcGc.jpg"></img></div>
        <div className=" text-center text-grey-1 group-hover:text-red-1 text-xss">Inspiring and flexible workspaces<br />Collaborate with us - Consulting & Planning Studio</div>
      </div>
      <div className=" basis-1/2 group flex flex-col gap-5 overflow-hidden">
        <div className=" overflow-hidden"><img className=" group-hover:scale-105 group-hover:brightness-75 object-cover transition-all" src="https://static.vitra.com/media-resized/zlco2tZKMKvBV3T5jPtPHX-WwPX8VrSMci12NV7a-go/fill/1440/810/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzkxOTQ1Mzcvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC84MzA4ODM4Ni5qcGc.jpg"></img></div>
        <div className=" text-center text-grey-1 group-hover:text-red-1 text-xss">No matter which industry and no matter where in the world<br />Our Clients</div>
      </div>
    </div>
    <div className="flex flex-col gap-5 px-5 py-20 bg-white-1">
      <div className=" text-center text-3xl">Product categories</div>
      <div className="overflow-hidden">
        <div ref={ref} className=" flex overflow-hidden select-none gap-2">
          <div className="bg-cover bg-center w-72 h-96 flex-shrink-0" style={{ backgroundImage: 'url("https://static.vitra.com/media/asset/9016520/storage/v_fullbleed_1440x/82755682.jpg")' }}>
            <div className=" mt-72 text-center text-white-1 text-2xl">Chairs</div>
          </div>
          <div className="bg-cover bg-center w-72 h-96 flex-shrink-0" style={{ backgroundImage: 'url("https://static.vitra.com/media/asset/8985199/storage/v_fullbleed_1440x/82756459.jpg")' }}>
            <div className=" mt-72 text-center text-white-1 text-2xl">Dinning Tables</div>
          </div>
          <div className="bg-cover bg-center w-72 h-96 flex-shrink-0" style={{ backgroundImage: 'url("https://static.vitra.com/media/asset/8985147/storage/v_fullbleed_1440x/82756335.jpg")' }}>
            <div className=" mt-72 text-center text-white-1 text-2xl">Office chairs</div>
          </div>
          <div className="bg-cover bg-center w-72 h-96 flex-shrink-0" style={{ backgroundImage: 'url("https://static.vitra.com/media/asset/8971567/storage/v_fullbleed_1440x/82741018.jpg")' }}>
            <div className=" mt-72 text-center text-white-1 text-2xl">Desks</div>
          </div>
          <div className="bg-cover bg-center w-72 h-96 flex-shrink-0" style={{ backgroundImage: 'url("https://static.vitra.com/media/asset/5770290/storage/v_fullbleed_1440x/61559721.jpg")' }}>
            <div className=" mt-72 text-center text-white-1 text-2xl">Lounge chairs</div>
          </div>
          <div className="bg-cover bg-center w-72 h-96 flex-shrink-0" style={{ backgroundImage: 'url("https://static.vitra.com/media/asset/8985633/storage/v_fullbleed_1440x/82756643.jpg")' }}>
            <div className=" mt-72 text-center text-white-1 text-2xl">Sofas</div>
          </div>
          <div className="bg-cover bg-center w-72 h-96 flex-shrink-0" style={{ backgroundImage: 'url("https://static.vitra.com/media/asset/8985110/storage/v_fullbleed_1440x/82756325.jpg")' }}>
            <div className=" mt-72 text-center text-white-1 text-2xl">Coffee & Side Tables</div>
          </div>
          <div className="bg-cover bg-center w-72 h-96 flex-shrink-0" style={{ backgroundImage: 'url("https://static.vitra.com/media/asset/8985177/storage/v_fullbleed_1440x/82756349.jpg")' }}>
            <div className=" mt-72 text-center text-white-1 text-2xl">Accessories</div>
          </div>
          <div className="bg-cover bg-center w-72 h-96 flex-shrink-0" style={{ backgroundImage: 'url("https://static.vitra.com/media/asset/8985214/storage/v_fullbleed_1440x/82756473.jpg")' }}>
            <div className=" mt-72 text-center text-white-1 text-2xl">Office furniture systems</div>
          </div>
          <div className="bg-cover bg-center w-72 h-96 flex-shrink-0" style={{ backgroundImage: 'url("https://static.vitra.com/media/asset/8985072/storage/v_fullbleed_1440x/82756222.jpg")' }}>
            <div className=" mt-72 text-center text-white-1 text-2xl">Café tables</div>
          </div>
          <div className="bg-cover bg-center w-72 h-96 flex-shrink-0" style={{ backgroundImage: 'url("https://static.vitra.com/media/asset/8984952/storage/v_fullbleed_1440x/82756179.jpg")' }}>
            <div className=" mt-72 text-center text-white-1 text-2xl">Conference chairs</div>
          </div>
          <div className="bg-cover bg-center w-72 h-96 flex-shrink-0" style={{ backgroundImage: 'url("https://static.vitra.com/media/asset/8985652/storage/v_fullbleed_1440x/82756657.jpg")' }}>
            <div className=" mt-72 text-center text-white-1 text-2xl">Conference systems</div>
          </div>
          <div className="bg-cover bg-center w-72 h-96 flex-shrink-0" style={{ backgroundImage: 'url("https://static.vitra.com/media/asset/8985869/storage/v_fullbleed_1440x/82756742.jpg")' }}>
            <div className=" mt-72 text-center text-white-1 text-2xl">Airport seating</div>
          </div>
        </div>
      </div>
    </div>
  </div>
}