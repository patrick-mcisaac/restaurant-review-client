'use client'
import React from 'react'

type TextAreaProps = {
    className: string,
    value: string,
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    name: string
}

export default function TextArea({ className, value, handleChange, name } : TextAreaProps) {
  return (
    <textarea name={name} className={`${className}`} value={value} onChange={handleChange} />
  )
}
