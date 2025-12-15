"use client"
import Button from "@/_components/Button"
import Checkbox from "@/_components/form/Checkbox"
import TextArea from "@/_components/form/TextArea"
import { Select } from "@/_components/searchbars/Select"
import { getExperiences } from "@/data/experiences_requests"
import { getRestaurantLocations } from "@/data/location_requests"
import { createReview } from "@/data/review_requests"
import { DiningExperienceType } from "@/types/DiningExperienceTypes"
import { useMutation, useQueries, useQuery } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { Rating } from "react-simple-star-rating"

export default function Page() {
    const { id } = useParams()
    const [review, setReview] = useState({
        review: "",
        restaurant: id,
        location: 0,
        score: 0,
    })

    const [checkboxes, setCheckboxes] = useState<
        { id: number; checked: boolean }[]
    >([])

    const router = useRouter()

    const [query1, query2] = useQueries({
        queries: [
            {
                queryKey: ["restaurantLocation", id],
                queryFn: () => getRestaurantLocations(id),
            },
            {
                queryKey: ["experiences"],
                queryFn: getExperiences,
            },
        ],
    })

    const { data: locations, isSuccess } = query1
    const { data: experiences } = query2

    useEffect(() => {
        if (experiences) {
            setCheckboxes(() =>
                experiences.map((e: DiningExperienceType) => {
                    return { id: e.id, checked: false }
                }),
            )
        }
    }, [experiences])

    const { data, mutate } = useMutation({
        mutationFn: () =>
            createReview({ ...review, dining_experience: [...checkboxes] }),
        onSuccess: () => {
            router.replace(`/restaurants/${id}/reviews`)
        },
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>,
    ) => {
        const name = e.target.name
        const value = e.target.value
        switch (name) {
            case "review":
                setReview({ ...review, review: value })
                break
            case "location":
                setReview({ ...review, location: parseInt(value) })
                break
            default:
                break
        }
    }

    const handleClick = () => {
        if (review.location > 0 && review.review !== "") {
            mutate()
        } else {
            window.alert("Please fill out the form")
        }
    }

    const handleRatingChange = (e: number) => {
        setReview({ ...review, score: e })
    }
    return (
        <form className="flex flex-col justify-start">
            <section className="flex h-screen flex-col justify-evenly px-5 pt-10">
                <h1 className="mt-5 text-center text-5xl">Review</h1>
                {isSuccess ?
                    <fieldset className="flex justify-end">
                        <Select
                            handleChange={handleChange}
                            name="location"
                            locations={locations}
                            className="text-foreground bg-light-grey cursor-pointer rounded-lg px-3 py-1"
                        />
                    </fieldset>
                :   ""}
                <fieldset className="flex justify-center">
                    <TextArea
                        name="review"
                        handleChange={handleChange}
                        value={review.review}
                        className="bg-light-grey text-foreground h-75 w-full p-2 md:h-120 lg:h-120 lg:w-200"
                    />
                </fieldset>
            </section>
            <section className="flex h-screen flex-col justify-evenly p-5">
                <fieldset className="flex flex-col items-center gap-10">
                    <h2 className="text-center text-3xl font-semibold">
                        Experience Highlights
                    </h2>
                    <section className="mt-4 flex max-w-200 flex-wrap items-center justify-around gap-2">
                        {experiences &&
                            experiences.map((e: DiningExperienceType) => (
                                <Checkbox
                                    setCheckboxes={setCheckboxes}
                                    key={e.id}
                                    experience={e}
                                />
                            ))}
                    </section>
                </fieldset>
                <fieldset className="flex items-center justify-center">
                    <Rating
                        onClick={handleRatingChange}
                        SVGclassName="inline-block"
                        size={24}
                        initialValue={0}
                    />
                </fieldset>
                <Button
                    className="mt-10 w-full self-center md:absolute md:bottom-10 md:w-[90%] lg:relative lg:w-200"
                    text="Submit"
                    preventDefault={true}
                    handleClick={handleClick}
                />
            </section>
        </form>
    )
}
