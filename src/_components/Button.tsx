'use client'
import React from 'react'

type ButtonProps = {
    text: string
    handleClick: () => void
}

export default function Button({text, handleClick} : ButtonProps) {
  return (
    <button className='button cursor-pointer hover:scale-105 transition' onClick={handleClick}>{text}</button>
  )
}
