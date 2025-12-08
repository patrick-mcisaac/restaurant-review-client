import { RestaurantType } from "./RestaurantTypes"

export type FetchOptionType = {
    method: string,
    headers:{
        Authorization: string
        'Content-Type'?: string
    },
    body?: string
    
}

export type CheckErrorType = (res: Response) => Response | string

export type CheckErrorJsonType = (res: Response) => Promise<RestaurantType[]>

