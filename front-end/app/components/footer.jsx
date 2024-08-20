'use client'

import { RiHome4Line } from "react-icons/ri";
import { IoMdBusiness } from "react-icons/io";
import { TiSocialFacebook, TiSocialInstagram, TiSocialLinkedin, TiSocialPinterest, TiSocialTwitter, TiSocialYoutube } from "react-icons/ti";

export default function Footer() {

  const handleClick = e => {
    e.target.parentNode.childNodes[1].classList.toggle("max-md:max-h-screen")
  }
  
  return <div>
    <div className="p-10 bg-white-2 flex gap-5 items-center justify-center max-md:flex-col">
      <div className="text-xss"><div className=" text-2xl font-medium">LokiKurri Newsletter</div>New products, limited editions, event invitations and much more.</div>
      <div className="flex gap-2 items-center">
        <RiHome4Line className=" w-8 h-8 p-2 rounded-full bg-black text-white-1" />
        <div className=" hover:text-red-1 text-nowrap">Private customers</div>
      </div>
      <div className="flex gap-2 items-center">
        <IoMdBusiness className=" w-8 h-8 p-2 rounded-full bg-black text-white-1" />
        <div className=" hover:text-red-1 text-nowrap">Business customers</div>
      </div>
    </div>
    <div className="p-10 bg-white-3 flex flex-col gap-5">
      <div className="grid max-md:grid-cols-1 max-lg:grid-cols-2 grid-cols-3 md:gap-10 md:justify-between">
        
        <div  >
          <div onClick={handleClick} className="font-semibold p-3 text-center btn">Products</div>
          <div className="max-md:max-h-0 overflow-hidden duration-1000 transition-[max-height]">
            <div className="text-xss hover:text-red-1 p-3 w-full text-center border-t-2 border-grey-1">All Products</div>
            <div className="text-xss hover:text-red-1 p-3 w-full text-center border-t-2 border-grey-1">New Products</div>
            <div className="text-xss hover:text-red-1 p-3 w-full text-center border-t-2 border-grey-1">Designer</div>
            <div className="text-xss hover:text-red-1 p-3 w-full text-center border-t-2 border-grey-1">Manufacturer warranty</div>
            <div className="text-xss hover:text-red-1 p-3 w-full text-center border-t-2 border-grey-1">Colours & materials</div>
          </div>
        </div>

        <div >
          <div onClick={handleClick} className="font-semibold p-3 text-center btn">Professionals</div>
          <div className="max-md:max-h-0 overflow-hidden duration-1000 transition-[max-height]">
            <div className="text-xss hover:text-red-1 p-3 w-full text-center border-t-2 border-grey-1">Downloads</div>
            <div className="text-xss hover:text-red-1 p-3 w-full text-center border-t-2 border-grey-1">Projects</div>
            <div className="text-xss hover:text-red-1 p-3 w-full text-center border-t-2 border-grey-1">Our Clients</div>
            <div className="text-xss hover:text-red-1 p-3 w-full text-center border-t-2 border-grey-1">Tools</div>
          </div>
        </div>

        <div >
          <div onClick={handleClick} className="font-semibold p-3 text-center btn">About LokiKurri</div>
          <div className="max-md:max-h-0 overflow-hidden duration-1000 transition-[max-height]">
            <div className="text-xss hover:text-red-1 p-3 w-full text-center border-t-2 border-grey-1">Facts</div>
            <div className="text-xss hover:text-red-1 p-3 w-full text-center border-t-2 border-grey-1">LokiKurri Campus</div>
            <div className="text-xss hover:text-red-1 p-3 w-full text-center border-t-2 border-grey-1">Sustainability</div>
            <div className="text-xss hover:text-red-1 p-3 w-full text-center border-t-2 border-grey-1">Magazine</div>
            <div className="text-xss hover:text-red-1 p-3 w-full text-center border-t-2 border-grey-1">Jobs & Careers</div>
            <div className="text-xss hover:text-red-1 p-3 w-full text-center border-t-2 border-grey-1">Press</div>
          </div>
        </div>

        <div >
          <div onClick={handleClick} className="font-semibold p-3 text-center btn">Contact</div>
          <div className="max-md:max-h-0 overflow-hidden duration-1000 transition-[max-height]">
            <div className="text-xss hover:text-red-1 p-3 w-full text-center border-t-2 border-grey-1">Contact LokiKurri</div>
            <div className="text-xss hover:text-red-1 p-3 w-full text-center border-t-2 border-grey-1">Find LokiKurri</div>
            <div className="text-xss hover:text-red-1 p-3 w-full text-center border-t-2 border-grey-1">LokiKurri Companies</div>
            <div className="text-xss hover:text-red-1 p-3 w-full text-center border-t-2 border-grey-1">Subscribe to the newsletter</div>
            <div className="text-xss hover:text-red-1 p-3 w-full text-center border-t-2 border-grey-1">LokiKurri Circle Stores</div>
          </div>
        </div>

        <div >
          <div onClick={handleClick} className="font-semibold p-3 text-center btn">Legal</div>
          <div className="max-md:max-h-0 overflow-hidden duration-1000 transition-[max-height]">
            <div className="text-xss hover:text-red-1 p-3 w-full text-center border-t-2 border-grey-1">Distribution rights</div>
            <div className="text-xss hover:text-red-1 p-3 w-full text-center border-t-2 border-grey-1">Imprint</div>
            <div className="text-xss hover:text-red-1 p-3 w-full text-center border-t-2 border-grey-1">Privacy Policy</div>
          </div>
        </div>

      </div>
      <div className="flex gap-5 justify-center">
        <TiSocialYoutube className=" w-10 h-10 hover:text-red-1" />
        <TiSocialTwitter className=" w-10 h-10 hover:text-red-1" />
        <TiSocialFacebook className=" w-10 h-10 hover:text-red-1" />
        <TiSocialLinkedin className=" w-10 h-10 hover:text-red-1" />
        <TiSocialInstagram className=" w-10 h-10 hover:text-red-1" />
        <TiSocialPinterest className=" w-10 h-10 hover:text-red-1" />
      </div>
      <div className=" text-center font-sans text-grey-1">COPYRIGHT © 2024 LOKIKURRI INTERNATIONAL AG</div>
      <div className="text-center text-grey-1 hover:text-red-1">Cookie Settings</div>
      <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className=" transition-opacity bg-black-1 px-10 py-2 text-white-1 font-semibold w-56 m-auto text-center hover:opacity-80">UP</div>
    </div>
  </div>
};
