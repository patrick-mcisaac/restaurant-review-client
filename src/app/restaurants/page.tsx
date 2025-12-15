"use client"
import { RestaurantLists } from "@/_components/restaurants/RestaurantLists"
import { Searchbar } from "@/_components/searchbars/Searchbar"
import { getRestaurants } from "@/data/restaurant_fetches"
import { useQuery } from "@tanstack/react-query"

export default function Page() {
    const { data, isSuccess } = useQuery({
        queryKey: ["restaurants"],
        queryFn: getRestaurants,
        staleTime: 5 * 60000,
    })

    if (isSuccess) {
        return (
            <div className="pt-25">
                <h1 className="text-foreground mt-5 text-center text-4xl font-semibold tracking-wider md:text-6xl">
                    Our Restaurants
                </h1>
                <div className="m-10 flex flex-col items-center gap-5 md:flex-row md:items-end md:justify-around">
                    <Searchbar />
                </div>
                <div className="flex justify-center">
                    <RestaurantLists restaurants={data} />
                </div>
            </div>
        )
    }
}
