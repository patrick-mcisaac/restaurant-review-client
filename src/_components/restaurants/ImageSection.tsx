import { RestaurantType } from "@/types/RestaurantTypes"
import Image from "next/image"
import React from "react"
import ScrollButton from "../ScrollButton"

type ImageSectionProps = {
    topSection: React.RefObject<HTMLDivElement | null>
    restaurant: RestaurantType
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function ImageSection({
    topSection,
    restaurant,
    handleClick,
}: ImageSectionProps) {
    return (
        <div
            ref={topSection}
            className="relative flex min-h-screen w-full justify-center overflow-hidden"
        >
            <Image
                unoptimized={true}
                alt={restaurant.name}
                src={`http://localhost:8000${restaurant.image}`}
                fill
                style={{
                    objectFit: "cover",
                    animation: "fade-in",
                    animationDuration: "2s",
                    animationTimingFunction: "ease-out",
                }}
            />

            <ScrollButton
                className="z-1 mb-5 self-end md:mb-15"
                name="description"
                handleClick={handleClick}
            />
        </div>
    )
}
