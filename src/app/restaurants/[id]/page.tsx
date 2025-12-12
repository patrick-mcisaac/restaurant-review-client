'use client'
import Button from '@/_components/Button'
import Details from '@/_components/restaurants/Details'
import { getRestaurantById } from '@/data/restaurant_fetches'
import {  useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { use } from 'react'
import { Rating } from 'react-simple-star-rating'

export default function Page({params}: {params:Promise<{id: string}>}) {

    const router = useRouter()
    // const queryClient = useQueryClient()
    const {id} = use(params)
    
    const {data: restaurant,  isSuccess} = useQuery({
        queryKey: ['restaurant', id],
        queryFn: () => getRestaurantById(id),
        
    })
    
  return isSuccess? (
    <div className='flex p-10 flex-col items-center'>
        <h1 className='text-6xl tracking-wider font-semibold'>{restaurant.name}</h1>
        <section className='flex h-137 w-full items-start justify-around'>

            <div className='w-100 h-100 mt-15 '>
                <Image unoptimized={true} alt={restaurant.name} src={`http://localhost:8000${restaurant.image}`} style={
                    {
                        borderRadius: '1rem',
                        width: '100%',
                        height: '100%'
                    }
                } width={350} height={0} />
                <div className='mt-5 flex items-center justify-end'>
                    <Button text='Review' handleClick={() => {router.push(`/restaurants/${id}/add_review`)}} />
                </div>
            </div>
            <p className='mt-40'>{restaurant.description}</p>

        </section>
        <section className='flex items-start  justify-around w-full'>
            <section>

            <h2 className='text-2xl my-2 font-semibold tracking-wider'>Locations</h2>
            <div className='flex flex-wrap gap-20'>


            {restaurant.locations.map(location => {
                return (
                <div className='flex flex-col gap-0' key={location.id}>
                    <Rating
                        
                        SVGclassName='inline-block'
                        size={24}
                        readonly
                        initialValue={location.location_average_rating} />
                
                    <Details 
                    city={location.city.name} 
                    info={location.address} />
                </div>)
            }
        )}
        </div>
            </section>
            <section>


                <h2 className='text-2xl my-2 font-semibold tracking-wider'>Hours</h2>
                 <div className='flex flex-wrap gap-20'>

                {restaurant.locations.map(location => {
                    return <Details 
                    key={location.id} 
                    city={location.city.name} 
                    info={location.hours} />
                }
            )}
            </div>
        </section>
    </section>
    <div className='flex justify-end w-full absolute bottom-5 pr-15'>
        <Button text='Our Reviews'  handleClick={() => {router.push(`/restaurants/${id}/reviews`)}} />
    </div>

    </div>
  ): ''
}
