'use client'
import React from 'react'

type TextAreaProps = {
    className: string,
    value: string,
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function TextArea({ className, value, handleChange } : TextAreaProps) {
  return (
    <textarea className={`${className}`} value={value} onChange={handleChange} />
  )
}
