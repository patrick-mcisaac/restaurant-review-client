import { RatingType } from "@/types/RatingType"
import { fetchWithResponse } from "./fetch_requests"

export const setRating = (data : {restaurant: number, score: number}) : Promise<RatingType> => {
    return fetchWithResponse(`add_rating`, {
        method: 'POST',
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
    })
}