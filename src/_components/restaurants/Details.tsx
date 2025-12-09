import { RestaurantLocationType } from '@/types/LocationTypes'
import { getLocationOrigin } from 'next/dist/shared/lib/utils'
import React from 'react'

type HoursProps = {
    city: string
    info: string
    title: string
}

export default function Details({city, info, title} : HoursProps) {
  return (
    <div>
        <h1>{city}</h1>
        <h2>{title}</h2>
        {info.split(',').map(i => <p key={i}>{i}</p>)}
        
    </div>
  )
}
