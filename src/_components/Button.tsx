"use client"
import React from "react"

type ButtonProps = {
    text: string
    handleClick: () => void
    className?: string
    preventDefault?: boolean
}

export default function Button({
    text,
    handleClick,
    className,
    preventDefault,
}: ButtonProps) {
    return (
        <button
            className={`${className} button dark:bg-background bg-light-grey dark:text-light text-background cursor-pointer transition`}
            onClick={(e) => {
                if (preventDefault) {
                    e.preventDefault()
                }
                handleClick()
            }}
        >
            {text}
        </button>
    )
}
