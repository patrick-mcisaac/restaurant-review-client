'use client'

import React from 'react'

type ButtonProps = {
  text: string
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function Button({text, handleClick} : ButtonProps) {

  
  return (
    <button
    onClick={(e) => handleClick(e)}
    className='border w-full rounded-2xl p-1 tracking-wider font-semibold bg-midground hover:bg-background cursor-pointer hover:scale-105 transition'
    >{text}</button>
  )
}
