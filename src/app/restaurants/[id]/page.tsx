'use client'
import Details from '@/_components/restaurants/Details'
import { getRestaurantById } from '@/data/restaurant_fetches'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

import React, { use } from 'react'

export default function Page({params}: {params:Promise<{id: string}>}) {

    const {id} = use(params)
    
    const {data: restaurant,  isSuccess} = useQuery({
        queryKey: ['restaurant', id],
        queryFn: () => getRestaurantById(id)
    })
    
  return isSuccess? (
    <div className='flex p-10 flex-col items-center'>
        <h1 className='text-6xl tracking-wider font-semibold'>{restaurant.name}</h1>
        <section className='flex h-140 w-full items-start justify-around'>

            <div className='w-100 h-100 mt-15 self overflow-hidden rounded-lg'>
                <Image unoptimized={true} alt={restaurant.name} src={`http://localhost:8000${restaurant.image}`} style={
                    {
                        borderRadius: '1rem',
                        width: '100%',
                        height: '100%'
                    }
                } width={350} height={0} />
            </div>
            <p className='mt-40'>{restaurant.description}</p>

        </section>
        <section className='flex items-start  justify-around w-full'>
            <section>

            <h2 className='text-2xl my-2 font-semibold tracking-wider'>Locations</h2>
            <div className='flex flex-wrap gap-20'>


            {restaurant.locations.map(location => {
                return <Details 
                key={location.id} 
                city={location.location.city} 
                info={location.address} />
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
                    city={location.location.city} 
                    info={location.hours} />
                }
            )}
            </div>
        </section>
    </section>

    </div>
  ): ''
}
