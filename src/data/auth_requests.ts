import { LoginType, RegisterType } from "@/types/AuthType"
import { fetchWithResponse } from "./fetch_requests"

export const login = (data: LoginType) => {
    return fetchWithResponse('login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const register = (data: RegisterType) => {
    return fetchWithResponse('register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}