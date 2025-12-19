"use client"
import Button from "@/_components/Button"
import Details from "@/_components/restaurants/Details"
import ScrollButton from "@/_components/ScrollButton"
import { getRestaurantById } from "@/data/restaurant_fetches"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { use, useRef } from "react"
import { Rating } from "react-simple-star-rating"

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter()

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
                console.log(topSection.current)
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
                <h1 className="dark:bg-dark-black bg-light-grey text-light dark:text-foreground absolute z-1 mt-23 w-full pt-0 pb-5 text-center text-4xl font-semibold tracking-wider text-shadow-lg md:mt-25 md:pt-0 md:text-6xl">
                    {restaurant.name}
                </h1>
                <div
                    ref={topSection}
                    className="flex min-h-screen w-full justify-center overflow-hidden"
                >
                    <Image
                        unoptimized={true}
                        alt={restaurant.name}
                        src={`http://localhost:8000${restaurant.image}`}
                        fill
                        style={{
                            objectFit: "cover",
                        }}
                    />
                    <ScrollButton
                        className="z-1 mb-15 self-end"
                        name="description"
                        handleClick={handleClick}
                    />
                </div>
                <section
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
                </section>

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
                                <div
                                    className="flex flex-col"
                                    key={location.id}
                                >
                                    <Rating
                                        SVGclassName="inline-block"
                                        size={24}
                                        readonly
                                        initialValue={
                                            location.location_average_rating
                                        }
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
                                text="Review"
                                handleClick={() => {
                                    router.push(`/restaurants/${id}/add_review`)
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-end">
                            <Button
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
            </div>
        :   ""
}
