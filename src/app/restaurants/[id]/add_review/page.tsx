'use client'
import Button from '@/_components/Button'
import TextArea from '@/_components/form/TextArea'
import { Select } from '@/_components/searchbars/Select'
import React, { useState } from 'react'

export default function Page() {

    const [reviewText, setReviewText] = useState<string>('')

    const handleClick= () => {
       
    }
  return (
    <form className='flex  flex-col gap-6 md:gap-10 md:mt-10 p-5 mt-5 justify-start'>
        <h1 className='text-center text-5xl'>Review</h1>
        <fieldset className='flex justify-end'>

            <Select name='location' locations={''}/>
        </fieldset>
        <fieldset className='flex  justify-center'>

            <TextArea handleChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setReviewText(e.target.value)
            }} value={reviewText} className='bg-light-grey lg:h-120 lg:w-200 text-foreground md:h-120 h-75 w-full'  />
        </fieldset>
        <Button className='mt-10 lg:relative lg:w-200 w-full self-center  md:absolute md:bottom-10 md:w-[90%] ' text='Submit' preventDefault={true} handleClick={handleClick} />
    </form>
  )
}
