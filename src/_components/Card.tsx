'use client';

type CardProps = {
  name: string
  description: string
  rating: number
}

export default function Card({name, description, rating} : CardProps) {
  return (
    <div className=" flex flex-col shadow-xs shadow-light justify-start gap-2 md:gap-5 text-center p-4 md:p-[1.5rem_3rem] items-center bg-light text-background w-75 h-40 lg:w-100 md:h-50 rounded-xl cursor-pointer hover:scale-103 transition">
      <h1 className="text-2xl font-semibold tracking-wider">{name}</h1>
      <p>{rating} stars</p>
      <p>{description}</p>
    </div>
  )
}
