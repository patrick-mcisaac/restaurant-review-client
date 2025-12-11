import { ParamValue } from "next/dist/server/request/params"
import { fetchWithResponse } from "./fetch_requests"

export const getLocations = () => {
    return fetchWithResponse('locations', {
        method: 'GET',
        headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    })
}

export const getRestaurantLocations = (id: ParamValue) => {
    return fetchWithResponse(`locations?restaurant=${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    })
}