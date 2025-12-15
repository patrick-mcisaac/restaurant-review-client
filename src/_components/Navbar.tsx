'use client'
import {  useAuth } from "@/app/AuthProvider"
import Link from "next/link"



export const Navbar = () => {
   
    const {setToken, token} = useAuth()

    return (
        <ul className="dark:bg-dark-black text-foreground absolute w-full flex h-15 md:h-18 items-center justify-between px-5 md:px-10 md:text-2xl tracking-wider">
            <Link href={"/restaurants"} className="transition hover:scale-107">
                <li>Restaurants</li>
            </Link>
            {token?
            <div>
                <Link href={"/login"} onClick={() => {
                    setToken('')
                    localStorage.removeItem('token')
                }} className="transition hover:scale-107">
                    <li>Logout</li>
                </Link>
            </div>
            :
            <div className="flex gap-5 md:gap-10">
                <Link href={'/login'}>
                    <li>Login</li>
                </Link>
                <Link href={'/register'}>
                    <li>Register</li>
                </Link>
            </div> 
            }
        </ul>
    )
}
