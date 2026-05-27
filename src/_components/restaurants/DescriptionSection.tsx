import { RestaurantType } from "@/types/RestaurantTypes"
import React from "react"
import ScrollButton from "../ScrollButton"

type DescriptionSectionProps = {
    descriptionSection: React.RefObject<HTMLDivElement | null>
    restaurant: RestaurantType
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function DescriptionSection({
    descriptionSection,
    restaurant,
    handleClick,
}: DescriptionSectionProps) {
    return (
        <div
            ref={descriptionSection}
            className="bg-light-grey dark:text-foreground text-background flex h-screen w-full flex-wrap items-end justify-center gap-0 pt-15 pb-15"
        >
            <p className="w-full text-center text-2xl md:text-3xl lg:text-4xl">
                {restaurant.description}
            </p>
            <ScrollButton
                className=""
                name="location"
                handleClick={handleClick}
            />
        </div>
    )
}
