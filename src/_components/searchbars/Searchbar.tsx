import React from 'react'
import { Input } from './Input'
import { Select } from './Select'

export const Searchbar = () => {
  return (

    <>
      <Input type='text' placeholder='search' name='search' />
      <Select name='locations' locations={''} />
    </>
  )
}
