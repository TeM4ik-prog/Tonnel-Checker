import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Dialog";
import ContentBlock from "@/components/ui/ContentBlock";
import { onRequest, UserRole } from "@/types";
import { ReviewService } from "@/services/review.service";
import { PageContainer } from "@/components/layout/PageContainer";
import { Block } from "@/components/layout/Block";
import { ReviewList } from "@/components/shared/review/reviewList";
import { IReview } from "@/components/shared/review/review";
import { returnObjectFromForm } from "@/utils";
import { toast } from "react-toastify";
import { useUserData } from "@/store/hooks";



const InterviewsPage: React.FC = () => {
    const [reviews, setReviews] = useState<IReview[]>([])
    const [canEdit, setCanEdit] = useState<boolean>(false)

    const { user } = useUserData()

    const getAllReviews = async () => {
        const data = await onRequest(ReviewService.getReviews())
        if (data) {
            setReviews(data)
        }
    }

    const handleReviewUpdate = async (id: string, e: React.FormEvent) => {
        e.preventDefault()

        const formObject = returnObjectFromForm(e)
        const data = await onRequest(ReviewService.updateReview(id, formObject))

        toast.success('Интервью изменено')
        getAllReviews()
    };

    const handleReviewDelete = async (id: string) => {
        await onRequest(ReviewService.deleteReview(id))
        toast.success('Интервью удалено')
        getAllReviews()
    }

    useEffect(() => {
        getAllReviews()
    }, [])

    useEffect(() => {
        if (user?.role && user.role === UserRole.Admin) {
            setCanEdit(true)
            console.log("admin")
        }
    }, [user])

    return (
        <PageContainer title={'Интервью учащихся'}>
            <ReviewList
                reviews={reviews}
                canEditReviews={canEdit}
                handleUpdate={handleReviewUpdate}
                handleDelete={handleReviewDelete}
            />
        </PageContainer >
    );
};


export default InterviewsPage