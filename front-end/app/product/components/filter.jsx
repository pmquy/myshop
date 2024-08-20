'use client'

import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { memo, useCallback, useMemo, useState } from "react";
import { IoIosArrowDown, IoMdCheckmark } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";

const FiltersMemo = memo(({ filters }) => {
  const router = useRouter()
  const pathname = usePathname()

  return <div className=" flex gap-5 flex-wrap items-center">
    {filters.map((e, i) => <div className=" py-2 px-5 border-2 border-white-3 rounded-3xl text-xs flex gap-2 items-center" key={i}>
      {e[1]}
      <MdOutlineClose onClick={() => handleFilter(e[0], e[1])} className="w-4 cursor-pointer h-4" />
    </div>
    )}
    {!!filters.length && <div onClick={() => router.push(pathname, { scroll: false })} className="text-grey-1 hover:text-red-1 underline cursor-pointer select-none">Delete selection</div>}
  </div>
})

FiltersMemo.displayName = 'FiltersMemo'

export default function Filter({ filter }) {
  const [filterBy, setFilterBy] = useState()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const filters = useMemo(() => {
    return [...searchParams.entries()]
  }, [searchParams])

  const handleFilter = useCallback((key, value) => {
    const params = new URLSearchParams(searchParams.toString())
    if (params.has(key, value)) {
      params.delete(key, value)
    } else {
      params.append(key, value)
    }
    router.push(pathname + '?' + params.toString(), { scroll: false })
  }, [searchParams])

  return <div className="p-10 flex flex-col gap-5 max-md:p-5">

    <div className="p-5 gap-10 flex md:items-center max-md:flex-col max-md:gap-5">
      <div className="text-grey-1">Filter products:</div>
      {
        Object.keys(filter).map((e, i) => {
          return <div key={i} onClick={() => setFilterBy(prev => e === prev ? '' : e)} className={` select-none cursor-pointer flex gap-2 ${filterBy === e ? ' text-red-1' : ' hover:text-grey-1'}`}>
            <div className=" first-letter:uppercase">{e}</div>
            <IoIosArrowDown className={`${filterBy === e ? ' rotate-180' : ''} w-6 h-6`} />
          </div>
        })
      }
    </div>

    <div className=" border-b-2 border-white-3">
      {
        filterBy && <div className=" p-5 bg-white-2 flex gap-5 flex-wrap">
          {
            filter[filterBy].map(e => {
              const isCheck = searchParams.has(filterBy, e.name)
              return <div onClick={() => handleFilter(filterBy, e.name)} key={e._id} className=" select-none cursor-pointer flex gap-2 items-center hover:text-grey-1">
                <IoMdCheckmark className={`w-6 h-6 border-2 border-white-3 ${isCheck ? ' text-black-1' : 'text-white-2'}`} />
                <div>{e.name}</div>
              </div>
            })
          }
        </div>
      }
    </div>

    <FiltersMemo filters={filters} />
  </div>
}