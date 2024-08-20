'use client'

import { forwardRef, useRef } from "react"
import { IoMdCheckmark } from "react-icons/io"

const Checkbox = forwardRef(function ({ onClick, checked = false, ...props }, ref) {
  const t = useRef()

  const handleClick = e => {
    t.current.classList.toggle('text-transparent')
    ref.current.checked = !ref.current.checked
    if(onClick) onClick()
  }

  return <div ref={t} className={`btn ${checked ? '' : 'text-transparent'} border-2 border-white-3`}>
    <IoMdCheckmark onClick={handleClick} className={`w-5 h-5`} />
    <input type="checkbox" {...props} hidden ref={ref} checked={checked}/>
  </div>
})

Checkbox.displayName = 'Checkbox'

export default Checkbox