import { Block } from "@/components/layout/Block"
import { Modal } from "@/components/ui/Dialog";
import { ReviewService } from "@/services/review.service";
import { onRequest } from "@/types";

export interface IReview {
    id: string;
    content: string;
    sourceUrl: string;
    type: 'image' | 'video'
    createdAt: string;
}


export const Review = ({ id, content, sourceUrl, createdAt }: IReview) => {

    const isVideo = sourceUrl.endsWith(".mp4") || sourceUrl.endsWith(".webm");

    const handleDelete = async (id: string) => {
        await onRequest(ReviewService.deleteReview(id))
        // setSelectedInterview(null);
        // getAllReviews()
    }


    return (

        <Block className="p-4" >
            <p className="whitespace-pre-line text-white mb-2">{content}</p>




            {isVideo ? (
                <video
                    controls
                    className="w-full max-h-96 mt-2 rounded-lg"
                    src={sourceUrl}
                />
            ) : (
                <img
                    className="w-full max-h-96 mt-2 rounded-lg"
                    src={sourceUrl}
                    alt="Content"
                />
            )}


            <Modal title="Удаление поста"
                content="Выдействительно хотите его удалить?"
                buttonColor="red"
                buttonCloseText="Удалить"
                buttonOpenText="Удалить"
                buttonFC={() => handleDelete(id)} />

        </Block>

    )
}