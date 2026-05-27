import { fetchWithResponse } from "./fetch_requests"

export const getExperiences = () => {
    return fetchWithResponse(`experiences`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    })
}