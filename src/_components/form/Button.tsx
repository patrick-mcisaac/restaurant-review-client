'use client'


import { LoginType } from '@/types/AuthType'

import React from 'react'

type ButtonProps = {
  text: string
}

export default function Button({text} : ButtonProps) {

  
  return (
    <button
    className='border w-full rounded-2xl p-1 tracking-wider font-semibold bg-midground hover:bg-background cursor-pointer hover:scale-105 transition'
    >{text}</button>
  )
}
