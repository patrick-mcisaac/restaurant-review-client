"use client"
import Button from "@/_components/Button"
import Checkbox from "@/_components/form/Checkbox"
import TextArea from "@/_components/form/TextArea"
import { Select } from "@/_components/searchbars/Select"
import { getExperiences } from "@/data/experiences_requests"
import { getRestaurantLocations } from "@/data/location_requests"
import { getReviewById, updateReview } from "@/data/review_requests"
import { DiningExperienceType } from "@/types/DiningExperienceTypes"
import { useMutation, useQueries, useQuery } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { Rating } from "react-simple-star-rating"

export default function Page() {
    const router = useRouter()
    const { id } = useParams()
    const [review, setReview] = useState({
        id: Number(id),
        review: "",
        restaurant_location: 0,
        score: 0,
        restaurant: 0,
    })
    const [checkboxes, setCheckboxes] = useState<
        { id: number; checked: boolean }[]
    >([])

    const { data: old_review, isSuccess } = useQuery({
        queryKey: ["review", id],
        queryFn: () => getReviewById(id),
    })

    const restaurantId: string = old_review?.restaurant.id

    const [query1, query2] = useQueries({
        queries: [
            {
                queryKey: ["restaurantLocation", id],
                queryFn: () => getRestaurantLocations(restaurantId),
                enabled: !!restaurantId,
            },
            {
                queryKey: ["experiences"],
                queryFn: getExperiences,
            },
        ],
    })
    const { data: locations, isSuccess: locationSuccess } = query1
    const { data: experiences } = query2

    const { mutate } = useMutation({
        mutationFn: () =>
            updateReview(old_review.id, {
                ...review,
                dining_experience: checkboxes,
            }),
    })

    useEffect(() => {
        if (old_review) {
            setReview({
                ...review,
                id: parseInt(old_review.id),
                review: old_review.review,
                score: old_review.score,
                restaurant_location: old_review.restaurant_location.id,
                restaurant: old_review.restaurant.id,
            })
        }
    }, [old_review])

    useEffect(() => {
        if (experiences && old_review) {
            setCheckboxes(() =>
                experiences.map((e: DiningExperienceType) => {
                    const value = { id: e.id, checked: false }
                    for (const experience of old_review.dining_experience) {
                        if (e.id == experience.id) {
                            value.checked = true
                        }
                    }
                    return value
                }),
            )
        }
    }, [experiences, old_review])

    const handleChange = (
        e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>,
    ) => {
        const name = e.target.name

        switch (name) {
            case "location":
                setReview({
                    ...review,
                    restaurant_location: parseInt(e.target.value),
                })
                break
            case "review":
                setReview({ ...review, review: e.target.value })
                break
            default:
                break
        }
    }

    const handleClick = () => {
        mutate()
        router.push(`/restaurants/${old_review.restaurant.id}/reviews`)
    }

    const handleRatingChange = (e: number) => {
        setReview({ ...review, score: e })
    }

    return isSuccess ?
            <form className="flex flex-col justify-start">
                <section className="flex h-screen flex-col justify-evenly px-5 pt-10">
                    <h1 className="mt-5 text-center text-5xl">Review</h1>
                    {locationSuccess ?
                        <fieldset className="flex justify-end">
                            <Select
                                value={review.restaurant_location}
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
                                        wasChecked={
                                            old_review.dining_experience
                                        }
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
                            initialValue={review.score}
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
        :   ""
}
