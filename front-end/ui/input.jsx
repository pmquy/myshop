'use client'

import { forwardRef } from "react"

const Input = forwardRef(function ({ className, placeholder, ...props }, ref) {

  return <div className={`${className} relative`}>
    <input {...props} placeholder="" className={`outline-none w-full border-white-3 border-2 peer p-2 pt-5`} ref={ref} />
    <div className="absolute text-grey-1 left-2 top-1/2 -translate-y-1/2 peer-focus:text-xs peer-focus:top-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-3 transition-all select-none">{placeholder}</div>
  </div>
})

Input.displayName = 'Input'

export default Input