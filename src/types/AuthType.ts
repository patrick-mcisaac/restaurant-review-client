export type LoginType = {
    username: string
    password: string
}

export type AuthProviderType = {
    token: string
    setToken: React.Dispatch<React.SetStateAction<string>>
}