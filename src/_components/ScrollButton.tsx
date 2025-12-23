"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons"

type ScrollProps = {
    name: string
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    className: string
    up?: boolean
}

export default function ScrollButton({
    className,
    name,
    handleClick,
    up,
}: ScrollProps) {
    return (
        <button
            className={`${className} bg-midground dark:bg-background text-foreground flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl border-1 transition hover:scale-115 md:h-20 md:w-15`}
            name={name}
            onClick={handleClick}
        >
            <FontAwesomeIcon
                className="text-2xl md:text-4xl"
                icon={up ? faArrowUp : faArrowDown}
            />
        </button>
    )
}
