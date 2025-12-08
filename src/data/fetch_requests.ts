import { CheckErrorJsonType, CheckErrorType, FetchOptionType } from "@/types/FetchTypes"

const API_URL = 'http://localhost:8000'

const checkError: CheckErrorType = (res)=> {
    if(!res.ok){
        throw Error(res.status.toString())
    }
    return res
}

const checkErrorJson: CheckErrorJsonType = (res) => {
    if(!res.ok){
        throw Error(res.status.toString())
    }
    return res.json()
}


export const fetchWithResponse = (resource: string, options: FetchOptionType) => fetch(`${API_URL}/${resource}`, options).then(checkErrorJson)

export const fetchWithoutResponse = (resource: string, options: FetchOptionType) => fetch(`${API_URL}/${resource}`, options).then(checkError)

