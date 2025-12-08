import Button from '@/_components/form/Button'
import { Input } from '@/_components/form/Input'
import React from 'react'

export default function Page() {
  return (
    <form
    className='flex flex-col w-50 md:mt-40 m-auto gap-10 items-center mt-30'
    >
        <Input type='text' placeholder='username' name='username' />
        <Input type='password' placeholder='password' name='password' />
        <Button text='Login'/>
    </form>
  )
}
