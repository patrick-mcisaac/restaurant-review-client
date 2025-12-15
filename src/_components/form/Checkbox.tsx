import { DiningExperienceType } from '@/types/DiningExperienceTypes'
import React, { useState } from 'react'

type CheckboxProps = {
    experience: DiningExperienceType
    setCheckboxes: React.Dispatch<React.SetStateAction<{
    id: number
    checked: boolean
    }[]> >
}

export default function Checkbox({experience, setCheckboxes} : CheckboxProps) {
    const [checked, setChecked] = useState(false)
    const handleClick = (e:React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        setChecked(!checked)
        setCheckboxes(prev => prev.map(option => {
            if(option.id === experience.id){
                return {...option, checked:!option.checked}
            }
            return option
        }))
    }
  return (
    <div className='flex w-40 md:w-50 items-center justify-start mt-1'>
        <input className='cursor-pointer' checked={checked} onClick={ handleClick} name={experience.description} id={experience.id.toString()} type='checkbox' />
        <label className='ml-5 cursor-pointer' htmlFor={experience.id.toString()}>{experience.description}</label>
    </div>
  )
}
