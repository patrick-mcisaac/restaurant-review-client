'use client';

import Link from "next/link";
import ReactStars from "react-stars"

type CardProps = {
  name: string
  description: string
  rating: number
  id: number
}

export default function Card({id, name, description, rating} : CardProps) {
  return (
    <Link href={`/restaurants/${id}`}>
    <div className=" flex flex-col shadow-xs shadow-light justify-start gap-2 md:gap-5 text-center p-4 md:p-[1.5rem_3rem] items-center bg-light text-background w-75 h-40 lg:w-100 2xl:justify-center 2xl:gap-10 2xl:h-75 2xl:w-150 md:h-50 rounded-xl cursor-pointer hover:scale-103 transition">
      <h1 className="text-2xl 2xl:text-4xl font-semibold tracking-wider">{name}</h1>
      <ReactStars size={24} edit={false} value={rating} color2={'#1e1e1e'}  />
      <p className="2xl:text-xl">{description}</p>
    </div>
    </Link>
  )
}
