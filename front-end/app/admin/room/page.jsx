'use client'

import { RoomAPI } from "@/apis"
import { Input } from "@/ui"
import { useMutation } from "@tanstack/react-query"
import { cloneElement, useRef, useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

const nav = ['Create', 'Update', 'Delete', 'Dashboard']

function Delete({ room }) {

  const mutation = useMutation({
    mutationFn: () => {
      if (confirm("Delete this room?")) return RoomAPI.deleteById
    }
  })

  return <div className="flex flex-col gap-5">
    <div className="break-all"><b>Name: </b>{room.name}</div>
    <div className="break-all"><b>Description: </b>{room.description}</div>
    <div className="break-all"><b>Avatar: </b>{room.avatar}</div>
    <div className="break-all"><b>Images: </b>{room.images}</div>
    <div onClick={mutation.mutate} className={`bg-black-1 py-2 px-5 w-max m-auto text-white text-center hover:opacity-90 btn transition-opacity ${mutation.isPending ? ' pointer-events-none' : ''}`}>
      {mutation.isPending ? <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" /> : "DELETE DESIGNER"}
    </div>
    {mutation.isError && <div className="text-xss text-center text-red-1">{mutation.error.message}</div>}
  </div>
}

function Update({ room }) {
  const nameRef = useRef(), descriptionRef = useRef(), avatarRef = useRef(), imagesRef = useRef()
  const mutation = useMutation({
    mutationFn: e => {
      e.preventDefault()
      if (!nameRef.current.value) throw new Error("Name is empty")
      if (!descriptionRef.current.value) throw new Error("Description is empty")
      if (!avatarRef.current.value) throw new Error("Avatar is empty")
      if (!imagesRef.current.value) throw new Error("Images is empty")
      if (confirm("Update this room?"))
        return RoomAPI.updateById(room._id, {
          name: nameRef.current.value != room.name ? nameRef.current.value : undefined,
          description: descriptionRef.current.value != room.description ? descriptionRef.current.value : undefined,
          avatar: avatarRef.current.value != room.avatar ? avatarRef.current.value : undefined,
          images: imagesRef.current.value != room.images ? imagesRef.current.value.split(',') : undefined,
        })
    }
  })

  return <div className="flex flex-col gap-5">
    <Input placeholder="Name" ref={nameRef} defaultValue={room.name} />
    <Input placeholder="Description" ref={descriptionRef} defaultValue={room.description} />
    <Input placeholder="Avatar url" ref={avatarRef} defaultValue={room.avatar} />
    <img src={room.avatar} className="h-36 w-max" />
    <Input placeholder="Image urls (Split by ',')" ref={imagesRef} defaultValue={room.images} />
    <div className="flex flex-wrap gap-2">
      {room.images.split(',').map(e => <img className="h-36" src={e} />)}
    </div>
    <div onClick={mutation.mutate} className={`bg-black-1 py-2 px-5 w-max m-auto text-white text-center hover:opacity-90 btn transition-opacity ${mutation.isPending ? ' pointer-events-none' : ''}`}>
      {mutation.isPending ? <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" /> : "UPDATE DESIGNER"}
    </div>
    {mutation.isError && <div className="text-xss text-center text-red-1">{mutation.error.message}</div>}
  </div>
}

function SelectRoom({ children }) {
  const idRef = useRef()
  const [room, setRoom] = useState()

  const mutation = useMutation({
    mutationFn: async e => {
      e.preventDefault()
      return RoomAPI.findById(idRef.current.value).then(room => {
        room.images = room.images.join(',')
        setRoom(room)
      })
    },
    mutationKey: ['search_room']
  })

  return <div className="flex flex-col gap-5">
    <form onSubmit={mutation.mutate} className="flex gap-5 items-center">
      <Input className="grow" placeholder="Room id" ref={idRef} />
      <input type="submit" value="FIND DESIGNER" className="bg-black-1 hover:opacity-90 transition-opacity py-2 px-5 w-max text-white-1 btn" />
    </form>
    {mutation.isError && <div className="text-red-1 text-xs">{mutation.error.message}</div>}
    {mutation.isPending && <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" />}
    {mutation.isSuccess && cloneElement(children, { room })}
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
      return RoomAPI.create({
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
    <div className="text-4xl font-semibold text-center py-10">Room</div>
    <div className="flex gap-10 font-semibold overflow-y-auto py-5 px-10">
      {nav.map((e, i) => <div key={i} onClick={() => setIndex(i)} className={` ${index == i ? 'text-red-1' : 'hover:text-red-1'} shrink-0 btn`}>{e}</div>)}
    </div>
    <div className="p-10 bg-white-1">
      {index === 0 && <Create />}
      {index === 1 && <SelectRoom><Update /></SelectRoom>}
      {index === 2 && <SelectRoom><Delete /></SelectRoom>}
    </div>
  </div>
}


