'use client'

import { forwardRef, useState } from "react"
import { MdArrowDropDown } from "react-icons/md";

const Select = forwardRef(function ({ choices, placeholder, onChange, ...props}, ref) {
  const [open, setOpen] = useState()

  const handleClick = ({e, i}) => {
    ref.current.value = e
    setOpen(false)
    if(onChange) onChange({e, i})
  }

  return <div className="relative">
    <input {...props} onBlur={() => setTimeout(() => setOpen(false), 200)} onFocus={() => setOpen(true)} readOnly placeholder="" className="p-2 pt-5 border-white-3 border-2 w-full outline-none peer" ref={ref}></input>
    <div className={`absolute text-grey-1 left-2 top-1/2 -translate-y-1/2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-3 ${open ? 'top-3 text-xs' : ''} transition-all select-none`}>{placeholder}</div>
    <MdArrowDropDown className="w-8 h-8 absolute right-2 top-1/2 -translate-y-1/2 peer-focus:rotate-180 transition-transform" />
    <div className={`absolute bg-white-1 z-[1] border-x-2 border-b-2 border-white-3 bottom-0 translate-y-full w-full max-h-72 overflow-y-auto overscroll-contain ${open ? '' : 'hidden'}`}>
      {choices.map((e, i) => <div onClick={() => handleClick({e, i})} key={i} className="p-3 btn transition-colors hover:bg-white-2">{e}</div>)}
    </div>
  </div>
})

Select.displayName = "Select"

export default Select