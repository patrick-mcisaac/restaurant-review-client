
import { RestaurantLists } from '@/_components/restaurants/RestaurantLists'
import { Searchbar } from '@/_components/searchbars/Searchbar'
import React from 'react'

export default function page() {
  return (
    <div className=''>
        <h1 className='text-foreground text-center mt-10 text-3xl tracking-wider'>Our Restaurants</h1>
        <div className='flex justify-evenly m-10'>
          <Searchbar />
        </div>
        <div className='flex justify-center'>
          <RestaurantLists />
        </div>
    </div>
  )
}
