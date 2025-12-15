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
}

export const Input = <T extends readonly string[] | string | number>({
    type,
    placeholder,
    name,
    value,
    onChange,
    label,
    className,
}: InputProps<T>) => {
    return (
        <fieldset className="flex w-full basis-0 flex-col gap-2">
            {label ?
                <label className="text-xs" htmlFor={name}>
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
            />
        </fieldset>
    )
}
