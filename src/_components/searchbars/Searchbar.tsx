"use client"
import React, { SetStateAction, useEffect, useState } from "react"
import { Input } from "../form/Input"
import { Select } from "./Select"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getLocations } from "@/data/location_requests"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { routerServerGlobal } from "next/dist/server/lib/router-utils/router-server-context"

export const Searchbar = () => {
    const { data: locations, isSuccess } = useQuery({
        queryKey: ["locations"],
        queryFn: getLocations,
    })

    const pathName = usePathname()
    const searchParams = useSearchParams()
    const { replace } = useRouter()

    const [searchTerm, setSearchTerm] = useState("")
    const [locationFilter, setLocationFilter] = useState(0)
    const [paramString, setParamString] = useState("")

    // TODO: functions for search and filter
    const handleChange = (
        e: React.ChangeEvent<
            HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
        >,
    ) => {
        const name = e.target.name
        const value = e.target.value

        switch (name) {
            case "search":
                setSearchTerm(value)
                break
            case "locations":
                setLocationFilter(parseInt(value))
                break
            default:
                break
        }

        const params = new URLSearchParams(searchParams.toString())
        params.set(name, value)

        setParamString(`${pathName}?${params.toString()}`)
    }

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            replace(paramString)
        }, 200)

        return () => clearTimeout(timeOutId)
    }, [paramString])

    return (
        <>
            <Input
                onChange={handleChange}
                value={searchTerm}
                label={false}
                type="text"
                placeholder="search"
                name="search"
                className="bg-midground text-foreground w-full rounded-lg p-[.1rem_1rem] md:w-100"
            />
            {isSuccess ?
                <Select
                    className="text-foreground bg-midground bg-light-grey w-full cursor-pointer rounded-lg px-3 py-1 md:w-100"
                    handleChange={handleChange}
                    name="locations"
                    locations={locations}
                    value={locationFilter}
                />
            :   ""}
        </>
    )
}
