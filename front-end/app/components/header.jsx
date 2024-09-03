'use client'

import { MdMenu, MdNotificationsNone, MdSearch } from "react-icons/md";
import { RiNotification4Line, RiUserLine } from "react-icons/ri";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { RiNotificationLine } from "react-icons/ri";
import Notification from "./notification";

export default function Header() {
  const [open, setOpen] = useState()

  useEffect(() => {
    if (open) document.body.style.overflowY = 'hidden'
    return () => document.body.style.overflowY = 'auto'
  }, [open])

  return <div className="flex flex-col px-5 py-2 bg-white font-medium">
    <div className=" flex justify-end items-center text-grey-1 text-xss">
      <IoLocationOutline className=" w-4 h-4" />
      <div className="hover:text-red-1 ml-1 mr-3">Find LokiKurri</div>
      <div className="hover:text-red-1 ">Contact</div>
    </div>
    <div className="flex justify-between">
      <div className=" flex gap-4">
        <Link href={'/'} className=" font-black text-2xl p-2">LokiKurri.</Link>
        <div className={`flex lg:items-end max-lg:flex-col max-lg:max-h-screen max-lg:overflow-y-auto max-lg:bg-white-1 max-lg:fixed max-lg:w-screen max-lg:top-0 max-lg:left-0 ${open ? '' : 'max-lg:hidden'}`}>
          <div className={`sticky z-10 top-0 bg-black-1 text-white-1 p-5 lg:hidden flex gap-10`}>
            <IoMdArrowBack onClick={() => setOpen(false)} className="w-8 h-8" />
            <div className=" font-extrabold text-2xl">LokiKurri.</div>
          </div>
          <div className="group max-lg:p-5">
            <Link onClick={() => setOpen(false)} href={'/product'}><div className=" hover:text-red-1 p-2">Products</div></Link>
            <div className={`lg:absolute lg:max-h-0 lg:opacity-0 lg:w-screen lg:group-hover:max-h-screen lg:group-hover:opacity-100 lg:group-hover:p-5 lg:transition-[max-height] lg:duration-500 lg:left-0 lg:overflow-hidden max-lg:flex-col max-lg:px-10 bg-white-1 flex gap-10 `}>
              <div className="flex flex-col gap-2">
                <div className=" text-grey-1 ">Seating furniture</div>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Chairs</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Lounge chairs</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Sofas</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Office chairs</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Chaises longues</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Stools & benches</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Sculptures</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Conference chairs</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Airport seating</div></Link>
                <div className=" text-grey-1  mt-10">Spatial organisation</div>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Storage space</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Micro architecture</div></Link>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-grey-1 ">Tables</div>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Dining tables</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Café tables</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Coffee & side tables</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Desks</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Office furniture systems</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Conference systems</div></Link>
                <div className="text-grey-1  mt-10">Accessories</div>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Lighting</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Clocks</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Decorative objects</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Coat racks & wall shelves</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Trays & vessels</div></Link>
                <div className="text-grey-1 hover:text-red-1 ">More</div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-grey-1 ">Designer</div>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Alexander Girard</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Antonio Citterio</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Charles & Ray Eames</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Barber Osgerby</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">George Nelson</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Hella Jongerius</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Isamu Noguchi</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Jasper Morrison</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Jean Prouvé</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Konstantin Grcic</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Ronan & Erwan Bouroullec</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Verner Panton</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Julie Richoz</div></Link>
                <div className="text-grey-1 hover:text-red-1 ">More</div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-grey-1 ">Service</div>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Care & repair</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Spare parts</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Care products</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Manufacturer warranty</div></Link>
                <div className="text-grey-1  mt-10">Discover</div>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">New</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Bestseller</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Quickly available</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Gift finder</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Office chair finder</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Lounge chair finder</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Colour & material</div></Link>
              </div>
              <div className="flex grow flex-col gap-10">
                <div className="group/1 max-w-max overflow-hidden">
                  <img className="group-hover/1:scale-105 object-cover transition-transform" width={400} src={'https://static.vitra.com/media-resized/ljZGRmgW0gCuivCj3KEYWDVEBUNTzrV9qtFW3o5Q-uc/fill/0/390/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzkxMzQ2MzEvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC84Mjk3NzgxNS5qcGc.jpg'} />
                </div>
                <div className="group/1 max-w-max overflow-hidden">
                  <img className="group-hover/1:scale-105 object-cover transition-transform" width={400} src={'https://static.vitra.com/media-resized/tXoAa0s5B3KMH7WAxCSkbAmMINvdUOl832ThMJNc6ls/fill/0/390/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzg5MjkwOTkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC84MjY0NjU2Ni5qcGc.jpg'} />
                </div>
              </div>
            </div>
          </div>
          <div className="group max-lg:p-5">
            <Link onClick={() => setOpen(false)} href={'/'}><div className=" hover:text-red-1 p-2">Inspirations</div></Link>
            <div className={`lg:absolute lg:max-h-0 lg:opacity-0 lg:w-screen lg:group-hover:max-h-screen lg:group-hover:opacity-100 lg:group-hover:p-5 lg:transition-[max-height] lg:duration-500 lg:left-0 lg:overflow-hidden max-lg:flex-col max-lg:px-10 bg-white-1 flex  gap-10 `}>
              <div className="flex flex-col gap-2">
                <div className=" text-grey-1 ">Seating furniture</div>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Chairs</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Lounge chairs</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Sofas</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Office chairs</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Chaises longues</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Stools & benches</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Sculptures</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Conference chairs</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Airport seating</div></Link>
                <div className=" text-grey-1  mt-10">Spatial organisation</div>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Storage space</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Micro architecture</div></Link>
              </div>
            </div>
          </div>
          <div className="group max-lg:p-5">
            <Link onClick={() => setOpen(false)} href={'/'}><div className=" hover:text-red-1 p-2">Services</div></Link>
            <div className={`lg:absolute lg:max-h-0 lg:opacity-0 lg:w-screen lg:group-hover:max-h-screen lg:group-hover:opacity-100 lg:group-hover:p-5 lg:transition-[max-height] lg:duration-500 lg:left-0 lg:overflow-hidden max-lg:flex-col max-lg:px-10 bg-white-1 flex  gap-10 `}>
              <div className="flex flex-col gap-2">
                <div className=" text-grey-1 ">Seating furniture</div>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Chairs</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Lounge chairs</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Sofas</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Office chairs</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Chaises longues</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Stools & benches</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Sculptures</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Conference chairs</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Airport seating</div></Link>
                <div className=" text-grey-1  mt-10">Spatial organisation</div>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Storage space</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Micro architecture</div></Link>
              </div>
            </div>
          </div>
          <div className="group max-lg:p-5">
            <Link onClick={() => setOpen(false)} href={'/'}><div className=" hover:text-red-1 p-2">Professionals</div></Link>
            <div className={`lg:absolute lg:max-h-0 lg:opacity-0 lg:w-screen lg:group-hover:max-h-screen lg:group-hover:opacity-100 lg:group-hover:p-5 lg:transition-[max-height] lg:duration-500 lg:left-0 lg:overflow-hidden max-lg:flex-col max-lg:px-10 bg-white-1 flex  gap-10 `}>
              <div className="flex flex-col gap-2">
                <div className=" text-grey-1 ">Seating furniture</div>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Chairs</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Lounge chairs</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Sofas</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Office chairs</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Chaises longues</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Stools & benches</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Sculptures</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Conference chairs</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Airport seating</div></Link>
                <div className=" text-grey-1  mt-10">Spatial organisation</div>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Storage space</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Micro architecture</div></Link>
              </div>
            </div>
          </div>
          <div className="group max-lg:p-5">
            <Link onClick={() => setOpen(false)} href={'/'}><div className=" hover:text-red-1 p-2">Magazine</div></Link>
            <div className={`lg:absolute lg:max-h-0 lg:opacity-0 lg:w-screen lg:group-hover:max-h-screen lg:group-hover:opacity-100 lg:group-hover:p-5 lg:transition-[max-height] lg:duration-500 lg:left-0 lg:overflow-hidden max-lg:flex-col max-lg:px-10 bg-white-1 flex  gap-10 `}>
              <div className="flex flex-col gap-2">
                <div className=" text-grey-1 ">Seating furniture</div>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Chairs</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Lounge chairs</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Sofas</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Office chairs</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Chaises longues</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Stools & benches</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Sculptures</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Conference chairs</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Airport seating</div></Link>
                <div className=" text-grey-1  mt-10">Spatial organisation</div>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Storage space</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Micro architecture</div></Link>
              </div>
            </div>
          </div>
          <div className="group max-lg:p-5">
            <Link onClick={() => setOpen(false)} href={'/'}><div className=" hover:text-red-1 p-2">LokiKurri Campus</div></Link>
            <div className={`lg:absolute lg:max-h-0 lg:opacity-0 lg:w-screen lg:group-hover:max-h-screen lg:group-hover:opacity-100 lg:group-hover:p-5 lg:transition-[max-height] lg:duration-500 lg:left-0 lg:overflow-hidden max-lg:flex-col max-lg:px-10 bg-white-1 flex  gap-10 `}>
              <div className="flex flex-col gap-2">
                <div className=" text-grey-1 ">Seating furniture</div>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Chairs</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Lounge chairs</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Sofas</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Office chairs</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Chaises longues</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Stools & benches</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Sculptures</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Conference chairs</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Airport seating</div></Link>
                <div className=" text-grey-1  mt-10">Spatial organisation</div>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Storage space</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Micro architecture</div></Link>
              </div>
            </div>
          </div>
          <div className="group max-lg:p-5">
            <Link onClick={() => setOpen(false)} href={'/'}><div className=" hover:text-red-1 p-2">About LokiKurri</div></Link>
            <div className={`lg:absolute lg:max-h-0 lg:opacity-0 lg:w-screen lg:group-hover:max-h-screen lg:group-hover:opacity-100 lg:group-hover:p-5 lg:transition-[max-height] lg:duration-500 lg:left-0 lg:overflow-hidden max-lg:flex-col max-lg:px-10 bg-white-1 flex  gap-10 `}>
              <div className="flex flex-col gap-2">
                <div className=" text-grey-1 ">Seating furniture</div>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Chairs</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Lounge chairs</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Sofas</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Office chairs</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Chaises longues</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Stools & benches</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Sculptures</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Conference chairs</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Airport seating</div></Link>
                <div className=" text-grey-1  mt-10">Spatial organisation</div>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Storage space</div></Link>
                <Link onClick={() => setOpen(false)} href={'/product/category/Chairs'}><div className="hover:text-red-1">Micro architecture</div></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-end">
        <MdMenu onClick={() => setOpen(t => !t)} className={`w-10 h-10 p-2 ${open ? 'text-red-1' : ''} lg:hidden`} />
        <MdSearch className="w-10 h-10 p-2 hover:text-red-1" />
        <Link href={'/user'}><RiUserLine className=" w-10 h-10 p-2 hover:text-red-1" /></Link>
        <Notification/>
        <Link onClick={() => setOpen(false)} href={'/user/cart'}><PiShoppingCartSimpleBold className=" hover:text-red-1 w-10 h-10 p-2" /></Link>
      </div>
    </div>
  </div>
}