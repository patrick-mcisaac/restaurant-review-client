'use client'
import Button from '@/_components/form/Button'
import { Input } from '@/_components/form/Input'
import { LoginType } from '@/types/AuthType'
import { useState } from 'react'



export default function Page() {

  const [userLogin, setUserLogin] = useState<LoginType>({
    username: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const copyUser = {
      ...userLogin
    }

    if (e.target.name === 'username'){
      copyUser.username = e.target.value
    }
    if(e.target.name === 'password'){
      copyUser.password = e.target.value
    }

    setUserLogin(copyUser)
  }
  return (
    <form
    className='flex flex-col w-50 md:mt-40 m-auto gap-10 items-center mt-30'
    >
        <Input type='text' placeholder='username' value={userLogin.username} onChange={handleChange} name='username' />
        <Input type='password' placeholder='password' value={userLogin.password} onChange={handleChange} name='password' />
        <Button text='Login' />
    </form>
  )
}
