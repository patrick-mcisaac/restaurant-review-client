import { fetchWithResponse } from "./fetch_requests"

export const getRestaurants = () => {
    fetchWithResponse('restaurants', {
        method: "GET",
        headers: {
            Authorization: `Token `
        }
    })
}