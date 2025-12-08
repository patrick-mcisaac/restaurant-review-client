import React from 'react'
import { Input } from '../form/Input'
import { Select } from './Select'

export const Searchbar = () => {
  return (

    <div className='flex flex-wrap items-center justify-center gap-5'>
      <Input type='text' placeholder='search' name='search' />
      <Select name='locations' locations={''} />
    </div>
  )
}
