'use client'
import Button from '@/_components/Button'
import Checkbox from '@/_components/form/Checkbox'
import TextArea from '@/_components/form/TextArea'
import { Select } from '@/_components/searchbars/Select'
import { getExperiences } from '@/data/experiences_requests'
import { getRestaurantLocations } from '@/data/location_requests'
import { createReview } from '@/data/review_requests'
import { DiningExperienceType } from '@/types/DiningExperienceTypes'
import { useMutation, useQueries, useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Rating } from 'react-simple-star-rating'


export default function Page() {

    const {id} = useParams()
    const [review, setReview] = useState({
        review: '',
        restaurant: id,
        location: 0,
        score: 0
    })

    const [checkboxes, setCheckboxes] = useState<{id: number, checked: boolean}[]>([])

    const router = useRouter()

    const [query1, query2] = useQueries({
        queries: [
            {
            queryKey: ['restaurantLocation', id],
            queryFn: () => getRestaurantLocations(id)
            },
            {
                queryKey: ['experiences'],
                queryFn: getExperiences
            }
        ]
    })

    const {data: locations, isSuccess} = query1
    const {data: experiences} = query2

    useEffect(() => {
        if(experiences){

            setCheckboxes(() => experiences.map((e: DiningExperienceType) => {return {id: e.id, checked: false}}))
        }
        },[experiences])


    const {data, mutate} = useMutation({
        mutationFn:() => createReview({...review, dining_experience: [...checkboxes]}),
        onSuccess: () => {
            router.replace(`/restaurants/${id}/reviews`)
        }
    })

    const handleChange = (e:React.ChangeEvent<HTMLSelectElement |HTMLTextAreaElement>) => {
        const name = e.target.name
        const value = e.target.value
        switch (name){
            case 'review':
                setReview({...review, review: value})
                break;
            case 'location':
                setReview({...review, location: parseInt(value)})
                break;
            default:
                break;
        }
    }

    const handleClick= () => {
       if(review.location > 0 && review.review !== ''){
        mutate()
       }
       else{
        window.alert('Please fill out the form')
       }
    }

    const handleRatingChange =  (e: number) => {
        setReview({...review, score: e})
    }
  return (
    <form className='flex  flex-col gap-6 md:gap-10 md:mt-10 p-5 mt-5 justify-start'>
        <h1 className='text-center text-5xl'>Review</h1>
        {isSuccess?
        
        <fieldset className='flex justify-end'>
            <Select handleChange={handleChange} name='location' locations={locations}
            className='text-foreground bg-light-grey py-1 px-3  rounded-lg cursor-pointer' />
        </fieldset>
        : ''}
        <fieldset className='flex  justify-center'>

            <TextArea name='review' handleChange={handleChange} value={review.review} className='bg-light-grey lg:h-120 lg:w-200 text-foreground md:h-120 h-75 w-full'  />
        </fieldset>
        <fieldset className='flex flex-col items-center'>
            <h2 className='text-2xl'>Experience Highlights</h2>
            <section className='flex max-w-200 items-center mt-4 justify-around flex-wrap gap-1'>

                {experiences && experiences.map((e: DiningExperienceType) => <Checkbox setCheckboxes={setCheckboxes} key={e.id} experience={e}/>)}
            </section>
        </fieldset>
        <fieldset className='flex items-center justify-center'>
            <Rating
                onClick={handleRatingChange}
                SVGclassName='inline-block'
                size={24}
                initialValue={0} />
        </fieldset>
        <Button className=' lg:relative lg:w-200 w-full self-center  md:w-[90%] ' text='Submit' preventDefault={true} handleClick={handleClick} />
    </form>
  )
}
