import { IoMdArrowBack } from "react-icons/io";
import { useMemo, useState } from "react"
import { useMutation } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Configure({ product, initialOption = {}, handleSubmit }) {
  const [index, setIndex] = useState(0)
  const [option, setOption] = useState(initialOption)
  const [edit, setEdit] = useState()

  const price = useMemo(() => {
    return Object.keys(option).reduce((prev, cur) => prev + product.options[cur][option[cur]].price, product.price)
  }, [option, product])

  const submitMutation = useMutation({
    mutationFn: () => {
      const t = Object.keys(product.options).find(e => !Object.keys(option).includes(e))
      if (t) throw new Error("Please select " + t)
      return handleSubmit({
        product: product._id,
        option: option
      })
    }
  })

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
                  <img className="object-cover object-center" src={e.avatar} />
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
          <img src={product.avatar} className="object-cover object-center overflow-hidden grow" />
          <div className=" lg:w-[500px] text-xss flex flex-col gap-5 p-5 shrink-0">
            <div className="max-h-[400px] overflow-y-auto grow overscroll-contain">
              {
                !edit ?
                  <div className="flex flex-col gap-2">
                    {
                      Object.keys(product.options).map((e, i) => <div key={i} className="flex hover:text-red-1 btn justify-between items-center gap-5" onClick={() => setEdit(e)}>
                        <div className="text-nowrap overflow-x-hidden overflow-ellipsis"><b className=" capitalize">{e}: </b> {product.options[e][option[e]]?.name}</div>
                        {product.options[e][option[e]] && <img src={product.options[e][option[e]].avatar} className="w-12 h-12 object-cover object-center" />}
                      </div>)
                    }
                  </div>
                  :
                  <div className=" flex flex-col gap-5">
                    <div className="flex gap-5 items-center">
                      <IoMdArrowBack onClick={() => setEdit(null)} className=" w-8 h-8 hover:text-red-1" />
                      <div className="capitalize font-semibold">{edit}</div>
                    </div>
                    <div className="grid gap-5 p-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(100px,1fr))' }}>
                      {
                        product.options[edit].map((e, i) => {
                          return <div title={e.name} key={i} onClick={() => {setOption({ ...option, [edit]: i }); setEdit(null)}} className={`flex flex-col p-2 border-2 rounded-lg ${option[edit] == i ? ' border-red-1' : 'border-transparent normal-card '}`}>
                            <img className=" grow object-center object-cover" src={e.avatar}></img>
                            <div className=" text-center overflow-hidden text-nowrap text-ellipsis">{e.name}</div>
                            <div className=" text-center text-xss font-semibold">${e.price}</div>
                          </div>
                        })
                      }
                    </div>
                  </div>
              }
            </div>
            <div className="flex flex-col gap-5 justify-end">
              <div className="bg-white-3 text-center py-5">Estimated delivery:<br />Friday, 26 July - Thursday, 01 August</div>
              <div className="flex gap-5 justify-between items-center">
                <div className="">include sales tax, plus costs of shipping</div>
                <div className="text-xl font-semibold text-nowrap">USD {price}</div>
              </div>
              <div className="flex gap-5 justify-between items-center">
                <div className="">Inventory amount</div>
                <div className="text-xl font-semibold text-nowrap">{product.inventoryAmount}</div>
              </div>
              <div onClick={submitMutation.mutate} className={`bg-black-1 py-2 text-white text-center text-xl hover:opacity-90 btn transition-opacity ${submitMutation.isPending ? ' pointer-events-none' : ''}`}>
                {submitMutation.isPending ? <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" /> : "ADD TO CART"}
              </div>
              {submitMutation.isError && <div className="text-xss text-center text-red-1">{submitMutation.error.message}</div>}
            </div>
          </div>
        </div>
      }
    </div>

  </div >
}