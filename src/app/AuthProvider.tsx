'use client'
import { AuthProviderType } from "@/types/AuthType";
import { INSPECT_MAX_BYTES } from "buffer";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";


export const AuthContext = createContext<AuthProviderType | undefined>(undefined)

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [token, setToken] = useState<string>('')
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const checkToken = localStorage.getItem('token')
        if(checkToken){
            setToken(checkToken)
        }
    },[])

    useEffect(() => {
        const authPaths = ['/login', '/register']

        if(!authPaths.includes(pathname) && token === ''){
            router.replace('/login')
        }
    },[token, pathname])

  

    return <AuthContext.Provider value={{token, setToken}}>{children}</AuthContext.Provider>

    
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if(!context){
        throw new Error('Auth Context must be used within Auth Provider')
    }
    return context
}