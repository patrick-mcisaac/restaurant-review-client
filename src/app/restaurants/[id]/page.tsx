"use client"
import Button from "@/_components/Button"
import Details from "@/_components/restaurants/Details"
import { getRestaurantById } from "@/data/restaurant_fetches"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { use } from "react"
import { Rating } from "react-simple-star-rating"

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter()
    // const queryClient = useQueryClient()
    const { id } = use(params)

    const { data: restaurant, isSuccess } = useQuery({
        queryKey: ["restaurant", id],
        queryFn: () => getRestaurantById(id),
    })

    return isSuccess ?
            <div className="flex flex-col items-center pt-15">
                <h1 className="dark:bg-dark-black bg-light-grey text-light dark:text-foreground absolute z-1 w-full pb-15 text-center text-4xl font-semibold tracking-wider text-shadow-lg md:text-6xl">
                    {restaurant.name}
                </h1>

                <div className="relative h-screen w-full overflow-hidden">
                    <Image
                        unoptimized={true}
                        alt={restaurant.name}
                        src={`http://localhost:8000${restaurant.image}`}
                        fill
                        style={{
                            objectFit: "cover",
                        }}
                    />
                </div>
                <section className="bg-light-grey dark:text-foreground text-background flex h-[105vh] w-full items-center justify-center">
                    <p className="text-center text-2xl md:text-3xl lg:text-4xl">
                        {restaurant.description}
                    </p>
                </section>

                <div className="flex h-screen flex-col items-center justify-between p-30">
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
                    <section className="flex w-full items-end justify-around">
                        <div className="mt-5 flex items-center justify-end">
                            <Button
                                text="Review"
                                handleClick={() => {
                                    router.push(`/restaurants/${id}/add_review`)
                                }}
                            />
                        </div>
                        <div className="mt-5 flex items-center justify-end">
                            <Button
                                text="Our Reviews"
                                handleClick={() => {
                                    router.push(`/restaurants/${id}/reviews`)
                                }}
                            />
                        </div>
                    </section>
                </div>
            </div>
        :   ""
}
