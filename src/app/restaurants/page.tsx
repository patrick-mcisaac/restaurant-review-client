'use client'
import { RestaurantLists } from '@/_components/restaurants/RestaurantLists'
import { Searchbar } from '@/_components/searchbars/Searchbar'
import { getRestaurants } from '@/data/restaurant_fetches'
import { useQuery } from '@tanstack/react-query'


export default function Page() {
  const {data, isSuccess} = useQuery({
    queryKey: ['restaurants'],
    queryFn: getRestaurants,
    staleTime: 5 * 60000
  })

  if(isSuccess){
    return (
      <div className=''>
        <h1 className='text-foreground text-center mt-10 text-3xl tracking-wider'>Our Restaurants</h1>
        <div className='flex justify-evenly m-10'>
          <Searchbar />
        </div>
        <div className='flex justify-center'>
          <RestaurantLists restaurants={data}/>
        </div>
    </div>
  )
}
}
