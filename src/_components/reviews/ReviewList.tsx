"use client"
import { ReviewType } from "@/types/ReviewTypes"
import React from "react"
import Button from "../Button"
import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteReview } from "@/data/review_requests"
import { ParamValue } from "next/dist/server/request/params"
import { Rating } from "react-simple-star-rating"

type ReviewProps = {
    review: ReviewType
    id: ParamValue
    reviewId: number
}

export const ReviewList = ({ review, id, reviewId }: ReviewProps) => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: () => deleteReview(reviewId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["reviews", `restaurant${id}`],
            })
        },
        onSettled: () => {
            queryClient.refetchQueries({
                queryKey: ["reviews", `restaurant${id}`],
            })
        },
    })
    return (
        <div className="dark:border-foreground dark:bg-light-grey bg-midground text-foreground border-light flex w-[80%] flex-col rounded-lg border p-3 md:w-[50%] md:p-10">
            <div className="mt-2 flex flex-col justify-between text-center md:flex-row md:items-start">
                <div>
                    <h1 className="text-xl font-semibold md:text-2xl">
                        {review.restaurant.name}
                    </h1>
                    <Rating
                        SVGclassName="inline-block"
                        size={20}
                        readonly
                        initialValue={review.score}
                    />
                </div>
                <p className="mt-3 text-lg md:mt-0">
                    {review.restaurant_location.name}
                </p>
            </div>
            <p className="text-md mt-5 text-center md:mt-15">{review.review}</p>
            <h3 className="mt-5 text-center text-xl font-semibold tracking-wider md:mt-15 md:text-2xl">
                Highlights
            </h3>
            <section className="mt-2 flex w-full flex-wrap items-center justify-around md:mt-10">
                {review.dining_experience.map((e) => (
                    <p key={e.id}>{e.description}</p>
                ))}
            </section>
            <p className="mt-10 self-end text-sm">{review.user.username}</p>
            {review.is_owner ?
                <div className="mt-10 flex flex-col gap-5">
                    <Button
                        text="Edit"
                        handleClick={() => {
                            router.push(`/restaurants/${review.id}/edit_review`)
                        }}
                    />
                    <Button text="Delete" handleClick={mutate} />
                </div>
            :   ""}
        </div>
    )
}
