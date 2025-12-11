import { ReviewType } from '@/types/ReviewTypes'
import React from 'react'

type ReviewProps = {
    review: ReviewType
}

export const ReviewList = ({review} : ReviewProps) => {
  return (
    <div className='border border-foreground w-full bg-light-grey text-foreground rounded-lg gap-5 flex flex-col p-3 md:p-10 '>
        <div className='flex flex-col md:flex-row text-center justify-between items-center'>
            <h1 className='text-xl md:text-2xl  font-semibold'>Restaurant Name</h1>
            <p className='text-lg'>Restaurant Location</p>
        </div>
        <p className='text-md'>{review.review}</p>
        <p className='text-sm '>User info</p>
    </div>
  )
}
