import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Dialog";
import { PostService } from "@/services/post.service";
import { onRequest } from "@/types";
import { format } from "date-fns";
import { NavLink } from "react-router-dom";

export interface PostProps {
    id: string;
    title: string;
    date: string;
    content: string;
    imageUrl: string;
    categoryId: string;
}

export const Post = ({ id, title, date, content, imageUrl, categoryId }: PostProps) => {
    // Форматируем дату
    const formattedDate = format(new Date(date), "dd MMMM yyyy");

    const handleDelete = async () => {

        console.log("delete", id)

        const data = await onRequest(PostService.deletePost(id))
        console.log(data);


    }


    return (
        <div className="bg-gray-700 shadow-lg rounded-lg overflow-hidden w-full md:w-2/3 lg:w-1/2 mx-auto mb-8">
            {/* Блок с изображением */}
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

            {/* Контент поста */}
            <div className="px-6 py-4">
                <p className="text-gray-100 mb-4">{content}</p>

                <NavLink
                    to={`/category/${categoryId}`}
                    className="inline-block text-blue-400 hover:text-blue-600 mt-4"
                >
                    Перейти к категории
                </NavLink>

    
            </div>


            <Modal title="Удаление поста"
                content="Выдействительно хотите его удалить?"
                buttonColor="red"
                buttonText="Удалить"
                buttonFC={handleDelete} />

        </div>
    );
};
