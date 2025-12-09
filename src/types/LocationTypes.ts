export type LocationType ={
    id: number
    city: string
}

export type RestaurantLocationType = {
    address: string
    hours: string
    id: number
    location: LocationType
}