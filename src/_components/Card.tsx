'use client';

type CardProps = {
  name: string
  description: string
  rating: number
}

export default function Card({name, description, rating} : CardProps) {
  return (
    <div className="border flex flex-col justify-around text-center p-2 items-center w-75 h-40 lg:w-100 lg:h-50 rounded-xl">
      <h1 className="text-xl font-semibold tracking-wider">{name}</h1>
      <p>{rating} stars</p>
      <p>{description}</p>
    </div>
  )
}
