"use client"
import React, { Ref, useEffect } from "react"

type TextAreaProps = {
    className: string
    value: string
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    name: string
    ref?: React.RefObject<HTMLTextAreaElement | null>
}

export default function TextArea({
    ref,
    className,
    value,
    handleChange,
    name,
}: TextAreaProps) {
    useEffect(() => {
        if (ref?.current) {
            ref.current.focus()
        }
    }, [ref])
    return (
        <textarea
            ref={ref}
            name={name}
            className={`${className}`}
            value={value}
            onChange={handleChange}
        />
    )
}
