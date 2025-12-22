"use client"
import { ReviewList } from "@/_components/reviews/ReviewList"
import { getRestaurantReviews } from "@/data/review_requests"
import { ReviewType } from "@/types/ReviewTypes"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"

export default function Page() {
    const { id } = useParams()

    const { data: reviews, isSuccess } = useQuery({
        queryKey: ["reviews", `restaurant${id}`],
        queryFn: () => getRestaurantReviews(id),
    })
    return isSuccess ?
            <div className="flex h-screen flex-col items-center justify-start gap-10 pt-40">
                {reviews.map((review: ReviewType) => (
                    <ReviewList
                        key={review.id}
                        id={id}
                        reviewId={review.id}
                        review={review}
                    />
                ))}
            </div>
        :   ""
}
