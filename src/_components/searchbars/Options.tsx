import { LocationType } from '@/types/LocationTypes'
import React from 'react'

type OptionProps = {
    location: LocationType
}

export const Options = ({location} : OptionProps) => {
  return (
    <option value={location.id}>
        {location.city}
    </option>
  )
}
