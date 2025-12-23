"use client"

import Button from "@/_components/form/Button"
import { Input } from "@/_components/form/Input"
import { useAuth } from "@/app/AuthProvider"

import { register } from "@/data/auth_requests"
import { RegisterType } from "@/types/AuthType"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"

export default function Page() {
    const router = useRouter()

    const { setToken } = useAuth()
    const firstNameRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        firstNameRef.current?.focus()
    }, [])

    const { data, mutate } = useMutation({
        mutationFn: (data: RegisterType) => register(data),
        onSuccess: (data) => {
            setToken(data.token)
            localStorage.setItem("token", data.token)
            router.replace("/")
        },
    })

    const [userRegister, setUserRegister] = useState<RegisterType>({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const copyUser = { ...userRegister }

        switch (e.target.name) {
            case "first_name":
                copyUser.first_name = e.target.value
                break
            case "last_name":
                copyUser.last_name = e.target.value
                break
            case "username":
                copyUser.username = e.target.value
                break
            case "email":
                copyUser.email = e.target.value
                break
            case "password":
                copyUser.password = e.target.value
                break
            default:
                break
        }

        setUserRegister(copyUser)
    }

    const handleClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        e.preventDefault()
        mutate(userRegister)
    }
    return (
        <form className="m-auto flex h-screen w-50 flex-col items-center justify-center gap-10">
            <Input
                label={true}
                type="text"
                placeholder="First Name"
                value={userRegister.first_name}
                onChange={handleChange}
                name="first_name"
                className="bg-midground rounded-2xl p-[.2rem_1rem] text-xl"
                ref={firstNameRef}
            />

            <Input
                label={true}
                type="text"
                placeholder="Last Name"
                value={userRegister.last_name}
                onChange={handleChange}
                name="last_name"
                className="bg-midground rounded-2xl p-[.2rem_1rem] text-xl"
            />

            <Input
                label={true}
                type="email"
                placeholder="Email"
                value={userRegister.email}
                onChange={handleChange}
                name="email"
                className="bg-midground rounded-2xl p-[.2rem_1rem] text-xl"
            />

            <Input
                label={true}
                type="text"
                placeholder="username"
                value={userRegister.username}
                onChange={handleChange}
                name="username"
                className="bg-midground rounded-2xl p-[.2rem_1rem] text-xl"
            />

            <Input
                label={true}
                type="password"
                placeholder="password"
                value={userRegister.password}
                onChange={handleChange}
                name="password"
                className="bg-midground rounded-2xl p-[.2rem_1rem] text-xl"
            />
            <Button handleClick={handleClick} text="Register" />
        </form>
    )
}
