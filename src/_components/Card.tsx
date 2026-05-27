"use client"

import Link from "next/link"
import { Rating } from "react-simple-star-rating"

type CardProps = {
    name: string
    description: string
    rating: number
    id: number
}

export default function Card({ id, name, description, rating }: CardProps) {
    return (
        <Link href={`/restaurants/${id}`}>
            <div className="shadow-light dark:bg-light bg-light-grey text-background flex h-40 w-75 cursor-pointer flex-col items-center justify-start gap-2 rounded-xl p-4 text-center shadow-xs transition hover:scale-103 md:h-50 md:gap-5 md:p-[1.5rem_3rem] lg:w-100 2xl:h-63 2xl:w-150 2xl:justify-center 2xl:gap-10">
                <h1 className="text-2xl font-semibold tracking-wider 2xl:text-4xl">
                    {name}
                </h1>
                <Rating
                    readonly
                    SVGclassName="inline-block"
                    size={24}
                    initialValue={rating}
                    fillColor="#1e1e1e"
                    emptyColor="#aaa"
                    allowFraction
                />
                <p className="2xl:text-xl">{description}</p>
            </div>
        </Link>
    )
}
