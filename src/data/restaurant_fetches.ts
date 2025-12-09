import { RestaurantType } from "@/types/RestaurantTypes"
import { fetchWithResponse } from "./fetch_requests"



export const getRestaurants = ():Promise<RestaurantType[]> => {
    return fetchWithResponse(`restaurants`, {
        method: "GET",
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
}

export const getRestaurantById = (id:string):Promise<RestaurantType> => {
    return fetchWithResponse(`restaurants/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
}