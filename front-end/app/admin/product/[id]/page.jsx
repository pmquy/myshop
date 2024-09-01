'use client'
import { OrderAPI, ProductAPI } from "@/apis"
import { ProductDetail } from "@/app/product/detail/components"
import { useProduct } from "@/app/product/hooks"
import { Input, Select } from "@/ui"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Line } from "react-chartjs-2"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { IoMdAddCircle } from "react-icons/io"
import { IoCloseCircle } from "react-icons/io5"
import { RiDeleteBack2Fill } from "react-icons/ri"

const nav = ['Product', 'Update', 'Dashboard']

function Product({ product }) {

  const mutation = useMutation({
    mutationFn: () => {
      if (confirm("Delete this product?")) return ProductAPI.deleteById(product._id)
    }
  })

  return <div className="flex flex-col gap-5">
    <div className="max-h-[500px] overflow-y-auto border-2 border-white-3">
      <ProductDetail product={product} />
    </div>
    <div onClick={mutation.mutate} className={`bg-red-1 py-2 px-5 w-max m-auto text-white text-center hover:opacity-90 btn transition-opacity ${mutation.isPending ? ' pointer-events-none' : ''}`}>
      {mutation.isPending ? <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" /> : "DELETE PRODUCT"}
    </div>
    {mutation.isError && <div className="text-xss text-center text-red-1">{mutation.error.message}</div>}
  </div>
}

function Update({ originalProduct }) {

  const product = useMemo(() => {
    const product = { ...originalProduct }
    product.images = product.images.join(',')
    const a = []
    product.recommendations.forEach(({ option, ...rest }) => a.push({ ...rest, option: Object.entries(option).map(e => e[0] + ',' + e[1]) }))
    product.recommendations = a
    const arr = []
    Object.keys(product.options ? product.options : {}).forEach(e =>
      product.options[e].forEach(t => arr.push({ key: e, ...t }))
    )
    product.options = arr
    return product
  }, [originalProduct])

  const { designers, categories, rooms } = useProduct()
  const nameRef = useRef(), descriptionRef = useRef(), avatarRef = useRef(), imagesRef = useRef(), designerRef = useRef(), categoryRef = useRef(), roomRef = useRef(), priceRef = useRef(), inventoryAmountRef = useRef()
  const [options, setOptions] = useState(product.options)
  const [recommendations, setRecommendations] = useState(product.recommendations)
  const [preview, setPreview] = useState()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    }
    return () => document.body.style.overflow = 'auto'
  }, [open])

  const handleAddOption = useCallback(() => {
    setOptions([...options, { key: "Type", name: 'Name', price: 0, avatar: 'https://image_url_here' }])
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
    mutationFn: async (callback) => {
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

      if (confirm("Update this product?")) {
        const update = {}
        if (nameRef.current.value != product.name) update.name = nameRef.current.value
        if (descriptionRef.current.value != product.description) update.description = descriptionRef.current.value
        if (avatarRef.current.value != product.avatar) update.avatar = avatarRef.current.value
        if (imagesRef.current.value != product.images) update.images = imagesRef.current.value.split(',')
        if (designerRef.current.value != product.designer) update.designer = designerRef.current.value
        if (categoryRef.current.value != product.category) update.category = categoryRef.current.value
        if (roomRef.current.value != product.room) update.room = roomRef.current.value
        if (priceRef.current.value != product.price) update.price = Number.parseInt(priceRef.current.value)
        if (inventoryAmountRef.current.value != product.inventoryAmount) update.inventoryAmount = Number.parseInt(inventoryAmountRef.current.value)
        if (JSON.stringify(product.recommendations) != JSON.stringify(recommendations)) update.recommendations = B
        if (JSON.stringify(product.options) != JSON.stringify(options)) update.options = A
        return callback.call(null, update)
      }
    },
    onSuccess: () => setOpen(prev => !prev)
  })

  return <div>
    <div className="flex flex-col gap-5 relative">
      <div className="flex flex-col gap-5 sticky top-28 z-[1] w-max m-auto">
        <button onClick={() => mutation.mutate(update => setPreview({ ...originalProduct, ...update }))} className={`bg-green-600 py-2 px-5 text-white text-center hover:opacity-90 transition-opacity`}>PREVIEW</button>
        {mutation.isError && <div className="text-xss text-center text-red-1">{mutation.error.message}</div>}
      </div>
      <Input placeholder="Name" ref={nameRef} defaultValue={product.name} />
      <Input placeholder="Description" ref={descriptionRef} defaultValue={product.description} />
      <Input placeholder="Avatar url" ref={avatarRef} defaultValue={product.avatar} />
      <Input placeholder="Image urls (Split by ',')" ref={imagesRef} defaultValue={product.images} />
      <Select placeholder="Designer" ref={designerRef} choices={designers.map(e => e.name)} defaultValue={product.designer} />
      <Select placeholder="Category" ref={categoryRef} choices={categories.map(e => e.name)} defaultValue={product.category} />
      <Select placeholder="Room" ref={roomRef} choices={rooms.map(e => e.name)} defaultValue={product.room} />
      <Input placeholder="Price" type="number" min={0} defaultValue={product.price} ref={priceRef} />
      <Input placeholder="Inventory amount" defaultValue={product.inventoryAmount} type="number" ref={inventoryAmountRef} />

      <div className="text-xl font-semibold">Options</div>
      <div className="px-10 flex flex-col gap-10">
        {
          options.map((e, i) =>
            <div key={i} className="flex gap-5 items-center">
              <div key={i} className="flex flex-col gap-1 grow">
                <Input onChange={e => handleChangeOption(i, "key", e.target.value)} placeholder="Key" value={e.key} />
                <Input onChange={e => handleChangeOption(i, "name", e.target.value)} placeholder="Name" value={e.name} />
                <Input onChange={e => handleChangeOption(i, "avatar", e.target.value)} placeholder="Avatar" value={e.avatar} />
                <Input onChange={e => handleChangeOption(i, "price", Number.parseInt(e.target.value))} placeholder="Price" type="number" value={e.price} />
              </div>
            </div>
          )
        }
        <div onClick={handleAddOption} className="bg-black-1 hover:opacity-90 transition-opacity py-2 px-5 w-max text-white-1 btn">CREATE OPTION</div>
      </div>

      <div className="text-xl font-semibold">Recommendations</div>
      <div className="px-10 flex flex-col gap-10">
        {
          recommendations.map((e, i) =>
            <div key={i} className="flex gap-5 items-center">
              <RiDeleteBack2Fill onClick={() => handleDeleteRecommendation(i)} className="w-8 h-8 hover:text-red-1" />
              <div key={i} className="flex flex-col gap-1 grow">
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
          <div onClick={() => mutation.mutate(update => ProductAPI.updateById(product._id, update))} className={`bg-black-1 py-2 px-5 w-max mx-auto text-white text-center hover:opacity-90 btn transition-opacity ${mutation.isPending ? ' pointer-events-none' : ''}`}>
            {mutation.isPending ? <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" /> : "UPDATE PRODUCT"}
          </div>
          {mutation.isError && <div className="text-xss text-center text-red-1">{mutation.error.message}</div>}
        </div>
      </div>
    }
  </div>
}

function Dashboard({ product }) {
  const startAtRef = useRef(), endAtRef = useRef()
  const [summary2, setSummary2] = useState({ labels: [], datasets: [] })

  const searchMutation = useMutation({
    mutationFn: async () => {
      if (!startAtRef.current.value || !endAtRef.current.value) throw new Error("Please select start and end date")
      await OrderAPI.summary2({ startAt: startAtRef.current.value, endAt: endAtRef.current.value, product: product._id }).then(setSummary2)
    },
  })

  return <div className="flex flex-col gap-5">
    <div className="flex gap-5">
      <div>Start at</div>
      <input required={true} type="date" ref={startAtRef} />
    </div>
    <div className="flex gap-5">
      <div>End at</div>
      <input required={true} type="date" ref={endAtRef} />
    </div>
    <button onClick={searchMutation.mutate} className={`bg-black-1 py-2 px-5 w-max m-auto text-white text-center hover:opacity-90 transition-opacity ${searchMutation.isPending ? ' pointer-events-none' : ''}`}>
      {searchMutation.isPending ? <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" /> : "SEARCH"}
    </button>
    {searchMutation.isError && <div className="text-xss text-center text-red-1">{searchMutation.error.message}</div>}

    <Line
      options={{
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: `The ordered quantity of product ${product._id}`,
          },
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'Quantity of orders'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Time'
            }
          },
        }
      }}

      data={{
        labels: summary2.labels,
        datasets: summary2.datasets
      }}

    />
  </div>
}

export default function Page() {

  const { id } = useParams()
  const [index, setIndex] = useState(0)

  const query = useQuery({
    queryKey: ['product', id],
    queryFn: () => ProductAPI.findById(id)
  })

  if (query.isLoading) return <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading" />
  if(query.isError) return <div className="p-10 text-center">Product not found</div>

  return <div className="bg-white-4 py-10 lg:px-10">
    <div className="text-4xl max-lg:text-xl font-semibold text-center py-10">Product {id}</div>
    <div className="flex gap-10 font-semibold overflow-y-auto py-5 px-10">
      {nav.map((e, i) => <div key={i} onClick={() => setIndex(i)} className={` ${index == i ? 'text-red-1' : 'hover:text-red-1'} shrink-0 btn`}>{e}</div>)}
    </div>
    <div className="p-10 bg-white-1">
      {index == 0 && <Product product={query.data} />}
      {index == 1 && <Update originalProduct={query.data} />}
      {index == 2 && <Dashboard product={query.data} />}
    </div>
  </div>
}