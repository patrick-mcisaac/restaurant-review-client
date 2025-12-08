
'use client'
import Button from '@/_components/form/Button'
import { Input } from '@/_components/form/Input'
import { useAuth } from '@/app/AuthProvider'
import { register } from '@/data/auth_requests'
import { RegisterType } from '@/types/AuthType'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Page() {

  const {setToken} = useAuth()
  const router = useRouter()

  const {data, mutate} = useMutation({
    mutationFn: (data: RegisterType) => register(data),
    onSuccess: (data)=> {
      setToken(data.token)
      localStorage.setItem('token', data.token)
      router.replace('/')

    }
  })

  const [userRegister, setUserRegister] = useState<RegisterType>({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: ''
  })

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const copyUser = {...userRegister}

    switch(e.target.name){
      case 'first_name':
        copyUser.first_name = e.target.value
        break
      case 'last_name':
        copyUser.last_name = e.target.value
        break
      case 'username':
        copyUser.username = e.target.value
        break
      case 'email':
        copyUser.email = e.target.value
        break
      case 'password':
        copyUser.password = e.target.value
        break
      default:
        break
    }

    setUserRegister(copyUser)

  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    mutate(userRegister)
  }
  return (
    <form
    className='flex flex-col w-50 md:mt-30 m-auto gap-10 items-center mt-20'
    >
      <Input type='text' placeholder='First Name' value={userRegister.first_name} onChange={handleChange} name='first_name' />

      <Input type='text' placeholder='Last Name' value={userRegister.last_name} onChange={handleChange} name='last_name' />

      <Input type='email' placeholder='Email' value={userRegister.email} onChange={handleChange} name='email' />

      <Input type='text' placeholder='username' value={userRegister.username} onChange={handleChange} name='username' />

      <Input type='password' placeholder='password' value={userRegister.password} onChange={handleChange} name='password' />
      <Button handleClick={handleClick} text='Register' />
    </form>
  )
}
