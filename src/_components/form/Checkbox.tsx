import { DiningExperienceType } from '@/types/DiningExperienceTypes'
import { ReviewType } from '@/types/ReviewTypes'
import React, { useEffect, useState } from 'react'

type CheckboxProps = {
    experience: DiningExperienceType
    setCheckboxes: React.Dispatch<React.SetStateAction<{
    id: number
    checked: boolean
    }[]> >,
    wasChecked?: ReviewType[]
}

export default function Checkbox({experience, setCheckboxes, wasChecked} : CheckboxProps) {
    const [checked, setChecked] = useState(false)
    const handleClick = () => {
        setChecked(!checked)
        setCheckboxes(prev => prev.map(option => {
            if(option.id === experience.id){
                return {...option, checked:!option.checked}
            }
            return option
        }))
    }

    useEffect(() => {
        if(wasChecked){
            setChecked(() => {
                const found = wasChecked.find(c => c.id === experience.id )
                return found? true: false
            })
        }
    },[wasChecked])
  return (
    <div className='flex w-40 md:w-50 items-center justify-start mt-1'>
        <input className='cursor-pointer' checked={checked} onChange={ handleClick} name={experience.description} id={experience.id.toString()} type='checkbox' />
        <label className='ml-5 cursor-pointer' htmlFor={experience.id.toString()}>{experience.description}</label>
    </div>
  )
}
