'use client'

import { RatingAPI } from "@/apis"
import { useMetaData } from "@/app/hooks"
import { parseDate } from "@/utils"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { FaStar, FaUser } from "react-icons/fa"

function List({ product_id, ratings, setRatings }) {
  const pageRef = useRef(0)
  const hasMoreRef = useRef(true)

  const mutation = useMutation({
    mutationFn: () => RatingAPI.find({ q: { product: product_id, status: "Done" }, page: pageRef.current, limit: 5 }).then(res => {
      pageRef.current += 1;
      hasMoreRef.current = res.hasMore
      setRatings(prev => [...prev, ...res.ratings])
    })
  })

  useEffect(() => {
    RatingAPI.find({ q: { product: product_id, status: "Done" }, page: 0, limit: 5 }).then(res => {
      pageRef.current = 1;
      hasMoreRef.current = res.hasMore
      setRatings(res.ratings)
    })
  }, [])

  return <div className="flex flex-col gap-5">
    {
      ratings.map(e => <div className="flex gap-2 items-center" key={e._id}>
        <div className="flex flex-col items-center gap-3" title={e.displayName}>
          <FaUser className="w-8 h-8" />
          <div className="w-32 text-center text-nowrap overflow-hidden overflow-ellipsis">{e.displayName}</div>
        </div>
        <div className="card p-2 flex flex-col gap-2 grow">
          <div className="text-xs text-red-1">{parseDate(e.updatedAt)}</div>
          <div>
            <span className="text-yellow-600">{"★★★★★".slice(0, e.star)}</span>
            <span className="text-grey-1">{"★★★★★".slice(e.star, 5)}</span>
          </div>
          <div>{e.comment}</div>
        </div>
      </div>)
    }
    {ratings.length === 0 && <div>No rating found</div>}
    {hasMoreRef.current && <button onClick={mutation.mutate} className="text-grey-1 hover:text-red-1 text-center">Load more</button>}
    {mutation.isPending && <AiOutlineLoading3Quarters className="w-8 h-8 mx-auto animate-loading" />}
  </div>
}

function CreateRating({ product_id, setRatings }) {
  const commentRef = useRef()
  const [star, setStar] = useState(5)
  const { user } = useMetaData()

  const mutation = useMutation({
    mutationFn: () => {
      if (!commentRef.current.value) throw new Error("Please write comment")
      return RatingAPI.create({
        comment: commentRef.current.value,
        star,
        product: product_id
      })
    },
    onSuccess: (data) => setRatings(prev => [{ comment: commentRef.current.value, star, updatedAt: Date.now(), displayName: user.firstName + ' ' + user.lastName }, ...prev])
  })

  return <div className="flex flex-col gap-5 m-auto sticky top-72 bg-white-1 card p-5">
    <div className="flex gap-1">
      {[1, 1, 1, 1, 1].map((e, i) => <FaStar key={i} onClick={() => setStar(i + 1)} color={i < star ? "orange" : "grey"} className="w-8 btn h-8" />)}
    </div>
    <textarea className="p-2 outline-none resize-none border-2" rows={4} ref={commentRef} placeholder="Review" />
    <button onClick={mutation.mutate} className={`bg-black-1 py-2 px-5 text-white text-center hover:opacity-90 transition-opacity ${mutation.isPending ? ' pointer-events-none' : ''}`}>
      {mutation.isPending ? <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" /> : "COMMENT"}
    </button>
    {mutation.isError && <div className="text-xss text-center text-red-1">{mutation.error.message}</div>}
  </div>
}

function Title({ product_id }) {
  const query = useQuery({
    queryKey: ['avg_rating', product_id],
    queryFn: () => RatingAPI.getAvgRating({ q: { product: product_id } }),
  })
  return <div className="text-4xl text-center p-10">Ratings {query.isSuccess ? query.data : ""}</div>
}

export default function Rating({ product_id }) {
  const [ratings, setRatings] = useState([])

  return <div className="">
    <Title product_id={product_id} />
    <div className="flex gap-10 max-lg:flex-col max-lg:p-5 p-10 ">
      <div className="grow">
        <List ratings={ratings} setRatings={setRatings} product_id={product_id} />
      </div>
      <div className="relative lg:w-[300px]">
        <CreateRating product_id={product_id} setRatings={setRatings} />
      </div>
    </div>
  </div>
}