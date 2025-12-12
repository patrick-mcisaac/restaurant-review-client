'use client'
import { ReviewType } from '@/types/ReviewTypes'
import React from 'react'
import Button from '../Button'
import {  useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteReview } from '@/data/review_requests'
import { ParamValue } from 'next/dist/server/request/params'


type ReviewProps = {
    review: ReviewType
    id: ParamValue
    reviewId: number
}

export const ReviewList = ({review, id, reviewId} : ReviewProps) => {
  
    const router = useRouter()
    const queryClient = useQueryClient()
    const {mutate} = useMutation({
      mutationFn: () => deleteReview(reviewId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['reviews', `restaurant${id}`]
        })
      },
      onSettled: () => {
        queryClient.refetchQueries({queryKey: ['reviews', `restaurant${id}`]})
      }
    })
  return (
    <div className='border border-foreground w-full bg-light-grey text-foreground rounded-lg gap-5 flex flex-col p-3 md:p-10 '>
        <div className='flex flex-col md:flex-row text-center justify-between items-center'>
            <h1 className='text-xl md:text-2xl  font-semibold'>{review.restaurant.name}</h1>
            <p className='text-lg'>{review.restaurant_location.name}</p>
        </div>
        <p className='text-md'>{review.review}</p>
        <p className='text-sm '>{review.user.username}</p>
        {review.is_owner? 
        <>
        <Button text='Edit' handleClick={() => {router.push(`/restaurants/${review.id}/edit_review`)}}/> 
        <Button text='Delete' handleClick={mutate}/>
        </>
        : ''}
    </div>
  )
}
