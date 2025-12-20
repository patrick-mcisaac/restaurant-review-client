import { Skeleton } from "@mui/material"
import React from "react"

export default function Loading() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-30">
            <Skeleton
                sx={{ bgcolor: "#3a3a3a" }}
                variant="rounded"
                width={300}
                height={150}
            />
            <Skeleton
                sx={{ bgcolor: "#3a3a3a" }}
                variant="rounded"
                width={300}
                height={150}
            />
            <Skeleton
                sx={{ bgcolor: "#3a3a3a" }}
                variant="rounded"
                width={300}
                height={150}
            />
            <Skeleton
                sx={{ bgcolor: "#3a3a3a" }}
                variant="rounded"
                width={300}
                height={150}
            />
            <Skeleton
                sx={{ bgcolor: "#3a3a3a" }}
                variant="rounded"
                width={300}
                height={150}
            />
            <Skeleton
                sx={{ bgcolor: "#3a3a3a" }}
                variant="rounded"
                width={300}
                height={150}
            />
        </div>
    )
}
