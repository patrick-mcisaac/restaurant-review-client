'use client'
import Button from '@/_components/Button'
import TextArea from '@/_components/form/TextArea'
import { Select } from '@/_components/searchbars/Select'
import { getRestaurantLocations } from '@/data/location_requests'
import { getRestaurantById } from '@/data/restaurant_fetches'
import { getReviewById } from '@/data/review_requests'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React from 'react'

export default function Page() {
    const {id} = useParams()

    const {data: review, isSuccess} = useQuery({
        queryKey: ['review', id],
        queryFn: () => getReviewById(id)
    })

    const restaurantId : string = review?.restaurant.id

    const {data: locations, isSuccess: locationSuccess} = useQuery({
         queryKey: ['restaurantLocation', restaurantId],
         queryFn: () => getRestaurantLocations(restaurantId),
         enabled: !!restaurantId
    })

    const handleChange = () => {
        
    }

    const handleClick = () => {

    }

  return isSuccess?(<form className='flex  flex-col gap-6 md:gap-10 md:mt-10 p-5 mt-5 justify-start'>
            <h1 className='text-center text-5xl'>Review</h1>
            {locationSuccess?
            
            <fieldset className='flex justify-end'>
                
                <Select value={review.restaurant_location.id} handleChange={handleChange} name='location' locations={locations}
                className='text-foreground bg-light-grey py-1 px-3  rounded-lg cursor-pointer' />
            </fieldset>
            : ''}
            <fieldset className='flex  justify-center'>
    
                <TextArea name='review' handleChange={handleChange} value={review.review} className='bg-light-grey lg:h-120 lg:w-200 text-foreground md:h-120 h-75 w-full'  />
            </fieldset>
            <Button className='mt-10 lg:relative lg:w-200 w-full self-center  md:absolute md:bottom-10 md:w-[90%] ' text='Submit' preventDefault={true} handleClick={handleClick} />
        </form>
  ): '' 
}
