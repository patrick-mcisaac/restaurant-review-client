import React from "react"

type HoursProps = {
    city?: string
    info: string
}

export default function Details({ city, info }: HoursProps) {
    return (
        <div className="mt-5 flex flex-col">
            {city ?
                <h1 className="text-2xl">{city}</h1>
            :   ""}

            {info.split(",").map((i) => (
                <p key={i}>{i}</p>
            ))}
        </div>
    )
}
