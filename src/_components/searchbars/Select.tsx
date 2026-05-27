import React from 'react'
import { Options } from './Options';
import { LocationType } from '@/types/LocationTypes';

type SelectProps = {
    name: string;
    locations: LocationType[]
    className?: string
    handleChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => void
    value?: number
}

export const Select = ({name, locations, className, handleChange, value} : SelectProps) => {
  return (
    <select value={value} onChange={handleChange} className={`${className}`} name={name} >
        <option value={0}>Select an option</option>
        {
           locations && locations.map(l => <Options location={l} key={l.id} />)
        }
    </select>
  )
}
