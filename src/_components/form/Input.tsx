"use client"

import React from "react"

type InputProps<T> = {
    type: string
    placeholder: string
    name: string
    value: T
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    label?: boolean
    className?: string
    ref?: React.RefObject<HTMLInputElement | null>
}

export const Input = <T extends string | number>({
    type,
    placeholder,
    name,
    value,
    onChange,
    label,
    className,
    ref,
}: InputProps<T>) => {
    return (
        <fieldset className="flex w-full basis-0 flex-col gap-2">
            {label ?
                <label className="text-sm" htmlFor={name}>
                    {name.split("_").join(" ").toUpperCase()}:
                </label>
            :   ""}
            <input
                onChange={onChange}
                value={value}
                id={name}
                className={className}
                type={type}
                placeholder={placeholder}
                name={name}
                ref={ref}
            />
        </fieldset>
    )
}
