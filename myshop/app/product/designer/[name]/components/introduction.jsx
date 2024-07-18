'use client'

export default function Introduction({designer}) {

  return <div className=" flex overflow-auto max-lg:flex-col">
    <img src={designer.avatar} className="max-h-96 basis-1/2 object-cover object-center"></img>
    <div className="basis-1/2 bg-black-1 text-white-2 p-10 content-center">
      <div className=" text-3xl font-semibold">{designer.name}</div>
      <div className=" text-wrap mt-5 ">{designer.description}</div>
    </div>
  </div>
}
