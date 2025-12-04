import React from 'react'
import { Options } from './Options';
import { LocationType } from '@/types/LocationTypes';

type SelectProps = {
    name: string;
    locations: LocationType[]
}

export const Select = ({name, locations} : SelectProps) => {
  return (
    <select name={name} >
        <option value={0}>Select an option</option>
        {
           locations && locations.map(l => <Options location={l} key={l.id} />)
        }
    </select>
  )
}
