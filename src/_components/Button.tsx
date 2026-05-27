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
            className={`${className} button dark:bg-midground bg-light-grey dark:text-light text-background cursor-pointer text-sm transition md:text-2xl`}
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
