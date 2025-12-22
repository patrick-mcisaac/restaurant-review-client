"use client"
import DescriptionSection from "@/_components/restaurants/DescriptionSection"
import ImageSection from "@/_components/restaurants/ImageSection"
import LocationSection from "@/_components/restaurants/LocationSection"
import { getRestaurantById } from "@/data/restaurant_fetches"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import React, { use, useRef } from "react"

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)

    const topSection = useRef<HTMLDivElement | null>(null)
    const descriptionSection = useRef<HTMLDivElement | null>(null)
    const locationSection = useRef<HTMLDivElement | null>(null)

    const { data: restaurant, isSuccess } = useQuery({
        queryKey: ["restaurant", id],
        queryFn: () => getRestaurantById(id),
    })

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const name = e.currentTarget.name

        switch (name) {
            case "description":
                descriptionSection.current?.scrollIntoView({
                    behavior: "smooth",
                })
                break
            case "location":
                locationSection.current?.scrollIntoView({
                    behavior: "smooth",
                })
                break
            case "top":
                topSection.current?.scrollIntoView({
                    behavior: "smooth",
                })
                break
            default:
                break
        }
    }

    return isSuccess ?
            <div className="flex flex-col items-center">
                <h1 className="dark:bg-dark-black bg-light-grey text-light dark:text-foreground absolute z-1 mt-23 w-full pt-0 pb-8 text-center text-4xl font-semibold tracking-wider text-shadow-lg md:mt-25 md:pt-0 md:text-6xl">
                    {restaurant.name}
                </h1>
                <ImageSection
                    topSection={topSection}
                    restaurant={restaurant}
                    handleClick={handleClick}
                />

                <DescriptionSection
                    descriptionSection={descriptionSection}
                    restaurant={restaurant}
                    handleClick={handleClick}
                />

                <LocationSection
                    restaurant={restaurant}
                    handleClick={handleClick}
                    locationSection={locationSection}
                    id={id}
                />
            </div>
        :   ""
}
