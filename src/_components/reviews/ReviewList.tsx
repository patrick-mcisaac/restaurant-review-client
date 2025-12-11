'use client'
import { ReviewType } from '@/types/ReviewTypes'
import React from 'react'
import Button from '../Button'
import { useRouter } from 'next/navigation'
import { ParamValue } from 'next/dist/server/request/params'

type ReviewProps = {
    review: ReviewType
    id: ParamValue
}

export const ReviewList = ({review, id} : ReviewProps) => {
    const router = useRouter()
  return (
    <div className='border border-foreground w-full bg-light-grey text-foreground rounded-lg gap-5 flex flex-col p-3 md:p-10 '>
        <div className='flex flex-col md:flex-row text-center justify-between items-center'>
            <h1 className='text-xl md:text-2xl  font-semibold'>{review.restaurant.name}</h1>
            <p className='text-lg'>{review.restaurant_location}</p>
        </div>
        <p className='text-md'>{review.review}</p>
        <p className='text-sm '>{review.user.username}</p>
        {review.is_owner? <Button text='Edit' handleClick={() => {router.push(`/restaurants/${id}/reviews/${review.id}/edit`)}}/> : ''}
    </div>
  )
}
