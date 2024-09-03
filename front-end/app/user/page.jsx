'use client'

import { useRouter } from "next/navigation"
import { useMetaData } from "../hooks"
import { useEffect, useRef, useState } from "react"
import { Input, Select, Radio } from "@/ui"
import { useMutation, useQueries, useQuery } from "@tanstack/react-query"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { OrderAPI, PageAPI, UserAPI, VoucherAPI } from "@/apis"
import { parseDate } from "@/utils"
import Link from "next/link"

function Summary({ setIndex, orders = [] }) {
  const { user } = useMetaData()

  return <div className="flex flex-col gap-10">
    <div className="flex justify-between text-nowrap">
      <div className="flex flex-col gap-5 grow">
        <div className="text-xl font-semibold">Your recent orders</div>
        <hr />
        {orders.length == 0 && <div className="">No orders found.</div>}
        {
          orders.slice(0, 3).map(e => <div key={e._id}>
            <div className="text-xss">Order <Link className="underline text-grey-1 hover:text-red-1" href={`/user/order/${e._id}`}>{e._id}</Link></div>
          </div>)
        }
      </div>
      <div className="flex flex-col gap-5 md:basis-1/6">
        <div className="text-xl font-semibold">Status</div>
        <hr />
        {
          orders.slice(0, 3).map(e => <div key={e._id}>
            <div className="text-xss">{e.status}</div>
          </div>)
        }
      </div>
      <div className="flex flex-col gap-5 basis-1/6 max-md:hidden">
        <div className="text-xl font-semibold">Created at</div>
        <hr />
        {
          orders.slice(0, 3).map(e => <div key={e._id}>
            <div className="text-xss">{parseDate(e.createdAt)}</div>
          </div>)
        }
      </div>
    </div>
    <div className="flex gap-10 max-lg:flex-col">
      <div className=" flex flex-col gap-5 basis-1/2">
        <div className="text-xl font-semibold">Personal data</div>
        <hr />
        <div className="flex flex-col gap-3">
          <div className="text-xss text-grey-1">Name</div>
          <div className=" font-semibold">{user.salutation + ' ' + user.firstName + ' ' + user.lastName}</div>
          <div className="text-xss text-grey-1">Email</div>
          <div className=" font-semibold">{user.email}</div>
        </div>
        <div onClick={() => setIndex(2)} className="text-xss underline text-grey-1 hover:text-red-1">Show personal data</div>
      </div>

      <div className=" flex flex-col gap-5 basis-1/2">
        <div className="text-xl font-semibold">Shipping address</div>
        <hr />
        {user.addresses.length == 0 && <div className="">Shipping address book is empty.</div>}
        {
          user.addresses.slice(0, 3).map((e, i) => <div key={i}>
            <div className="font-semibold">{e.salutation + ' ' + e.firstName + ' ' + e.lastName}</div>
            <div className="text-xss">{e.detail + ', ' + e.ward + ', ' + e.district + ', ' + e.province}</div>
          </div>)
        }
        <div onClick={() => setIndex(3)} className="text-xss underline text-grey-1 hover:text-red-1">Show more</div>
      </div>
    </div>
  </div>
}

function Orders({ orders = [] }) {
  return <div className="flex justify-between text-nowrap">
    <div className="flex flex-col gap-5 grow">
      <div className="text-xl font-semibold">Your recent orders</div>
      <hr />
      {orders.length == 0 && <div className="">No orders found.</div>}
      {
        orders.map(e => <div key={e._id}>
          <div className="text-xss">Order <Link className="underline text-grey-1 hover:text-red-1" href={`/user/order/${e._id}`}>{e._id}</Link></div>
        </div>)
      }
    </div>
    <div className="flex flex-col gap-5 md:basis-1/6">
      <div className="text-xl font-semibold">Status</div>
      <hr />
      {
        orders.map(e => <div key={e._id}>
          <div className="text-xss">{e.status}</div>
        </div>)
      }
    </div>
    <div className="flex flex-col gap-5 basis-1/6 max-md:hidden">
      <div className="text-xl font-semibold">Created at</div>
      <hr />
      {
        orders.map(e => <div key={e._id}>
          <div className="text-xss">{parseDate(e.createdAt)}</div>
        </div>)
      }
    </div>
  </div>
}

