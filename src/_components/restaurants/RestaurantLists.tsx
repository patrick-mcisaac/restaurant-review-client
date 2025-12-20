"use client"

import Card from "../Card"
import { useQuery } from "@tanstack/react-query"
import { usePathname, useSearchParams } from "next/navigation"
import { getRestaurants } from "@/data/restaurant_fetches"

export const RestaurantLists = () => {
    const pathName = usePathname()
    const searchParams = useSearchParams()
    const query = `${pathName}?${searchParams.toString()}`

    const { data: restaurants, isSuccess } = useQuery({
        queryKey: ["restaurants", query],
        queryFn: () => getRestaurants(query),
        staleTime: 5 * 60000,
    })

    return (
        <div className="flex flex-col items-center gap-5 md:gap-20">
            <section className="flex flex-wrap items-start justify-around gap-x-10 gap-y-20 p-10">
                {isSuccess ?
                    restaurants.map((r) => (
                        <Card
                            key={r.id}
                            id={r.id}
                            name={r.name}
                            description={r.description}
                            rating={r.average_ratings}
                        />
                    ))
                :   ""}
            </section>
        </div>
    )
}
