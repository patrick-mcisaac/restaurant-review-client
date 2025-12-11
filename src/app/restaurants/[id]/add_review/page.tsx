'use client'
import Button from '@/_components/Button'
import TextArea from '@/_components/form/TextArea'
import { Select } from '@/_components/searchbars/Select'
import { getRestaurantLocations } from '@/data/location_requests'
import { createReview } from '@/data/review_requests'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Page() {

    const {id} = useParams()
    const [review, setReview] = useState({
        review: '',
        restaurant: id,
        location: 0
    })

    const router = useRouter()

    const {data: locations, isSuccess} = useQuery({
        queryKey: ['restaurantLocation', id],
        queryFn: () => getRestaurantLocations(id)
    })

    const {data, mutate} = useMutation({
        mutationFn:() => createReview(review),
        onSuccess: () => {
            router.replace(`/restaurants/${id}/reviews`)
        }
    })

    const handleChange = (e:React.ChangeEvent<HTMLSelectElement |HTMLTextAreaElement>) => {
        const name = e.target.name
        const value = e.target.value
        switch (name){
            case 'review':
                setReview({...review, review: value})
                break;
            case 'location':
                setReview({...review, location: parseInt(value)})
                break;
            default:
                break;
        }
    }

    const handleClick= () => {
       if(review.location > 0 && review.review !== ''){
        mutate()
       }
       else{
        window.alert('Please fill out the form')
       }
    }
  return (
    <form className='flex  flex-col gap-6 md:gap-10 md:mt-10 p-5 mt-5 justify-start'>
        <h1 className='text-center text-5xl'>Review</h1>
        {isSuccess?
        
        <fieldset className='flex justify-end'>
            <Select handleChange={handleChange} name='location' locations={locations}
            className='text-foreground bg-light-grey py-1 px-3  rounded-lg cursor-pointer' />
        </fieldset>
        : ''}
        <fieldset className='flex  justify-center'>

            <TextArea name='review' handleChange={handleChange} value={review.review} className='bg-light-grey lg:h-120 lg:w-200 text-foreground md:h-120 h-75 w-full'  />
        </fieldset>
        <Button className='mt-10 lg:relative lg:w-200 w-full self-center  md:absolute md:bottom-10 md:w-[90%] ' text='Submit' preventDefault={true} handleClick={handleClick} />
    </form>
  )
}
