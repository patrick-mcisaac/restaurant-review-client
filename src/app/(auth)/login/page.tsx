"use client"
import Button from "@/_components/form/Button"
import { Input } from "@/_components/form/Input"
import { useAuth } from "@/app/AuthProvider"
import { login } from "@/data/auth_requests"
import { LoginType } from "@/types/AuthType"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Page() {
    const { setToken } = useAuth()
    const router = useRouter()

    const { data, mutate } = useMutation({
        mutationFn: (userLogin: LoginType) => login(userLogin),
        onSuccess: (data) => {
            localStorage.setItem("token", data.token)
            setToken(data.token)
            router.replace("/")
        },
    })

    const [userLogin, setUserLogin] = useState<LoginType>({
        username: "",
        password: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const copyUser = {
            ...userLogin,
        }

        if (e.target.name === "username") {
            copyUser.username = e.target.value
        }
        if (e.target.name === "password") {
            copyUser.password = e.target.value
        }

        setUserLogin(copyUser)
    }

    const handleClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        e.preventDefault()
        mutate(userLogin)
    }
    return (
        <form className="m-auto flex h-screen w-50 flex-col items-center justify-center gap-20">
            <Input
                label={true}
                type="text"
                placeholder="username"
                value={userLogin.username}
                onChange={handleChange}
                name="username"
                className="bg-midground rounded-2xl p-[.2rem_1rem] text-xl"
            />
            <Input
                label={true}
                type="password"
                placeholder="password"
                value={userLogin.password}
                onChange={handleChange}
                name="password"
                className="bg-midground rounded-2xl p-[.2rem_1rem] text-xl"
            />
            <Button handleClick={handleClick} text="Login" />
        </form>
    )
}
