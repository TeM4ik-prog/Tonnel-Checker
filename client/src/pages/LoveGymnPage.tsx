import { useEffect, useState } from "react";
import { onRequest, UserRole } from "@/types";
import { PageContainer } from "@/components/layout/PageContainer";
import { ReviewList } from "@/components/shared/review/reviewList";
import { CommentService } from "@/services/comment.service";
import { IReview } from "@/components/shared/review/review";
import { returnObjectFromForm } from "@/utils";
import { ReviewService } from "@/services/review.service";
import { toast } from "react-toastify";
import { useUserData } from "@/store/hooks";

const LoveGymnPage: React.FC = () => {
    const [comments, setComments] = useState<IReview[]>([])
    const [canEdit, setCanEdit] = useState<boolean>(false)


    const { user } = useUserData()

    const getAllComments = async () => {
        const data: IReview[] = await onRequest(CommentService.getComments())
        if (data) {
            setComments(data)
        }
    }

    const handleCommentUpdate = async (id: string, e: React.FormEvent) => {
        e.preventDefault()

        const formObject = returnObjectFromForm(e)
        const data = await onRequest(CommentService.updateComment(id, formObject))

        toast.success('Комментарий изменен')
        getAllComments()
    };

    const handleCommentDelete = async (id: string) => {
        await onRequest(CommentService.deleteComment(id))
        getAllComments()
        toast.success('Комментарий удален')
    }

    useEffect(() => {
        getAllComments()
    }, [])


    useEffect(() => {
        if (user?.role && user.role === UserRole.Admin) {
            setCanEdit(true)
            console.log("admin")
        }
    }, [user])

    return (
        <>
            <PageContainer title="Люблю свою гимназию">
                <ReviewList
                    canEditReviews={canEdit}
                    reviews={comments}
                    handleUpdate={handleCommentUpdate}
                    handleDelete={handleCommentDelete} />
            </PageContainer>
        </>
    );
};


export default LoveGymnPage

