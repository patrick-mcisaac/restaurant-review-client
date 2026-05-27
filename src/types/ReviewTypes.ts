import { ParamValue } from "next/dist/server/request/params"
import { DiningExperienceType } from "./DiningExperienceTypes"

export type ReviewType = {
    id: number
    review: string
    restaurant_location: {
        id: number
        name: string
    }
    restaurant: {
        id: number
        name: string
    }
    user: {
        username: string
    }
    is_owner: boolean
    dining_experience: DiningExperienceType[]
    score: number
    created_at: string
}

export type NewReviewType = {
    review: string
    restaurant: ParamValue | number
    location?: number
    score: number
    dining_experience: { id: number; checked: boolean }[]
}

export type UpdateReviewType = NewReviewType & {
    id: number
    restaurant_location: number
}
