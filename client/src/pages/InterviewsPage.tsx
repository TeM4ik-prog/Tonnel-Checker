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

const MAX_TEXT_LENGTH = 100; // Максимальная длина текста до скрытия

const interviews = [
    {
        id: 1,
        name: "Иван Иванов",
        position: "Ученик 10 класса",
        image: "/ivan.jpg",
        text: "Я учусь в гимназии уже 5 лет. Здесь я нашёл друзей и получил много знаний, которые помогут мне в будущем. Также я участвую в различных мероприятиях и олимпиадах, что даёт мне огромный опыт и мотивацию для дальнейшего развития.",
    },
    {
        id: 2,
        name: "Мария Петрова",
        position: "Ученица 11 класса",
        image: "/maria.jpg",
        text: "Гимназия дала мне не только знания, но и уверенность в себе. Я участвовала в олимпиадах и научных конференциях. Благодаря этому у меня появилось больше возможностей и шансов поступить в хороший университет.",
    },
    {
        id: 3,
        name: "Алексей Сидоров",
        position: "Выпускник",
        image: "/alexey.jpg",
        text: "Благодаря гимназии я поступил в престижный университет. Здесь я научился ставить цели и достигать их. Также я освоил множество полезных навыков, которые помогают мне в учёбе и жизни.",
    },
];


export const InterviewsPage: React.FC = () => {
    const [selectedInterview, setSelectedInterview] = useState<typeof interviews[number] | null>(null);
    const [reviews, setReviews] = useState<IReview[]>([])

    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    const getAllReviews = async () => {
        const data = await onRequest(ReviewService.getReviews())
        if (data) {
            setReviews(data)
        }
    }

    

    useEffect(() => {
        getAllReviews()
    }, [])

    return (
        <>
            <PageContainer title={'Интервью учащихся'}>
                <div className="space-y-4">
                    <ReviewList reviews={reviews}/>
                </div>
            </PageContainer >
        </>
    );
};
