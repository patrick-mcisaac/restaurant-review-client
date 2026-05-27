import { ParamValue } from "next/dist/server/request/params"
import { fetchWithResponse } from "./fetch_requests"

export const getLocations = () => {
    return fetchWithResponse('cities', {
        method: 'GET',
        headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    })
}

export const getRestaurantLocations = (id: ParamValue) => {
    return fetchWithResponse(`cities?restaurant=${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    })
}