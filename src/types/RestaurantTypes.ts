import { RestaurantLocationType } from "./LocationTypes"
import { ReviewType } from "./ReviewTypes"

export type RestaurantType = {
    id: number
    name: string
    description: string
    average_ratings: number
    restaurant_reviews: ReviewType[]
    locations: RestaurantLocationType[]
    image: string
    user_score: number
}