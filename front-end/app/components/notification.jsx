
import { RiNotification4Line } from "react-icons/ri";
import { useMetaData } from "../hooks";
import { NotificationAPI } from "@/apis";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { parseDate } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function List({ open, setOpen }) {
  const [notifications, setNotifications] = useState([])
  const pageRef = useRef(0)
  const hasMoreRef = useRef(true)
  const ref = useRef()

  const mutation = useMutation({
    mutationFn: () => {
      return NotificationAPI.find({ q: {}, page: pageRef.current, limit: 5 })
    },
    onSuccess: (res) => {
      setNotifications(prev => [...prev, ...res.notifications])
      hasMoreRef.current = res.hasMore
      pageRef.current += 1
    }
  })

  useEffect(() => {
    if (open) {
      pageRef.current = 0
      hasMoreRef.current = true
      setNotifications([])
      const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting && hasMoreRef.current) {
            mutation.mutate()
          }
        })
      }, { rootMargin: '200px' })
      if (ref.current) observer.observe(ref.current)
      return () => {
        if (ref.current) observer.unobserve(ref.current)
        observer.disconnect()
      }
    }
  }, [open])

  return <div className="relative bg-white-2 w-[500px]">
    <div className={`text-xss  ${open ? 'max-h-96' : 'max-h-0'} transition-all overflow-y-auto duration-500 flex flex-col `}>
      {
        notifications.map(e =>
          <Link href={e.link} onClick={() => setOpen(false)} key={e._id} className=" py-2 px-5 hover:bg-white-3">
            <div className=" break-all">{e.message}</div>
            <div className="text-red-1 text-end">{parseDate(e.createdAt)}</div>
          </Link>
        )
      }
      <div ref={ref}></div>
    </div>
    {mutation.isPending && notifications.length !== 0 && <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading mx-auto absolute bottom-2 left-1/2 -translate-x-1/2" />}
  </div>
}


export default function Notification() {
  const { user } = useMetaData()
  const [open, setOpen] = useState(false)

  return <div className="relative">
    <RiNotification4Line onClick={() => setOpen(prev => !prev)} className={`w-10 h-10 btn rounded-full p-2 ${open ? "bg-red-1 text-white-1" : "hover:text-red-1"} `} />
    {user && <div className={`absolute -bottom-2 translate-y-full right-0`}><List open={open} setOpen={setOpen} user={user._id} /></div>}
  </div>
}