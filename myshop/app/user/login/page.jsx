'use client'

import { useUser } from '@/app/hooks';
import Input from '@/app/ui/input'
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useRef } from "react";

export default function Page() {
  const emailRef = useRef(), passwordRef = useRef()
  const router = useRouter()
  const { API, setUser } = useUser()
  const handleLogin = (e) => {
    e.preventDefault()
    API.UserApi.login({ email: emailRef.current.value, password: passwordRef.current.value })
      .then(user => { setUser(user); router.back() })
      .catch(err => console.log(err.message))
  }

  return <div className="bg-white-4 py-10">
    <div className="p-10 flex flex-col gap-5">
      <div className=" text-center text-3xl font-semibold">Login</div>
      <div className=" text-center font-medium">Don&#39;t have an account?<Link className=" ml-1 underline hover:text-red-1" href={'/user/register'}>Register now</Link></div>
    </div>
    <form onSubmit={handleLogin} className="flex flex-col gap-5 p-10 rounded-lg bg-white-1 max-w-[600px] w-full m-auto">
      <Input ref={emailRef} type="email" placeholder={'Email address'} />
      <Input ref={passwordRef} type="password" placeholder={`Password`} />
      <button className="bg-black-1 py-2 hover:opacity-90 transition-opacity text-white-1 text-center">LOGIN</button>
    </form>
  </div>
}