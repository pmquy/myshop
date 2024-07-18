'use client'

import { useUser } from '@/app/hooks';
import Checkbox from '@/app/ui/checkbox';
import Input from '@/app/ui/input'
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useRef } from "react";

export default function Page() {
  const emailRef = useRef(), firstNameRef = useRef(), lastNameRef = useRef(), passwordRef1 = useRef(), passwordRef2 = useRef(), checkBoxRef = useRef()
  const { API } = useUser()
  const router = useRouter()

  const handleRegister = (e) => {
    e.preventDefault()
    if (!checkBoxRef.current.checked) return alert('You must checked')
    if (passwordRef1.current.value != passwordRef2.current.value) return alert('Passwords are not the same')
    API.UserApi.create({ email: emailRef.current.value, firstName: firstNameRef.current.value, lastName: lastNameRef.current.value, password: passwordRef1.current.value })
      .then(e => router.push(`/user/login`))
      .catch(err => alert(err.message))
  }

  return <div className="bg-white-4 py-10">
    <div className="p-10 flex flex-col gap-5">
      <div className=" text-center text-3xl font-semibold">Create a new account</div>
      <div className=" text-center font-medium">Already have an account?<Link className=" ml-1 underline hover:text-red-1" href={'/user/login'}>Login here</Link></div>
    </div>
    <form onSubmit={handleRegister} className="flex flex-col gap-5 p-10 rounded-lg bg-white-1 max-w-[600px] w-full m-auto">
      <Input ref={emailRef} type="email" placeholder={'Email address'} />
      <Input ref={firstNameRef} type="text" placeholder={`First name`} />
      <Input ref={lastNameRef} type="text" placeholder={`Last name`} />
      <Input ref={passwordRef1} type="password" placeholder={'Password'} />
      <div className='text-xss'>At least 8 characters, including digits and letters</div>
      <Input ref={passwordRef2} type="password" placeholder={'Repeat password'} />
      <div className="flex gap-3 items-center">
        <Checkbox ref={checkBoxRef} />
        <div>Yes, I agree to the terms and conditions and the privacy policy.</div>
      </div>
      <button className="bg-black-1 py-2 hover:opacity-90 transition-opacity text-white-1 text-center">CREATE ACCOUNT</button>
    </form>
  </div>
}