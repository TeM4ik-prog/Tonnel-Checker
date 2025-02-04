import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Section } from "@/components/ui/Section";
import { Select } from "@/components/ui/Select";
import { PostService } from "@/services/post.service";
import { useCategories } from "@/store/hooks";
import { onRequest } from "@/types";
import { useState } from "react";

import 'react-datepicker/dist/react-datepicker.css';

import DatePicker from 'react-datepicker';
import { toast } from "react-toastify";
import { ReviewService } from "@/services/review.service";

export const CreatePostsPage = () => {
    const { categories, categoriesNames } = useCategories();

    const [formData, setFormData] = useState<IPost>({
        categoryName: '',
        title: '',
        content: '',
        date: new Date(Date.now()),
        image: null
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prev) => ({ ...prev, categoryName: e.target.value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData((prev) => ({ ...prev, image: file }));
    };



    const handleEndTimeChange = (date: Date | null) => {
        setFormData((prev) => ({ ...prev, date: date }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formDataSubmit = new FormData(e.target as HTMLFormElement)

        const category = categories.find(c => c.label === formData.categoryName);
        if (!category) {
            toast.error('категория не надена');
            return
        }
        console.log(category.path.replace('/', ' '))

        formDataSubmit.set('category', category.path.replace('/', ''))


        const data = await onRequest(PostService.createPost(formDataSubmit));
        console.log(data);
    };


    // __________________________


    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [text, setText] = useState("");

    // Обработчик загрузки файла
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setVideoFile(file);
        }
    };

    // Обработчик изменения текста
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const handleSubmitReview = async () => {
        if (videoFile && text) {
            console.log("Видео и текст отправлены");
    
            try {
                const formData = new FormData();
                formData.append("videoFile", videoFile);
                formData.append("text", text);
    
                const data = await ReviewService.postReview(formData);  
    
                console.log("Ответ от сервера:", data);
            } catch (error) {
                console.error("Ошибка при отправке:", error);
            }
        } else {
            alert("Пожалуйста, загрузите видео и напишите текст.");
        }
    };
    

    return (
        <div className="flex flex-col gap-3">
            <div className="bg-gray-700 p-6 rounded-lg min-w-max w-full lg:w-2/5 mx-auto h-min">
                <h1 className="text-2xl text-center font-bold mb-6 text-white">Создать пост</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <Select
                        placeholder="Выберите категорию"
                        name="category"
                        value={formData.categoryName}
                        onChange={handleCategoryChange}
                        options={categoriesNames}
                    />


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
                        selected={formData?.date}
                        onChange={handleEndTimeChange}
                        dateFormat="yyyy/MM/dd"
                        required
                    />



                    <textarea
                        name="content"
                        placeholder="Текст"
                        value={formData.content}
                        onChange={handleChange}
                        rows={4}
                        className="w-full max-h-96 p-3 mt-1 text-gray-100 rounded-md bg-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />




                    <label className="w-full cursor-pointer">
                        <span className="bg-blue-500 text-white px-4 py-2 rounded-md w-full text-center block hover:bg-blue-600">
                            Выберите изображение
                        </span>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            required
                        />
                    </label>

                    {formData.image && <p>Изображение выбрано: {formData.image.name}</p>}




                    <div className="flex">
                        <Button text="Создать" formSubmit={true} />
                    </div>
                </form>
            </div>


            <div className="bg-gray-700 p-6 rounded-lg min-w-max w-full lg:w-2/5 mx-auto h-min">
                <h1 className="text-2xl text-center font-bold mb-6 text-white">Создать интервью</h1>

                <div className="mb-4">
                    <label htmlFor="video-upload" className="text-white block mb-2">
                        Загрузить видео:
                    </label>
                    <input
                        id="video-upload"
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                        className="text-sm text-gray-500 border border-gray-300 rounded-lg p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="video-text" className="text-white block mb-2">
                        Текст к видео:
                    </label>
                    <textarea
                        id="video-text"
                        value={text}
                        onChange={handleTextChange}
                        rows={4}
                        placeholder="Напишите текст для видео..."
                        className="text-sm text-gray-500 border border-gray-300 rounded-lg p-2 w-full"
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={handleSubmitReview}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Создать интервью
                    </button>
                </div>
            </div>
        </div>
    );
};
