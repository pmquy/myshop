import { IoMdArrowBack } from "react-icons/io";
import { useMemo, useState } from "react"

export default function Configure({ product, initialOption, handleSubmit }) {
  const [index, setIndex] = useState(0)
  const [option, setOption] = useState(initialOption ? initialOption : Object.keys(product.options).reduce((prev, cur) => { return { ...prev, [cur]: 0 } }, {}))
  const [edit, setEdit] = useState()

  const estimatedPrice = useMemo(() => {
    return Object.keys(option).reduce((prev, cur) => prev + product.options[cur][option[cur]].price, product.price)
  }, [option, product])

  const handleClick = () => {
    handleSubmit({
      product: product._id,
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
        index == 0 && <div style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }} className=" grid gap-5 p-10">
          {
            product.recommendations.map((e, i) => {
              return <div key={i}>
                <div className="border-2 border-white-3">
                  <img src={e.avatar} />
                  <div className="p-3 text-center text-xl">{e.name}</div>
                </div>
                <div onClick={() => { setIndex(1); setOption(e.option) }} className="bg-black-1 text-white-1 hover:opacity-90 transition-opacity p-5 btn text-center">CONFIGURE</div>
              </div>
            })
          }
        </div>
      }
      {
        index == 1 && <div className="flex max-lg:flex-col">
          <div className=" relative z-0 flex-grow overflow-hidden">
            <spline-viewer url="https://prod.spline.design/r2DpVWo-tzZkZWAF/scene.splinecode"></spline-viewer>
          </div>
          <div className=" lg:w-[500px] text-xss flex flex-col gap-5 p-5 lg:border-l-2 max-lg:border-t-2 border-black-1">
            <div className="max-h-[400px] overflow-y-auto flex-grow overscroll-contain">
              {
                !edit ?
                  <div className="flex flex-col gap-2">
                    {
                      Object.keys(option).map((e, i) => <div key={i} className="flex overflow-x-hidden overflow-ellipsis hover:text-red-1 btn justify-between items-center" onClick={() => setEdit(e)}>
                        <div className=""><b className=" capitalize">{e}: </b> {product.options[e][option[e]].name}</div>
                        <img src={product.options[e][option[e]].avatar} className="w-12 h-12" />
                      </div>)
                    }
                  </div> :
                  <div className=" flex flex-col gap-5">
                    <div className="flex gap-5 items-center">
                      <IoMdArrowBack onClick={() => setEdit(null)} className=" w-8 h-8 hover:text-red-1" />
                      <div className="capitalize font-semibold">{edit}</div>
                    </div>
                    <div className="grid gap-5 p-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(100px,1fr))' }}>
                      {
                        product.options[edit].map((e, i) => {
                          return <div key={i} onClick={() => setOption({ ...option, [edit]: i })} className={`normal-card p-2 ${option[edit] == i ? 'border-2 border-red-1' : ''}`}>
                            <img className=" object-cover object-center" src={e.avatar}></img>
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
              <div className="flex gap-5 justify-between items-center">
                <div className="">Inventory amount</div>
                <div className="text-xl font-semibold text-nowrap">{product.inventoryAmount}</div>
              </div>
              <div onClick={handleClick} className="bg-black-1 py-2 text-white text-center text-xl hover:opacity-90 btn transition-opacity">ADD TO CART</div>
            </div>
          </div>
        </div>
      }
    </div>

  </div >
}