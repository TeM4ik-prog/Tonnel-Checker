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

export const CreatePostsPage = () => {
    const { categories, categoriesNames } = useCategories();

    const [formData, setFormData] = useState<IPost>({
        categoryId: '',
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
        setFormData((prev) => ({ ...prev, categoryId: e.target.value }));
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
    
        const formData = new FormData(e.target as HTMLFormElement); // Передаем элемент формы
    
        if (formData.get('image')) {
            console.log('Image selected:', formData.get('image'));
        }
    
        const data = await onRequest(PostService.createPost(formData));
        console.log(data);
    };

    return (
        <Section>
            <div className="bg-gray-700 p-6 rounded-lg min-w-max w-full lg:w-2/5 mx-auto h-min">
                <h1 className="text-2xl text-center font-bold mb-6 text-white">Создать пост</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <Select
                        placeholder="Выберите категорию"
                        name="category"
                        value={formData.categoryId}
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
        </Section>
    );
};
