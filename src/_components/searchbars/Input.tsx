import React from 'react'

type InputProps = {
    type: string;
    placeholder: string;
    name: string;
}

export const Input = ({type, placeholder, name} : InputProps) => {
  return (
    <input type={type} placeholder={placeholder} name={name} />
  )
}
