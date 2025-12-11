'use client'
import React from 'react'
import { Input } from '../form/Input'
import { Select } from './Select'
import { useQuery } from '@tanstack/react-query'
import { getLocations } from '@/data/location_requests'

export const Searchbar = () => {

  const {data: locations, isSuccess} = useQuery({
    queryKey: ['locations'],
    queryFn: getLocations
  })

  // TODO: functions for search and filter
  const handleChange = (e:React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {

  }

  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {

  }
  return (
    <>
      <Input onChange={handleSearch} value='' label={false} type='text' placeholder='search' name='search' />
      {isSuccess?
      <Select className='text-foreground bg-light-grey py-1 px-3 rounded-lg cursor-pointer' handleChange={handleChange} name='locations' locations={locations} />
      : ''
      }
    </>
   
  )
}
