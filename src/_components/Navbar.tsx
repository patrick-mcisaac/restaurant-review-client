"use client"
import { useAuth } from "@/app/AuthProvider"
import Link from "next/link"

export const Navbar = () => {
    const { token, setToken } = useAuth()
    return (
        <ul className="dark:bg-dark-black bg-light-grey text-background dark:text-foreground absolute z-1 flex h-15 w-full items-center justify-between px-5 py-15 tracking-wider md:h-18 md:px-10 md:text-2xl">
            {token ?
                <>
                    <Link
                        href={"/restaurants"}
                        className="transition hover:scale-107"
                    >
                        <li className="text-2xl md:text-4xl md:font-semibold">
                            Restaurants
                        </li>
                    </Link>

                    <Link
                        href={"/login"}
                        onClick={() => {
                            setToken("")
                            localStorage.removeItem("token")
                        }}
                        className="transition hover:scale-107"
                    >
                        <li className="text-2xl md:text-4xl md:font-semibold">
                            Logout
                        </li>
                    </Link>
                </>
            :   <>
                    <Link
                        href={"/login"}
                        className="transition hover:scale-107"
                    >
                        <li className="text-2xl md:text-4xl md:font-semibold">
                            Login
                        </li>
                    </Link>
                    <Link
                        href={"/register"}
                        className="transition hover:scale-107"
                    >
                        <li className="text-2xl md:text-4xl md:font-semibold">
                            Register
                        </li>
                    </Link>
                </>
            }
        </ul>
    )
}
