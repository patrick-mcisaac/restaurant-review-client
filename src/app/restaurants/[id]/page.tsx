'use client'
import Button from '@/_components/Button'
import Details from '@/_components/restaurants/Details'
import { setRating } from '@/data/rating_requests'
import { getRestaurantById } from '@/data/restaurant_fetches'
import { RatingType } from '@/types/RatingType'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { use,  useState } from 'react'
import { Rating } from 'react-simple-star-rating'

export default function Page({params}: {params:Promise<{id: string}>}) {

    const router = useRouter()
    const queryClient = useQueryClient()
    const {id} = use(params)

    const [ratingInfo, setRatingInfo] = useState<RatingType>({
        score: 0,
        restaurant: parseInt(id)
    })


    const {data: new_rating, mutate} = useMutation({
        mutationFn: (ratingInfo:RatingType) =>  setRating(ratingInfo),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['restaurants']})
            queryClient.invalidateQueries({queryKey: ['restaurant', id]})
            // might add this back in if i want to show current average rating on this page
            // queryClient.refetchQueries({queryKey: ['restaurant', id]})
        }
    })
    
    const {data: restaurant,  isSuccess} = useQuery({
        queryKey: ['restaurant', id],
        queryFn: () => getRestaurantById(id),
        
    })

    const handleRatings =  (data: RatingType) => {
        mutate(data)

    }

    const handleRatingChange =  (e: number) => {
        const copyRating = {...ratingInfo, score: e}
        setRatingInfo(copyRating)
    }
    
  return isSuccess? (
    <div className='flex p-10 flex-col items-center'>
        <h1 className='text-6xl tracking-wider font-semibold'>{restaurant.name}</h1>
        <section className='flex h-140 w-full items-start justify-around'>

            <div className='w-100 h-100 mt-15 '>
                <Image unoptimized={true} alt={restaurant.name} src={`http://localhost:8000${restaurant.image}`} style={
                    {
                        borderRadius: '1rem',
                        width: '100%',
                        height: '100%'
                    }
                } width={350} height={0} />
                <div className='mt-5 flex items-center justify-between'>
                    
                    <div className='flex gap-3 items-center'>
                        
                        <Rating
                        onClick={handleRatingChange}
                        SVGclassName='inline-block'
                        size={24}
                        initialValue={restaurant.user_score} />
                       

                        <Button text='Rate' handleClick={() => handleRatings(ratingInfo)}/>

                    </div>

                     
                    <Button text='Review' handleClick={() => {router.push(`/restaurants/${id}/add_review`)}} />
                </div>
            </div>
            <p className='mt-40'>{restaurant.description}</p>

        </section>
        <section className='flex items-start  justify-around w-full'>
            <section>

            <h2 className='text-2xl my-2 font-semibold tracking-wider'>Locations</h2>
            <div className='flex flex-wrap gap-20'>


            {restaurant.locations.map(location => {
                return <Details 
                key={location.id} 
                city={location.location.city} 
                info={location.address} />
            }
        )}
        </div>
            </section>
            <section>


                <h2 className='text-2xl my-2 font-semibold tracking-wider'>Hours</h2>
                 <div className='flex flex-wrap gap-20'>

                {restaurant.locations.map(location => {
                    return <Details 
                    key={location.id} 
                    city={location.location.city} 
                    info={location.hours} />
                }
            )}
            </div>
        </section>
    </section>
    <div className='flex justify-end w-full absolute bottom-5 pr-15'>
        <Button text='Our Reviews'  handleClick={() => {router.push(`/restaurants/${id}/reviews`)}} />
    </div>

    </div>
  ): ''
}