const salutations = ["Mr", "Ms", "Mx"]

function PersonalData() {
  const { user, setUser } = useMetaData()
  const salutationRef = useRef(user.salutation), firstNameRef = useRef(), lastNameRef = useRef()
  const currentPasswordRef = useRef(), newPasswordRef = useRef(), repeatPasswordRef = useRef()

  const updateMutation = useMutation({
    mutationFn: e => {
      e.preventDefault()
      if (!salutationRef.current) throw new Error("Salutation is empty!")
      if (!firstNameRef.current.value) throw new Error("First name is empty!")
      if (!lastNameRef.current.value) throw new Error("Last name is empty!")
      return UserAPI.updateMe({ salutation: salutationRef.current, firstName: firstNameRef.current.value, lastName: lastNameRef.current.value })
        .then(u => setUser(u))
    }
  })

  const changePasswordMutation = useMutation({
    mutationFn: e => {
      e.preventDefault()
      if (!currentPasswordRef.current.value) throw new Error("Current password is empty!")
      if (!newPasswordRef.current.value) throw new Error("New password is empty!")
      if (newPasswordRef.current.value != repeatPasswordRef.current.value) throw new Error('Different password!')
      return UserAPI.changePassword({ currentPassword: currentPasswordRef.current.value, password: newPasswordRef.current.value })
    }
  })

  return <div className=" flex flex-col gap-5">
    <div className="text-xl font-semibold">Personal data</div>
    <hr />
    <div className="flex gap-10 max-lg:flex-col">
      <div className="basis-1/2 relative">
        <form onSubmit={updateMutation.mutate} className={`flex flex-col gap-5 ${updateMutation.isPending ? 'opacity-70 pointer-events-none' : ''}`}>
          <div>Salutation</div>
          <Radio choices={salutations} ref={salutationRef} />
          <Input ref={firstNameRef} type="text" placeholder="First name" defaultValue={user.firstName} />
          <Input ref={lastNameRef} type="text" placeholder="Last name" defaultValue={user.lastName} />
          <input type="submit" value={"SAVE"} className="bg-black-1 text-white-1 font-semibold p-3 text-center btn hover:opacity-90 transition-opacity max-w-96 w-full mx-auto"></input>
          {updateMutation.isError && <div className="text-red-1 text-xss text-center">{updateMutation.failureReason.message}</div>}
        </form>
        {updateMutation.isPending && <AiOutlineLoading3Quarters className="w-8 h-8 m-auto animate-loading absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />}
      </div>
      <div className="basis-1/2 relative">
        <form onSubmit={changePasswordMutation.mutate} className={`flex flex-col gap-5 ${changePasswordMutation.isPending ? 'opacity-70 pointer-events-none' : ''}`}>
          <div className="text-xss text-grey-1">Email</div>
          <div className=" font-semibold">{user.email}</div>
          <Input ref={currentPasswordRef} type="password" placeholder="Current password" />
          <Input ref={newPasswordRef} type="password" placeholder="New password" />
          <Input ref={repeatPasswordRef} type="password" placeholder="Repeat password" />
          <input type="submit" value={"CHANGE PASSWORD"} className="bg-black-1 text-white-1 font-semibold p-3 text-center btn hover:opacity-90 transition-opacity max-w-96 w-full m-auto" ></input>
          {changePasswordMutation.isError && <div className="text-red-1 text-xss text-center">{changePasswordMutation.failureReason.message}</div>}
        </form>
        {changePasswordMutation.isPending && <AiOutlineLoading3Quarters className="w-8 h-8 m-auto animate-loading absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />}
      </div>
    </div>
  </div>
}

function AddAddress() {
  const { user, setUser } = useMetaData()

  const salutationRef = useRef(), firstNameRef = useRef(), lastNameRef = useRef(), provinceRef = useRef(), districtRef = useRef(), wardRef = useRef(), detailRef = useRef(), phoneNumberRef = useRef()
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])

  const query = useQuery({
    queryKey: ['provinces'],
    queryFn: () => PageAPI.getProvinces(),
    staleTime: Infinity
  })

  const addAddressMutation = useMutation({
    mutationFn: e => {
      e.preventDefault()
      if (!salutationRef.current) throw new Error("Salutation is empty!")
      if (!firstNameRef.current.value) throw new Error("First name is empty!")
      if (!lastNameRef.current.value) throw new Error("Last name is empty!")
      if (!phoneNumberRef.current.value) throw new Error("Phone number is empty!")
      if (!provinceRef.current.value) throw new Error("Province is empty!")
      if (!districtRef.current.value) throw new Error("District is empty!")
      if (!wardRef.current.value) throw new Error("Ward is empty!")
      if (!detailRef.current.value) throw new Error("Detail is empty!")

      user.addresses.push(
        {
          salutation: salutationRef.current,
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          phoneNumber: phoneNumberRef.current.value,
          province: provinceRef.current.value,
          district: districtRef.current.value,
          ward: wardRef.current.value,
          detail: detailRef.current.value,
        }
      )
      return UserAPI.updateMe({ addresses: user.addresses }).then(setUser)
    }
  })

  const handleChangeProvince = ({ e, i }) => {
    setDistricts(query.data[i].districts)
    setWards([])
    districtRef.current.value = ''
    wardRef.current.value = ''
  }

  const handleChangeDistrict = ({ e, i }) => {
    setWards(districts[i].wards)
    wardRef.current.value = ''
  }

  return <div className="relative basis-1/2">
    <form onSubmit={addAddressMutation.mutate} className={`flex flex-col gap-5 ${addAddressMutation.isPending ? 'opacity-70 pointer-events-none' : ''}`}>
      <div className="text-xl font-semibold">Add address</div>
      <hr />
      <div className="text-grey-1">Salutation</div>
      <Radio choices={salutations} ref={salutationRef} />
      <Input ref={firstNameRef} type="text" placeholder="First name" />
      <Input ref={lastNameRef} type="text" placeholder="Last name" />
      <Input ref={phoneNumberRef} type="text" placeholder="Phone number" />
      {query.isSuccess && <div className="flex flex-col gap-5">
        <Select onChange={handleChangeProvince} ref={provinceRef} placeholder="Province" choices={query.data.map(e => e.name)} />
        <Select onChange={handleChangeDistrict} ref={districtRef} placeholder="District" choices={districts.map(e => e.name)} />
        <Select ref={wardRef} placeholder="Ward" choices={wards.map(e => e.name)} />
      </div>}
      <Input ref={detailRef} type="text" placeholder="Detail" />
      <input type="submit" value={"ADD ADDRESS"} className="bg-black-1 text-white-1 font-semibold p-3 text-center btn hover:opacity-90 transition-opacity max-w-96 w-full m-auto"></input>
      {addAddressMutation.isError && <div className="text-red-1 text-xss text-center">{addAddressMutation.failureReason.message}</div>}
    </form>
    {addAddressMutation.isPending && <AiOutlineLoading3Quarters className="w-8 h-8 m-auto animate-loading absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />}
  </div>
}

function EditAddress({ i, setEdit }) {
  const { user, setUser } = useMetaData()

  const salutationRef = useRef(user.addresses[i].salutation), firstNameRef = useRef(), lastNameRef = useRef(), provinceRef = useRef(), districtRef = useRef(), wardRef = useRef(), detailRef = useRef(), phoneNumberRef = useRef()
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])

  const query = useQuery({
    queryKey: ['provinces'],
    queryFn: () => PageAPI.getProvinces(),
    staleTime: Infinity
  })

  useEffect(() => {
    if (query.isSuccess) {
      provinceRef.current.value = user.addresses[i].province
      districtRef.current.value = user.addresses[i].district
      wardRef.current.value = user.addresses[i].ward
      let e = query.data.find(e => e.name === provinceRef.current.value)
      setDistricts(e.districts)
      e = e.districts.find(e => e.name === districtRef.current.value)
      setWards(e.wards)
    }
  }, [query.isSuccess])

  const saveAddressMutation = useMutation({
    mutationFn: (e) => {
      e.preventDefault()
      if (!salutationRef.current) throw new Error("Salutation is empty!")
      if (!firstNameRef.current.value) throw new Error("First name is empty!")
      if (!lastNameRef.current.value) throw new Error("Last name is empty!")
      if (!phoneNumberRef.current.value) throw new Error("Phone number is empty!")
      if (!provinceRef.current.value) throw new Error("Province is empty!")
      if (!districtRef.current.value) throw new Error("District is empty!")
      if (!wardRef.current.value) throw new Error("Ward is empty!")
      if (!detailRef.current.value) throw new Error("Detail is empty!")

      user.addresses.splice(i, 1, {
        salutation: salutationRef.current,
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        phoneNumber: phoneNumberRef.current.value,
        province: provinceRef.current.value,
        district: districtRef.current.value,
        ward: wardRef.current.value,
        detail: detailRef.current.value,
      })
      return UserAPI.updateMe({ addresses: user.addresses }).then(u => { setEdit(null); setUser(u) })
    }
  })

  const handleChangeProvince = ({ e, i }) => {
    setDistricts(query.data[i].districts)
    setWards([])
    districtRef.current.value = ''
    wardRef.current.value = ''
  }

  const handleChangeDistrict = ({ e, i }) => {
    setWards(districts[i].wards)
    wardRef.current.value = ''
  }

  return <div className="relative">
    <form onSubmit={saveAddressMutation.mutate} className={`flex flex-col gap-5 ${saveAddressMutation.isPending ? 'opacity-70 pointer-events-none' : ''}`}>
      <div className="text-xl font-semibold">Edit address</div>
      <hr />
      <div className="text-grey-1">Salutation</div>
      <Radio choices={salutations} ref={salutationRef} />
      <Input ref={firstNameRef} type="text" placeholder="First name" defaultValue={user.addresses[i].firstName} />
      <Input ref={lastNameRef} type="text" placeholder="Last name" defaultValue={user.addresses[i].lastName} />
      <Input ref={phoneNumberRef} type="text" placeholder="Phone number" defaultValue={user.addresses[i].phoneNumber} />
      {query.isSuccess && <div className="flex flex-col gap-5">
        <Select onChange={handleChangeProvince} ref={provinceRef} placeholder="Province" choices={query.data.map(e => e.name)} />
        <Select onChange={handleChangeDistrict} ref={districtRef} placeholder="District" choices={districts.map(e => e.name)} />
        <Select ref={wardRef} placeholder="Ward" choices={wards.map(e => e.name)} />
      </div>}
      <Input ref={detailRef} type="text" placeholder="Detail" defaultValue={user.addresses[i].detail} />
      <div className="flex gap-5">
        <input type="submit" value={'Save'} className="bg-black-1 text-white-1 font-semibold p-3 text-center btn hover:opacity-90 transition-opacity max-w-96 basis-1/2"></input>
        <div className=" border-2 border-black-1 font-semibold p-3 text-center btn hover:text-red-1 hover:border-red-1 max-w-96 basis-1/2" onClick={() => setEdit(null)}>CANCEL</div>
      </div>
      {saveAddressMutation.isError && <div className="text-red-1 text-xss text-center">{saveAddressMutation.failureReason.message}</div>}
    </form>
    {saveAddressMutation.isPending && <AiOutlineLoading3Quarters className="w-8 h-8 m-auto animate-loading absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />}
  </div>
}

