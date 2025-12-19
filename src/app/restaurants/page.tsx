"use client"
import { RestaurantLists } from "@/_components/restaurants/RestaurantLists"
import { Searchbar } from "@/_components/searchbars/Searchbar"

export default function Page() {
    return (
        <div className="pt-25">
            <h1 className="text-foreground mt-5 text-center text-4xl font-semibold tracking-wider md:text-6xl">
                Our Restaurants
            </h1>
            <div className="m-10 flex flex-col items-center gap-5 md:flex-row md:items-end md:justify-around">
                <Searchbar />
            </div>
            <div className="flex justify-center">
                <RestaurantLists />
            </div>
        </div>
    )
}
