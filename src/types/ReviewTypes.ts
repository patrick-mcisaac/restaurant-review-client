export type ReviewType = {
    id: number
    review: string
    restaurant_location: number
    restaurant: {
        id: number,
        name: string
    }
    user: {
        username: string
    }
    is_owner: boolean

}