'use client';
import { RestaurantType } from '@/types/RestaurantTypes';
import React from 'react'

type RestaurantProps = {
  restaurants: RestaurantType[]
}

export const RestaurantLists = ({restaurants} : RestaurantProps) => {
  return (
    <div>
      <h1>Restaurants</h1>

      {restaurants.map(r => 'hi')}
    </div>
  )
}
