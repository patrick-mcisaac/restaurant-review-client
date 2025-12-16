"use client"
import { useAuth } from "@/app/AuthProvider"
import Link from "next/link"

export const Navbar = () => {
    const { setToken, token } = useAuth()

    return (
        <ul className="dark:bg-dark-black bg-light-grey text-background dark:text-foreground absolute z-1 flex h-15 w-full items-center justify-between px-5 tracking-wider md:h-18 md:px-10 md:text-2xl">
            <Link href={"/restaurants"} className="transition hover:scale-107">
                <li>Restaurants</li>
            </Link>
            {token ?
                <div>
                    <Link
                        href={"/login"}
                        onClick={() => {
                            setToken("")
                            localStorage.removeItem("token")
                        }}
                        className="transition hover:scale-107"
                    >
                        <li>Logout</li>
                    </Link>
                </div>
            :   <div className="flex gap-5 md:gap-10">
                    <Link href={"/login"}>
                        <li>Login</li>
                    </Link>
                    <Link href={"/register"}>
                        <li>Register</li>
                    </Link>
                </div>
            }
        </ul>
    )
}
