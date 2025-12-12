import { ParamValue } from "next/dist/server/request/params"

export type ReviewType = {
    id: number
    review: string
    restaurant_location: {
        id: number
        name: string
    }
    restaurant: {
        id: number,
        name: string
    }
    user: {
        username: string
    }
    is_owner: boolean

}

export type NewReviewType = {
    review: string
    restaurant: ParamValue | number
    location?: number
    score: number
}

export type UpdateReviewType = NewReviewType & {
    id: number
    restaurant_location: number
}