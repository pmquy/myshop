'use client'

import { DesignerAPI } from "@/apis"
import { Input } from "@/ui"
import { useMutation } from "@tanstack/react-query"
import { cloneElement, useRef, useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

const nav = ['Create', 'Update', 'Delete', 'Dashboard']

function Delete({ designer }) {

  const mutation = useMutation({
    mutationFn: () => {
      if (confirm("Delete this designer?")) return DesignerAPI.deleteById
    }
  })

  return <div className="flex flex-col gap-5">
    <div className="break-all"><b>Name: </b>{designer.name}</div>
    <div className="break-all"><b>Description: </b>{designer.description}</div>
    <div className="break-all"><b>Avatar: </b>{designer.avatar}</div>
    <div className="break-all"><b>Images: </b>{designer.images}</div>
    <div onClick={mutation.mutate} className={`bg-black-1 py-2 px-5 w-max m-auto text-white text-center hover:opacity-90 btn transition-opacity ${mutation.isPending ? ' pointer-events-none' : ''}`}>
      {mutation.isPending ? <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" /> : "DELETE DESIGNER"}
    </div>
    {mutation.isError && <div className="text-xss text-center text-red-1">{mutation.error.message}</div>}
  </div>
}

function Update({ designer }) {
  const nameRef = useRef(), descriptionRef = useRef(), avatarRef = useRef(), imagesRef = useRef()
  const mutation = useMutation({
    mutationFn: e => {
      e.preventDefault()
      if (!nameRef.current.value) throw new Error("Name is empty")
      if (!descriptionRef.current.value) throw new Error("Description is empty")
      if (!avatarRef.current.value) throw new Error("Avatar is empty")
      if (!imagesRef.current.value) throw new Error("Images is empty")
      if (confirm("Update this designer?"))
        return DesignerAPI.updateById(designer._id, {
          name: nameRef.current.value != designer.name ? nameRef.current.value : undefined,
          description: descriptionRef.current.value != designer.description ? descriptionRef.current.value : undefined,
          avatar: avatarRef.current.value != designer.avatar ? avatarRef.current.value : undefined,
          images: imagesRef.current.value != designer.images ? imagesRef.current.value.split(',') : undefined,
        })
    }
  })

  return <div className="flex flex-col gap-5">
    <Input placeholder="Name" ref={nameRef} defaultValue={designer.name} />
    <Input placeholder="Description" ref={descriptionRef} defaultValue={designer.description} />
    <Input placeholder="Avatar url" ref={avatarRef} defaultValue={designer.avatar} />
    <img src={designer.avatar} className="h-36 w-max" />
    <Input placeholder="Image urls (Split by ',')" ref={imagesRef} defaultValue={designer.images} />
    <div className="flex flex-wrap gap-2">
      {designer.images.split(',').map(e => <img className="h-36" src={e} />)}
    </div>
    <div onClick={mutation.mutate} className={`bg-black-1 py-2 px-5 w-max m-auto text-white text-center hover:opacity-90 btn transition-opacity ${mutation.isPending ? ' pointer-events-none' : ''}`}>
      {mutation.isPending ? <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" /> : "UPDATE DESIGNER"}
    </div>
    {mutation.isError && <div className="text-xss text-center text-red-1">{mutation.error.message}</div>}
  </div>
}

function SelectDesigner({ children }) {
  const idRef = useRef()
  const [designer, setDesigner] = useState()

  const mutation = useMutation({
    mutationFn: async e => {
      e.preventDefault()
      return DesignerAPI.findById(idRef.current.value).then(designer => {
        designer.images = designer.images.join(',')
        setDesigner(designer)
      })
    },
    mutationKey: ['search_designer']
  })

  return <div className="flex flex-col gap-5">
    <form onSubmit={mutation.mutate} className="flex gap-5 items-center">
      <Input className="grow" placeholder="Designer id" ref={idRef} />
      <input type="submit" value="FIND DESIGNER" className="bg-black-1 hover:opacity-90 transition-opacity py-2 px-5 w-max text-white-1 btn" />
    </form>
    {mutation.isError && <div className="text-red-1 text-xs">{mutation.error.message}</div>}
    {mutation.isPending && <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" />}
    {mutation.isSuccess && cloneElement(children, { designer })}
  </div>
}

function Create() {
  const nameRef = useRef(), descriptionRef = useRef(), avatarRef = useRef(), imagesRef = useRef()

  const mutation = useMutation({
    mutationFn: e => {
      e.preventDefault()
      if (!nameRef.current.value) throw new Error("Name is empty")
      if (!descriptionRef.current.value) throw new Error("Description is empty")
      if (!avatarRef.current.value) throw new Error("Avatar is empty")
      if (!imagesRef.current.value) throw new Error("Images is empty")
      return DesignerAPI.create({
        name: nameRef.current.value,
        description: descriptionRef.current.value,
        avatar: avatarRef.current.value,
        images: imagesRef.current.value.split(','),
      })
    }
  })

  return <div className="flex flex-col gap-5">
    <Input placeholder="Name" ref={nameRef} />
    <Input placeholder="Description" ref={descriptionRef} />
    <Input placeholder="Avatar url" ref={avatarRef} />
    <Input placeholder="Image urls (Split by ',')" ref={imagesRef} />
    <div onClick={mutation.mutate} className={`bg-black-1 py-2 px-5 w-max m-auto text-white text-center hover:opacity-90 btn transition-opacity ${mutation.isPending ? ' pointer-events-none' : ''}`}>
      {mutation.isPending ? <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" /> : "CREATE DESIGNER"}
    </div>
    {mutation.isError && <div className="text-xss text-center text-red-1">{mutation.error.message}</div>}
  </div>
}

export default function Page() {
  const [index, setIndex] = useState(0)

  return <div className="bg-white-4 py-10 lg:px-10">
    <div className="text-4xl font-semibold text-center py-10">Designer</div>
    <div className="flex gap-10 font-semibold overflow-y-auto py-5 px-10">
      {nav.map((e, i) => <div key={i} onClick={() => setIndex(i)} className={` ${index == i ? 'text-red-1' : 'hover:text-red-1'} shrink-0 btn`}>{e}</div>)}
    </div>
    <div className="p-10 bg-white-1">
      {index === 0 && <Create />}
      {index === 1 && <SelectDesigner><Update /></SelectDesigner>}
      {index === 2 && <SelectDesigner><Delete /></SelectDesigner>}
    </div>
  </div>
}


