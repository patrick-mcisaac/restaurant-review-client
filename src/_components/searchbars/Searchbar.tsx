import React from 'react'
import { Input } from '../form/Input'
import { Select } from './Select'

export const Searchbar = () => {
  return (
    <>
      <Input label={false} type='text' placeholder='search' name='search' />
      <Select name='locations' locations={''} />
    </>
   
  )
}
