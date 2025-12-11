'use client'
import React from 'react'

type ButtonProps = {
    text: string
    handleClick: () => void
    className?: string
    preventDefault?: boolean
}

export default function Button({text, handleClick, className, preventDefault} : ButtonProps) {
  return (
    <button className={`${className} button cursor-pointer  transition`} onClick={(e) => {
      if(preventDefault){
        e.preventDefault()
      }
      handleClick()
    }}>{text}</button>
  )
}
