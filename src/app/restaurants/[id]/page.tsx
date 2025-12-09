'use client'
import Details from '@/_components/restaurants/Details'
import { getRestaurantById } from '@/data/restaurant_fetches'
import { useQuery } from '@tanstack/react-query'

import React, { use } from 'react'

export default function Page({params}: {params:Promise<{id: string}>}) {

    const {id} = use(params)
    
    const {data: restaurant,  isSuccess} = useQuery({
        queryKey: ['restaurant', id],
        queryFn: () => getRestaurantById(id)
    })
    
  return isSuccess? (
    <div>
        <h1>{restaurant.name}</h1>
        <p>{restaurant.description}</p>

        {restaurant.locations.map(location => {
            return <Details 
            key={location.id} 
            title='Address' 
            city={location.location.city} 
            info={location.address} />
        }
    )}
        
        {restaurant.locations.map(location => {
            return <Details 
            key={location.id} 
            title='Hours' 
            city={location.location.city} 
            info={location.hours} />
        }
    )}

    </div>
  ): ''
}