function Address() {
  const { user } = useMetaData()
  const [edit, setEdit] = useState(null)

  const deleteAddressMutation = useMutation({
    mutationFn: i => {
      user.addresses.splice(i, 1)
      return UserAPI.updateMe({ addresses: user.addresses })
    }
  })

  const setDefaultAddressMutation = useMutation({
    mutationFn: i => {
      if (i != 0) {
        const t = user.addresses[i]
        user.addresses.splice(i, 1)
        user.addresses.unshift(t)
        return UserAPI.updateMe({ addresses: user.addresses })
      }
    }
  })

  return <div className="flex max-lg:flex-col gap-10">
    <div className="basis-1/2">
      {
        edit === null ?
          <div className=" flex flex-col gap-10 lg:max-h-[80vh] overflow-y-auto" >
            <div className="text-xl font-semibold">Shipping address</div>
            <hr />
            {
              user.addresses.map((e, i) => <div key={i} className="relative">
                <div className={`flex flex-col gap-3`}>
                  {i == 0 && <div className="text-grey-1 uppercase text-xss">Default shipping address</div>}
                  <div className=" font-semibold">{e.salutation + ' ' + e.firstName + ' ' + e.lastName}</div>
                  <div className=" font-semibold">Phone: {e.phoneNumber}</div>
                  <div className=""><b>Detail: </b>{e.detail}</div>
                  <div className=""><b>Ward: </b>{e.ward}</div>
                  <div className=""><b>District: </b>{e.district}</div>
                  <div className=""><b>Province: </b>{e.province}</div>
                  <div className="flex gap-2 text-xss text-grey-1 underline flex-wrap">
                    <div className="hover:text-red-1 btn shrink-0" onClick={() => setEdit(i)}>Edit address</div>
                    <div className="hover:text-red-1 btn shrink-0" onClick={() => deleteAddressMutation.mutate(i)}>Delete address</div>
                    <div className="hover:text-red-1 btn shrink-0" onClick={() => setDefaultAddressMutation.mutate(i)}>Set as default</div>
                  </div>
                  <hr />
                </div>
              </div>)
            }
          </div>
          :
          <EditAddress i={edit} setEdit={setEdit} />
      }
    </div>
    <AddAddress />
  </div>
}

