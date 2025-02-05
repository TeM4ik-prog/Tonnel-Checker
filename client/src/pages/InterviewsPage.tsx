import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Dialog";
import ContentBlock from "@/components/ui/ContentBlock";
import { onRequest } from "@/types";
import { ReviewService } from "@/services/review.service";
import { PageContainer } from "@/components/layout/PageContainer";
import { Block } from "@/components/layout/Block";
import { ReviewList } from "@/components/shared/review/reviewList";
import { IReview } from "@/components/shared/review/review";
import { returnObjectFromForm } from "@/utils";
import { toast } from "react-toastify";



export const InterviewsPage: React.FC = () => {
    const [reviews, setReviews] = useState<IReview[]>([])


    const getAllReviews = async () => {
        const data = await onRequest(ReviewService.getReviews())
        console.log(data)
        if (data) {
            setReviews(data)
        }
    }

    const handleReviewUpdate = async (id: string, e: React.FormEvent) => {
            e.preventDefault()
    
            const formObject = returnObjectFromForm(e)
    
            const data = await onRequest(ReviewService.updateReview(id, formObject))
    
            console.log("Ответ от сервера:", data);
    
            toast.success(`Post updated successfully`)
            window.location.reload()
    
            console.log(data);
        };
    
        const handleReviewDelete = async (id: string) => {
            await onRequest(ReviewService.deleteReview(id))
            window.location.reload();
        }



    useEffect(() => {
        getAllReviews()
    }, [])

    return (
        <PageContainer title={'Интервью учащихся'}>
            <ReviewList reviews={reviews} handleUpdate={handleReviewUpdate} handleDelete={handleReviewDelete}  />
        </PageContainer >
    );
};
