import { IReview, Review } from "./review"


interface Props {
    reviews: IReview[]
}

export const ReviewList = ({ reviews }: Props) => {


    return (
        <>
            {
                Array.isArray(reviews) && (

                    <>
                        {reviews.map((review: IReview, index: number) => (
                            <Review key={index} {...review} />

                        ))}
                    </>
                )
            }
        </>

    )
}