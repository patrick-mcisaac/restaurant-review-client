import { ParamValue } from "next/dist/server/request/params"
import { fetchWithoutResponse, fetchWithResponse } from "./fetch_requests"
import { NewReviewType } from "@/types/ReviewTypes"

export const getRestaurantReviews = (id: ParamValue) => {
    return fetchWithResponse(`reviews?restaurant=${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    })
}

export const createReview = (data: NewReviewType) => {
    return fetchWithoutResponse('reviews', {
        method: 'POST',
        headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const getReviewById = (id: ParamValue) => {
    return fetchWithResponse(`reviews/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    })
}

export const deleteReview = (id: number) => {
    return fetchWithoutResponse(`reviews/${id}`,{
        method: 'DELETE',
        headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    })
}