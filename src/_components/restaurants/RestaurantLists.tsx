'use client';
import { RestaurantType } from '@/types/RestaurantTypes';
import React from 'react'
import Card from '../Card';

type RestaurantProps = {
  restaurants: RestaurantType[]
}

export const RestaurantLists = ({restaurants} : RestaurantProps) => {
  return (
    <div className='flex flex-col items-center gap-5 md:gap-20'>
      {/* <h1 className='text-5xl tracking-wider md:text-6xl'>Restaurants</h1> */}
      <section className='flex flex-wrap p-10 justify-around items-start gap-y-20 gap-x-10'>
        {restaurants.map(r => <Card key={r.id} id={r.id} name={r.name} description={r.description} rating={r.average_ratings} />)}
      </section>
    </div>
  )
}
