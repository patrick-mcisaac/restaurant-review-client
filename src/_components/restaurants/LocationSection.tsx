import { RestaurantType } from "@/types/RestaurantTypes"
import React from "react"
import { Rating } from "react-simple-star-rating"
import Details from "./Details"
import Button from "../Button"
import ScrollButton from "../ScrollButton"
import { useRouter } from "next/navigation"

type LocationSectionProps = {
    locationSection: React.RefObject<HTMLDivElement | null>
    restaurant: RestaurantType
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    id: string
}

export default function LocationSection({
    locationSection,
    restaurant,
    handleClick,
    id,
}: LocationSectionProps) {
    const router = useRouter()
    return (
        <div
            ref={locationSection}
            className="relative flex h-screen flex-col items-center justify-between p-10 pb-2 md:p-30"
        >
            <h2 className="w-full text-center text-5xl font-semibold tracking-wider lg:text-6xl">
                Locations
            </h2>
            <div className="flex flex-col items-start justify-between gap-20 md:flex-row md:gap-50">
                {restaurant.locations.map((location) => {
                    return (
                        <div className="flex flex-col" key={location.id}>
                            <Rating
                                SVGclassName="inline-block"
                                size={24}
                                readonly
                                initialValue={location.location_average_rating}
                            />
                            <div className="flex w-full items-end justify-between gap-20 md:flex-col md:items-start md:gap-2">
                                <Details
                                    city={location.city.name}
                                    info={location.address}
                                />
                                <Details info={location.hours} />
                            </div>
                        </div>
                    )
                })}
            </div>
            <section className="mb-0 flex w-full items-end justify-around md:mb-10">
                <div className="flex items-center justify-end">
                    <Button
                        className="h-15 w-45 rounded-2xl transition hover:scale-110"
                        text="Review"
                        handleClick={() => {
                            router.push(`/restaurants/${id}/add_review`)
                        }}
                    />
                </div>
                <div className="flex items-center justify-end">
                    <Button
                        className="h-15 w-45 rounded-2xl transition hover:scale-110"
                        text="Our Reviews"
                        handleClick={() => {
                            router.push(`/restaurants/${id}/reviews`)
                        }}
                    />
                </div>
            </section>
            <ScrollButton
                className=""
                name="top"
                up={true}
                handleClick={handleClick}
            />
        </div>
    )
}
