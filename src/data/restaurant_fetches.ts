import { RestaurantType } from "@/types/RestaurantTypes"
import { fetchWithResponse } from "./fetch_requests"



export const getRestaurants = ():Promise<RestaurantType[]> => {
    return fetchWithResponse(`restaurants`, {
        method: "GET",
        headers: {
            Authorization: `Token a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0`
        }
    })
}