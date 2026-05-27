"use client"
import { AuthProviderType } from "@/types/AuthType"
import { usePathname, useRouter } from "next/navigation"
import React, { createContext, useContext, useEffect, useState } from "react"

export const AuthContext = createContext<AuthProviderType | undefined>(
    undefined,
)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        setToken(localStorage.getItem("token"))
    }, [])

    useEffect(() => {
        const authPaths = ["/login", "/register"]

        if (!authPaths.includes(pathname) && !localStorage.getItem("token")) {
            router.replace("/login")
        }
    }, [pathname])

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("Auth Context must be used within Auth Provider")
    }
    return context
}