function Vouchers() {
  const query = useQuery({
    queryKey: ['vouchers', { q: {} }],
    queryFn: () => VoucherAPI.find({ q: {} }),
    initialData: []
  })
  return <div className="flex flex-col gap-5">
    {query.data.map(e => <div key={e._id} className="flex gap-5 flex-wrap items-center">
      <div><b>Code: </b>{e.code}</div>
      <div><b>Quantity: </b>{e.quantity}</div>
      <div className="text-xs text-green-600">{e.description}</div>
    </div>)}
  </div>
}

const nav = ['Summary', 'Orders', 'Personal data', 'Address', 'My registered products', 'Vouchers']

export default function Page() {
  const [index, setIndex] = useState(0)
  const router = useRouter()
  const { user, isLoading } = useMetaData()

  const query = useQueries({
    queries: [
      {
        queryKey: ['orders', { q: {} }],
        queryFn: () => OrderAPI.find({ q: {} }),
        initialData: []
      }
    ]
  })

  if (isLoading) {
    return <div className="h-full">
      <AiOutlineLoading3Quarters className="w-8 h-8 animate-loading m-auto" />
    </div>
  }

  if (!user) {
    router.push('/user/login')
    return <div></div>
  }

  if(user.role == "Admin") {
    router.push('/admin')
    return <div></div>
  }

  return <div className="bg-white-4 lg:px-5 py-10">
    <div className="text-4xl font-semibold text-center py-10">Your account</div>
    <div className="flex gap-10 font-semibold overflow-y-auto py-5 px-10">
      {nav.map((e, i) => <div key={i} onClick={() => setIndex(i)} className={` ${index == i ? 'text-red-1' : 'hover:text-red-1'} shrink-0 btn`}>{e}</div>)}
    </div>
    <div className="p-10 bg-white-1">
      {index == 0 && <Summary setIndex={setIndex} orders={query[0].data} />}
      {index == 1 && <Orders orders={query[0].data} />}
      {index == 2 && <PersonalData />}
      {index == 3 && <Address />}
      {index == 5 && <Vouchers />}
    </div>
  </div >
}