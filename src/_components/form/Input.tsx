'use client'
import React from 'react'

type InputProps = {
    type: string;
    placeholder: string;
    name: string;
}

export const Input = ({type, placeholder, name} : InputProps) => {
  return (
    <input
    className='bg-midground text-foreground rounded-lg p-[.1rem_1rem]' type={type} placeholder={placeholder} name={name} />
  )
}
