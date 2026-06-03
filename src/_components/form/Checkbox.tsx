import { DiningExperienceType } from "@/types/DiningExperienceTypes"
import { ReviewType } from "@/types/ReviewTypes"
import React, { useEffect, useState } from "react"

type CheckboxProps = {
    experience: DiningExperienceType
    setCheckboxes: React.Dispatch<
        React.SetStateAction<
            {
                id: number
                checked: boolean
            }[]
        >
    >
    wasChecked?: ReviewType[]
}

export default function Checkbox({
    experience,
    setCheckboxes,
    wasChecked,
}: CheckboxProps) {
    const [checked, setChecked] = useState(false)
    const handleClick = () => {
        setChecked(!checked)
        setCheckboxes((prev) =>
            prev.map((option) => {
                if (option.id === experience.id) {
                    return { ...option, checked: !option.checked }
                }
                return option
            }),
        )
    }

    useEffect(() => {
        if (wasChecked) {
            setChecked(() => {
                const found = wasChecked.find((c) => c.id === experience.id)
                return found ? true : false
            })
        }
    }, [wasChecked])
    return (
        <label
            htmlFor={experience.id.toString()}
            className="group border-light bg-midground dark:bg-light-grey hover:bg-light-grey dark:hover:bg-midground focus-within:border-foreground focus-within:ring-foreground/30 flex w-full max-w-xs cursor-pointer items-center gap-3 rounded-3xl border px-4 py-3 shadow-lg shadow-black/10 transition duration-200 focus-within:ring-2"
        >
            <span className="border-foreground bg-background group-hover:border-foreground relative flex h-5 w-5 shrink-0 items-center justify-center rounded-xl border transition duration-200">
                <input
                    className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    checked={checked}
                    onChange={handleClick}
                    name={experience.description}
                    id={experience.id.toString()}
                    type="checkbox"
                />
                <span className="bg-foreground pointer-events-none inline-flex h-3.5 w-3.5 scale-0 rounded-lg transition duration-200 ease-out peer-checked:scale-100" />
            </span>
            <span className="text-foreground group-hover:text-foreground text-sm font-medium transition duration-200">
                {experience.description}
            </span>
        </label>
    )
}
