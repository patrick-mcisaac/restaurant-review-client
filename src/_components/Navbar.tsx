import Link from "next/link"
import React from "react"

export const Navbar = () => {
    return (
        <ul className="dark:bg-dark-black text-foreground flex h-25 items-center justify-between px-10 text-2xl tracking-wider">
            <Link href={"/restaurants"} className="transition hover:scale-107">
                <li>Restaurants</li>
            </Link>
            <Link href={"/"} className="transition hover:scale-107">
                <li>Logout</li>
            </Link>
        </ul>
    )
}
