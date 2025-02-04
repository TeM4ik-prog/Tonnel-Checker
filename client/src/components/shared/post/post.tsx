import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Dialog";
import { PostService } from "@/services/post.service";
import { onRequest } from "@/types";
import { addDays, format } from "date-fns";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import { Input } from "@/components/ui/Input";
import { Block } from "@/components/layout/Block";
import { PencilIcon } from "lucide-react";


export interface PostProps {
    id: string;
    title: string;
    date: string | undefined;
    content: string;
    imageUrl: string;
    categoryId: string;
}

export const Post = ({ id, title, date, content, imageUrl, categoryId }: PostProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => setIsExpanded((prev) => !prev);

    const [updateDataOpen, setUpdateDataOpen] = useState<boolean>(false)
    const handleUpdateDataOpen = () => setUpdateDataOpen((prev) => !prev);

    const MAX_TEXT_LENGTH = 300;
    const formattedDate: string = date ? format(addDays(new Date(date), 1), "dd MMMM yyyy") : '';

    const [formData, setFormData] = useState<IPostUpdate>({
        title: title,
        content: content,
        date: date ? new Date(date) : null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDelete = async () => {
        console.log("delete", id)
        const data = await onRequest(PostService.deletePost(id))
        if (data) {
            toast.success(`Post deleted successfully`)
            window.location.reload()
        }
    }

    const handleEndTimeChange = (date: Date | null) => {

        setFormData((prev) => ({ ...prev, date: date }));
    };

    const handleUpdateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formDataUpdate = new FormData(e.target as HTMLFormElement)

        const formObject = Object.fromEntries(formDataUpdate.entries()); // Преобразуем в объект для удобства работы

        console.log(formObject);

        console.log(formDataUpdate)

        const data = await onRequest(PostService.updatePost(id, formObject));

        // console.log(data)
        // if (data) {
        toast.success(`Post updated successfully`)
        window.location.reload()
        // }

        console.log(data);
    };


    return (
        <Block>

            <div className="relative">


                <img
                    src={imageUrl || "/uploads/default-image.jpg"}
                    alt="Post Image"
                    className="object-contain w-full h-72 md:h-80 lg:h-96"
                />
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent p-4 w-full">
                    <h2 className="text-3xl font-semibold text-white">{title}</h2>
                    <p className="text-sm text-gray-300 mt-1">{formattedDate}</p>
                </div>
            </div>

            <div className="flex flex-col gap-3 px-6 py-4">
                <motion.p className="whitespace-pre-line text-gray-100 overflow-hidden transition-all"
                >
                    {!isExpanded && content.length > MAX_TEXT_LENGTH
                        ? `${content.substring(0, MAX_TEXT_LENGTH).trim()}...`
                        : content}
                </motion.p>

                {content.length > MAX_TEXT_LENGTH && (
                    <button
                        onClick={toggleExpand}
                        className="flex relative left-0 text-blue-400 hover:text-blue-600 transition-colors"
                    >
                        {isExpanded ? "Скрыть" : "Открыть подробнее"}
                    </button>
                )}
            </div>

            {updateDataOpen ? (
                <>
                    <form onSubmit={handleUpdateSubmit} className="flex flex-col gap-1 w-full">
                        <Input
                            name="title"
                            placeholder="Заголовок"
                            value={formData.title}
                            onChange={handleChange}


                        />

                        <DatePicker
                            name="date"
                            showIcon
                            className="w-full text-gray-100 rounded-md bg-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            selected={formattedDate ? formData.date : undefined}
                            onChange={handleEndTimeChange}
                            dateFormat="yyyy/MM/dd"
                        />

                        <textarea
                            name="content"
                            placeholder="Текст"
                            value={formData.content}
                            onChange={handleChange}
                            rows={4}
                            className="w-full max-h-96 p-3 mt-1 text-gray-100 rounded-md bg-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />

                        <Button formSubmit={true} text="Сохранить" />


                    </form>

                    <Modal title="Удаление поста"
                        content="Вы действительно хотите его удалить?"
                        buttonColor="red"
                        buttonCloseText="Удалить"
                        buttonOpenText="Удалить"
                        buttonFC={handleDelete}
                    />
                </>
            ) : <Button text="" icon={<PencilIcon/>} FC={handleUpdateDataOpen} className="absolute top-0 right-0"/>}

        </Block >
    );
};
