import { RestaurantLocationType } from '@/types/LocationTypes'
import { getLocationOrigin } from 'next/dist/shared/lib/utils'
import React from 'react'

type HoursProps = {
    city: string
    info: string
  
}

export default function Details({city, info} : HoursProps) {
  return (
    <div className='flex mt-5 flex-col'>
        <h1 className='text-2xl '>{city}</h1>
      
        {info.split(',').map(i => <p key={i}>{i}</p>)}
        
    </div>
  )
}
