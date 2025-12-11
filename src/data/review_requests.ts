import { ParamValue } from "next/dist/server/request/params"
import { fetchWithResponse } from "./fetch_requests"

export const getRestaurantReviews = (id: ParamValue) => {
    return fetchWithResponse(`reviews?restaurant=${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    })
}