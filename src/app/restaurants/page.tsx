
import { RestaurantLists } from '@/_components/restaurants/RestaurantLists'
import { Searchbar } from '@/_components/searchbars/Searchbar'
import React from 'react'

export default function page() {
  return (
    <div className='flex'>
        <h1 className='text-foreground'>Our Restaurants</h1>
        <Searchbar />
        <RestaurantLists />
    </div>
  )
}
