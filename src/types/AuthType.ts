export interface LoginType {
    username: string
    password: string
}

export type AuthProviderType = {
    token: string | null
    setToken: React.Dispatch<React.SetStateAction<string | null>>
}

export interface RegisterType extends LoginType {
    first_name: string
    last_name: string
    email: string
}
