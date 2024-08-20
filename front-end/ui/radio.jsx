import { useState , forwardRef, useEffect} from "react";

const Radio = forwardRef(function ({ choices, onChange}, ref) {
  const [value, setValue] = useState(ref.current)

  return <div className=" flex gap-10 flex-wrap">
    {
      choices.map((e, i) => {
        return <div className=" flex gap-2 items-center" key={i}>
          <div onClick={() => {
            if(e != value) {
              ref.current = e
              setValue(e)
              if(onChange) onChange(e)
            }
          }} className={`w-6 h-6 btn rounded-full relative shrink-0 border-2  ${e == value ? 'border-black-1' : 'border-white-3'}`}>
            <div className={`w-3 h-3 rounded-full absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 ${e == value ? 'bg-black-1' : 'bg-transparent'}`}></div>
          </div>
          <div>{e}</div>
        </div>
      })
    }
  </div>
})

Radio.displayName = "Radio"

export default Radio