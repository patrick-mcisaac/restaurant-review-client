'use client'
import Button from '@/_components/Button'
import Checkbox from '@/_components/form/Checkbox'
import TextArea from '@/_components/form/TextArea'
import { Select } from '@/_components/searchbars/Select'
import { getExperiences } from '@/data/experiences_requests'
import { getRestaurantLocations } from '@/data/location_requests'
import { getReviewById, updateReview } from '@/data/review_requests'
import { DiningExperienceType } from '@/types/DiningExperienceTypes'
import { useMutation, useQueries, useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Rating } from 'react-simple-star-rating'

export default function Page() {
    const router = useRouter()
    const {id} = useParams()
    const [review, setReview] = useState({
            id: Number(id),
            review: '',
            restaurant_location: 0,
            score: 0,
            restaurant: 0
        })
    const [checkboxes, setCheckboxes] = useState<{id: number, checked: boolean}[]>([])

    const {data: old_review, isSuccess} = useQuery({
        queryKey: ['review', id],
        queryFn: () => getReviewById(id)
    })


    const restaurantId : string = old_review?.restaurant.id


    const [query1, query2] = useQueries({
        queries: [
            {
            queryKey: ['restaurantLocation', id],
            queryFn: () => getRestaurantLocations(id),
            enabled: !!restaurantId,
            },
            {
                queryKey: ['experiences'],
                queryFn: getExperiences
            }
        ]
    })
    const {data: locations, isSuccess: locationSuccess} = query1
    const {data: experiences} = query2

    const {mutate} = useMutation({
        mutationFn: () => updateReview(old_review.id, review)
    })

    useEffect(() => {
        if(old_review){

            setReview({
                ...review,
                id: parseInt(old_review.id),
                review: old_review.review,
                score: old_review.score,
                restaurant_location: old_review.restaurant_location.id,
                restaurant: old_review.restaurant.id
            })
        }
    },[ old_review])

    useEffect(() => {
            if(experiences && old_review){
    
                setCheckboxes(() => experiences.map((e: DiningExperienceType) => {
                    const value = {id: e.id, checked: false}
                    for (const experience of old_review.dining_experience) {
                        if(e.id == experience.id){
                            value.checked = true
                        }
                    }
                    return value
                }))
            }
        
    },[experiences, old_review])
    
   



    const handleChange = (e:React.ChangeEvent<HTMLSelectElement |HTMLTextAreaElement>) => {
        const name = e.target.name

        switch(name){
            case 'location':
                setReview({...review, restaurant_location: parseInt(e.target.value)})
                break
            case 'review':
                setReview({...review, review: e.target.value})
                break
            default:
                break
        }
    }

    const handleClick = () =>  {
        mutate()
        router.push(`/restaurants/${old_review.restaurant.id}/reviews`)

    }
  

    const handleRatingChange =  (e: number) => {
        setReview({...review, score: e})
    }

  return isSuccess?(<form className='flex  flex-col gap-6 md:gap-10 md:mt-10 p-5 mt-5 justify-start'>
            <h1 className='text-center text-5xl'>Review</h1>
            {locationSuccess?
            
            <fieldset className='flex justify-end'>
                
                <Select value={review.restaurant_location} handleChange={handleChange} name='location' locations={locations}
                className='text-foreground bg-light-grey py-1 px-3  rounded-lg cursor-pointer' />
            </fieldset>
            : ''}
            <fieldset className='flex  justify-center'>
    
                <TextArea name='review' handleChange={handleChange} value={review.review} className='bg-light-grey lg:h-120 lg:w-200 text-foreground md:h-120 h-75 w-full'  />
            </fieldset>
            <fieldset className='flex flex-col items-center'>
                        <h2 className='text-2xl'>Experience Highlights</h2>
                        <section className='flex max-w-200 items-center mt-4 justify-around flex-wrap gap-1'>
            
                            {experiences && experiences.map((e: DiningExperienceType) => <Checkbox setCheckboxes={setCheckboxes} wasChecked={old_review.dining_experience} key={e.id}  experience={e}/>)}
                        </section>
                    </fieldset>
            <fieldset className='flex items-center justify-center'>
                <Rating
                    onClick={handleRatingChange}
                    SVGclassName='inline-block'
                    size={24}
                    
                    initialValue={review.score} />
            </fieldset>
            <Button className='mt-10 lg:relative lg:w-200 w-full self-center  md:absolute md:bottom-10 md:w-[90%] ' text='Submit' preventDefault={true} handleClick={handleClick} />
        </form>
  ): '' 
}
