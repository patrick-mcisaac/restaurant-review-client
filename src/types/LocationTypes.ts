export type LocationType ={
    id: number
    name: string
}

export type RestaurantLocationType = {
    address: string
    hours: string
    id: number
    city: LocationType
    location_average_rating: number
}