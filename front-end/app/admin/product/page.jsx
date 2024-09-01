'use client'

import { ProductAPI } from "@/apis"
import { ProductDetail } from "@/app/product/detail/components"
import { useProduct } from "@/app/product/hooks"
import { Input, Select } from "@/ui"
import { useMutation, useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { Pie } from "react-chartjs-2"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { IoMdAddCircle } from "react-icons/io"
import { IoCloseCircle } from "react-icons/io5"
import { RiDeleteBack2Fill } from "react-icons/ri"

const nav = ['Create', 'Charts', 'Products']

function Charts({ }) {

  const [summary1, setSummary1] = useState([{ labels: [], datasets: [{ data: [] }] }, { labels: [], datasets: [{ data: [] }] }, { labels: [], datasets: [{ data: [] }] }])

  const query = useQuery({
    queryKey: ['products_summary1'],
    queryFn: () => ProductAPI.summary1().then(setSummary1)
  })

  if (query.isLoading) return <></>

  return <div className="flex flex-col gap-5">
    <Pie
      options={{
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'The product by designer',
          },
        },
      }}

      data={{
        labels: summary1[0].labels,
        datasets: summary1[0].datasets
      }}
    />

    <Pie
      options={{
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'The product by category',
          },
        },
      }}

      data={{
        labels: summary1[1].labels,
        datasets: summary1[1].datasets
      }}
    />

    <Pie
      options={{
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'The product by room',
          },
        },
      }}

      data={{
        labels: summary1[2].labels,
        datasets: summary1[2].datasets
      }}
    />
  </div>
}

