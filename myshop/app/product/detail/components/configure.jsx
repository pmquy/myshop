import { IoMdArrowBack } from "react-icons/io";
import { useMemo, useState } from "react"

export default function Configure({ product, initalOption, handleSubmit }) {
  const [index, setIndex] = useState(0)
  const [option, setOption] = useState(initalOption ? initalOption : Object.keys(product.option).reduce((prev, cur) => { return { ...prev, [cur]: 0 } }, {}))
  const [edit, setEdit] = useState()
  
  const estimatedPrice = useMemo(() => {
    return Object.keys(option).reduce((prev, cur) => prev + product.option[cur][option[cur]].price, product.price)
  }, [option, product])

  const handleClick = () => {
    handleSubmit({
      product: product.name,
      username: 'username',
      quantity: 1,
      option: option
    })
  }

  return <div className="md:p-10 bg-white-2 flex flex-col">
    <div className="flex gap-5 text-grey-1 font-medium px-10 py-5">
      <div onClick={() => setIndex(0)} className={`${index == 0 ? 'text-red-1' : 'hover:text-red_1'} btn`}>Recommendations</div>
      <div onClick={() => setIndex(1)} className={`${index == 1 ? 'text-red-1' : 'hover:text-red_1'} btn`}>3D Configurator</div>
    </div>
    <div className="md:p-10 bg-white-1">
      {
        index == 0 && <div style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }} className=" grid gap-5 p-5">
          {
            product.recommendations.map((e, i) => {
              return <div key={i} className=" flex flex-col gap-5 border-2 border-white-3">
                <img src={e.image} />
                <div onClick={() => { setIndex(1); setOption(e.option) }} className="bg-black-1 text-white-1 hover:opacity-90 transition-opacity p-5 btn text-center">CONFIGURE</div>
              </div>
            })
          }
        </div>
      }
      {
        index == 1 && <div className="flex max-lg:flex-col">
          <div className=" relative z-0 flex-grow overflow-hidden" onScroll={e => e.stopPropagation()}>
            <spline-viewer url="https://prod.spline.design/r2DpVWo-tzZkZWAF/scene.splinecode"></spline-viewer>
          </div>
          <div className=" lg:w-[500px] flex flex-col gap-5 text-xss px-5 lg:border-l-2 max-lg:border-t-2 border-black-1">
            <div className="max-h-[400px] overflow-y-auto flex-grow overscroll-contain">
              {
                !edit ?
                  <div className="flex flex-col gap-2">
                    {Object.keys(option).map((e, i) => <div key={i} className=" hover:text-red-1 btn" onClick={() => setEdit(e)}><b className=" capitalize">{e}: </b>{product.option[e][option[e]].name}</div>)}
                  </div> :
                  <div className=" flex flex-col gap-5">
                    <div className="flex gap-5 items-center">
                      <IoMdArrowBack onClick={() => setEdit(null)} className=" w-8 h-8 hover:text-red-1" />
                      <div className="capitalize font-semibold">{edit}</div>
                    </div>
                    <div className="grid gap-5 p-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(100px,1fr))' }}>
                      {
                        product.option[edit].map((e, i) => {
                          return <div key={i} onClick={() => setOption({ ...option, [edit]: i })} className={`normal-card p-2 ${option[edit] == i ? 'border-2 border-red-1' : ''}`}>
                            <img className=" object-cover object-center" src={e.image}></img>
                            <div className=" text-center">{e.name}</div>
                          </div>
                        })
                      }
                    </div>
                  </div>
              }
            </div>
            <div className="flex-grow flex flex-col gap-5 justify-end">
              <div className="bg-white-3 text-center py-5">Estimated delivery:<br />Friday, 26 July - Thursday, 01 August</div>
              <div className="flex gap-5 justify-between items-center">
                <div className="">include sales tax, plus costs of shipping</div>
                <div className="text-xl font-semibold text-nowrap">USD {estimatedPrice}</div>
              </div>
              <div onClick={handleClick} className="bg-black-1 py-2 text-white text-center text-xl hover:opacity-90 btn transition-opacity">ADD TO CART</div>
            </div>
          </div>
        </div>
      }
    </div>

  </div >
}