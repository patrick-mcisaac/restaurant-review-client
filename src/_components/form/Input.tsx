'use client'

import React from 'react'

type InputProps<T> = {
    type: string
    placeholder: string
    name: string
    value: T 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    
}

export const Input =<T extends readonly string[] | string | number> ({type, placeholder, name, value, onChange} : InputProps<T>) => {
  return (
    <input
    onChange={ onChange}
    value={value}
    className='bg-midground text-foreground rounded-lg p-[.1rem_1rem]' type={type} placeholder={placeholder} name={name} />
  )
}
