import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Dialog";
import ContentBlock from "@/components/ui/ContentBlock";

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

    const openInterview = (interview: typeof interviews[number]) => {
        setSelectedInterview(interview);
    };

    const closeInterview = () => {
        setSelectedInterview(null);
    };

    return (
        <>
            <video width="100%" controls>
                <source src="http://localhost:3000/api/review/video_2025-02-03_21-08-05.mp4" type="video/mp4" />
                Ваш браузер не поддерживает видео.
            </video>



            {/* <ContentBlock>
                <motion.section
                    className="container mx-auto text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="text-4xl font-bold text-green-400 mb-8">Интервью учащихся</h1>
                    <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto sm:px-6 lg:px-8">
                        {interviews.map((interview) => (
                            <motion.div
                                key={interview.id}
                                className="flex flex-col gap-3 p-6 bg-gray-700 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                                onClick={() => openInterview(interview)}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h3 className="text-xl font-semibold">{interview.name}</h3>
                                <p className="text-gray-300">{interview.position}</p>
                                <p className="text-lg">
                                    {interview.text.length > MAX_TEXT_LENGTH
                                        ? `${interview.text.substring(0, MAX_TEXT_LENGTH)}...`
                                        : interview.text}
                                </p>

                                <Modal
                                    title={interview.name}
                                    content={interview.text}
                                    buttonCloseText="Хорошо"
                                    buttonOpenText="Подробнее"
                                    buttonColor="blue"
                                    buttonFC={closeInterview}
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.section>
            </ContentBlock> */}

        </>
    );
};
