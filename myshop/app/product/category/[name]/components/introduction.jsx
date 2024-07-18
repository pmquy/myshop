'use client'

export default function Introduction({category}) {

  return <div className=" flex overflow-auto max-lg:flex-col">
    <img src={category.avatar} className="max-h-96 basis-1/2 object-cover object-center"></img>
    <div className="basis-1/2 bg-black-1 text-white-2 p-10 content-center">
      <div className=" text-3xl font-semibold">{category.name}</div>
      <div className=" text-wrap mt-5 ">{category.description}</div>
    </div>
  </div>
}
