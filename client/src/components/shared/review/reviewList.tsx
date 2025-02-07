import { IReview, Review } from "./review"


interface Props {
    reviews: IReview[],
    profileElem?: boolean;
    canEditReviews?: boolean;
    handleUpdate: (id: string, e: React.FormEvent) => Promise<void>
    handleDelete: (reviewId: string) => Promise<void>
}

export const ReviewList = ({ reviews, handleUpdate, handleDelete, profileElem = false, canEditReviews = false }: Props) => {


    return (
        <div className="flex flex-col w-full gap-4 justify-center items-center md:w-2/3 lg:w-1/2">
            {
                Array.isArray(reviews) && (

                    <>
                        {reviews.map((review: IReview, index: number) => (
                            <Review key={index} {...review}
                                canEdit={canEditReviews}
                                handleUpdate={handleUpdate}
                                profileElem={profileElem}
                                handleDelete={handleDelete} />

                        ))}
                    </>
                )
            }
        </div>

    )
}