function Create() {
  const { designers, categories, rooms } = useProduct()
  const nameRef = useRef(), descriptionRef = useRef(), avatarRef = useRef(), imagesRef = useRef(), designerRef = useRef(), categoryRef = useRef(), roomRef = useRef(), priceRef = useRef(), inventoryAmountRef = useRef()

  const [options, setOptions] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [preview, setPreview] = useState()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    return () => document.body.style.overflow = 'auto'
  }, [open])

  const handleAddOption = useCallback(() => {
    setOptions([...options, { key: "Type", name: 'Name', price: 0, avatar: 'https://image_url_here' }])
  }, [options])

  const handleDeleteOption = useCallback((i) => {
    setOptions(options.filter((e, j) => j != i))
  }, [options])

  const handleChangeOption = useCallback((i, key, val) => {
    options[i][key] = val
    setOptions([...options])
  }, [options])

  const handleAddRecommendation = useCallback(() => {
    setRecommendations([...recommendations, { name: "Recommended Product 1", avatar: 'https://image_url_here', option: [] }])
  }, [recommendations])

  const handleAddKey = useCallback(i => {
    recommendations[i].option.push("Type,0")
    setRecommendations([...recommendations])
  }, [recommendations])

  const handleDeleteKey = useCallback((i, j) => {
    recommendations[i].option.splice(j, 1)
    setRecommendations([...recommendations])
  }, [recommendations])

  const handleChangeKey = useCallback((i, j, val) => {
    recommendations[i].option[j] = val
    setRecommendations([...recommendations])
  }, [recommendations])

  const handleDeleteRecommendation = useCallback((i) => {
    setRecommendations(recommendations.filter((e, j) => j != i))
  }, [recommendations])

  const handleChangeRecommendation = useCallback((i, key, val) => {
    recommendations[i][key] = val
    setRecommendations([...recommendations])
  }, [recommendations])

  const mutation = useMutation({
    mutationFn: async (cb) => {
      if (!nameRef.current.value) throw new Error("Name is empty")
      if (!descriptionRef.current.value) throw new Error("Description is empty")
      if (!avatarRef.current.value) throw new Error("Avatar is empty")
      if (!imagesRef.current.value) throw new Error("Images is empty")
      if (!designerRef.current.value) throw new Error("Designer is empty")
      if (!categoryRef.current.value) throw new Error("Category is empty")
      if (!roomRef.current.value) throw new Error("Room is empty")
      if (!priceRef.current.value) throw new Error("Price is empty")
      if (!inventoryAmountRef.current.value) throw new Error("Inventory is empty")

      const A = options.reduce((prev, cur) => {
        let { key, ...rest } = cur
        if (!prev[key]) prev[key] = []
        prev[key].push(rest)
        return prev
      }, {})

      const B = recommendations.map(e => {
        const t = { name: e.name, avatar: e.avatar, option: {} }
        e.option.forEach(r => {
          const m = r.split(',')
          t.option[m[0]] = m[1]
        })
        return t
      })

      if (confirm("Create product"))
        return cb.call(null, {
          name: nameRef.current.value,
          description: descriptionRef.current.value,
          avatar: avatarRef.current.value,
          images: imagesRef.current.value.split(','),
          designer: designers.find(e => e.name == designerRef.current.value)?._id,
          category: categories.find(e => e.name == categoryRef.current.value)?._id,
          room: rooms.find(e => e.name == roomRef.current.value)?._id,
          price: priceRef.current.value,
          inventoryAmount: inventoryAmountRef.current.value,
          options: A,
          recommendations: B
        })
    },
  })

  return <div>
    <div className="flex flex-col gap-5 relative">
      <div className="flex flex-col gap-5 sticky top-28 z-[1] w-max m-auto">
        <button onClick={() => { mutation.mutateAsync(p => { setPreview(p); setOpen(true) }) }} className={`bg-green-600 py-2 px-5 text-white text-center hover:opacity-90 transition-opacity`}>PREVIEW</button>
        {mutation.isError && <div className="text-xss text-center text-red-1">{mutation.error.message}</div>}
      </div>
      <Input placeholder="Name" ref={nameRef} />
      <Input placeholder="Description" ref={descriptionRef} />
      <Input placeholder="Avatar url" ref={avatarRef} />
      <Input placeholder="Image urls (Split by ',')" ref={imagesRef} />
      <Select placeholder="Designer" ref={designerRef} choices={designers.map(e => e.name)} />
      <Select placeholder="Category" ref={categoryRef} choices={categories.map(e => e.name)} />
      <Select placeholder="Room" ref={roomRef} choices={rooms.map(e => e.name)} />
      <Input placeholder="Price" type="number" min={0} defaultValue={1000} ref={priceRef} />
      <Input placeholder="Inventory amount" defaultValue={1000} type="number" ref={inventoryAmountRef} />
      <div className="text-xl font-semibold">Options</div>
      <div className="p-10 flex flex-col gap-10">
        {
          options.map((e, i) =>
            <div key={i} className="flex gap-5 items-center">
              <RiDeleteBack2Fill onClick={() => handleDeleteOption(i)} className="w-8 h-8 hover:text-red-1" />
              <div className="flex flex-col gap-1 grow">
                <Input onChange={e => handleChangeOption(i, "key", e.target.value)} placeholder="Key" value={e.key} />
                <Input onChange={e => handleChangeOption(i, "name", e.target.value)} placeholder="Name" value={e.name} />
                <Input onChange={e => handleChangeOption(i, "avatar", e.target.value)} placeholder="Avatar" value={e.avatar} />
                <Input onChange={e => handleChangeOption(i, "price", e.target.value)} placeholder="Price" type="number" value={e.price} />
              </div>
            </div>
          )
        }
        <div onClick={handleAddOption} className="bg-black-1 hover:opacity-90 transition-opacity py-2 px-5 w-max text-white-1 btn">CREATE OPTION</div>
      </div>

      <div className="text-xl font-semibold">Recommendations</div>
      <div className="p-10 flex flex-col gap-10">
        {
          recommendations.map((e, i) =>
            <div key={i} className="flex gap-5 items-center">
              <RiDeleteBack2Fill onClick={() => handleDeleteRecommendation(i)} className="w-8 h-8 hover:text-red-1" />
              <div className="flex flex-col gap-1 grow">
                <Input onChange={e => handleChangeRecommendation(i, "name", e.target.value)} placeholder="Name" value={e.name} />
                <Input onChange={e => handleChangeRecommendation(i, "avatar", e.target.value)} placeholder="Avatar" value={e.avatar} />
                {
                  e.option.map((t, j) =>
                    <div key={j} className="flex gap-5 items-center">
                      <Input onChange={e => handleChangeKey(i, j, e.target.value)} placeholder={"Key,Index"} value={t} />
                      <RiDeleteBack2Fill onClick={() => handleDeleteKey(i, j)} className="w-8 h-8 hover:text-red-1" />
                    </div>
                  )
                }
                <IoMdAddCircle className="w-8 h-8 hover:text-red-1" onClick={() => handleAddKey(i)} />
              </div>
            </div>
          )
        }
        <div onClick={handleAddRecommendation} className="bg-black-1 hover:opacity-90 transition-opacity py-2 px-5 w-max text-white-1 btn">CREATE RECOMMENDATION</div>
      </div>
    </div>

    {
      open && <div className="fixed top-0 left-0 w-screen h-screen bg-black-1 bg-opacity-60 z-10">
        <div className="p-10 bg-white-1 w-[90%] max-md:w-screen m-auto absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2  flex flex-col gap-5 ">
          <IoCloseCircle onClick={() => setOpen(false)} className="w-8 h-8 absolute right-2 top-2" />
          <div className="max-h-[70vh] overflow-y-auto">
            <ProductDetail product={preview} />
          </div>
          <div onClick={() => mutation.mutate(async p => { await ProductAPI.create(p); setOpen(false) })} className={`bg-black-1 py-2 px-5 w-max mx-auto text-white text-center hover:opacity-90 btn transition-opacity ${mutation.isPending ? ' pointer-events-none' : ''}`}>
            {mutation.isPending ? <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" /> : "CREATE PRODUCT"}
          </div>
          {mutation.isError && <div className="text-xss text-center text-red-1">{mutation.error.message}</div>}
        </div>
      </div>
    }
  </div >
}

function Products() {
  const query = useQuery({
    queryKey: ['products', { q: {} }],
    queryFn: () => ProductAPI.find({ q: {} }),
    initialData: { products: [] }
  })
  return <div className="flex flex-col gap-10">
    {
      query.data.products.map(e => <div key={e._id} className="flex gap-5 items-center">
        <img src={e.avatar} className="w-20 h-20 overflow-hidden object-cover" />
        <Link href={'/admin/product/' + e._id} className="hover:text-red-1">{e._id}</Link>
        <div>{e.name}</div>
      </div>)
    }
  </div>
}

export default function Page() {

  const [index, setIndex] = useState(0)

  return <div className="bg-white-4 py-10 lg:px-10">
    <div className="text-4xl font-semibold text-center py-10">Products</div>
    <div className="flex gap-10 font-semibold overflow-y-auto py-5 px-10">
      {nav.map((e, i) => <div key={i} onClick={() => setIndex(i)} className={` ${index == i ? 'text-red-1' : 'hover:text-red-1'} shrink-0 btn`}>{e}</div>)}
    </div>
    <div className="p-10 bg-white-1">
      {index === 0 && <Create />}
      {index === 1 && <Charts />}
      {index === 2 && <Products />}
    </div>
  </div>
}