import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Section } from "@/components/ui/Section";
import { Select } from "@/components/ui/Select";
import { PostService } from "@/services/post.service";
import { useCategories } from "@/store/hooks";
import { onRequest } from "@/types";
import { FormEvent, useCallback, useMemo, useState } from "react";

// import 'react-datepicker/dist/react-datepicker.css';

import DatePicker from 'react-datepicker';
import { toast } from "react-toastify";
import { ReviewService } from "@/services/review.service";
import { PageContainer } from "@/components/layout/PageContainer";
import Textarea from "@/components/ui/Textarea";
import { CloudUpload, ImageUp } from "lucide-react";
import { FileUploader } from "@/components/ui/FileUploader";
import { returnObjectFromForm } from "@/utils";

const CreatePostsPage = () => {
    const { categories, categoriesNames } = useCategories();

    const [formPostSubmitted, setFormPostSubmitted] = useState(false);
    const toggleFormPostSubmit = () => setFormPostSubmitted((prev) => !prev)

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


    const handleEndTimeChange = (date: Date | null) => {
        setFormData((prev) => ({ ...prev, date: date }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formDataSubmit = new FormData(e.target as HTMLFormElement)

        const category = categories.find(c => c.label === formData.categoryName);
        if (!category) {
            toast.error('категория не надена');
            return
        }
        console.log(category.path.replace('/', ' '))

        formDataSubmit.set('category', category.path.replace('/', ''))

        const data = await onRequest(PostService.createPost(formDataSubmit))
        toggleFormPostSubmit()
        toast.success("Пост создан успешно")
    };




    // __________________________

    const [text, setText] = useState("");

    const [formSubmitted, setFormSubmitted] = useState(false);
    const toggleFormSubmit = () => setFormSubmitted((prev) => !prev)

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const handleSubmitReview = async (e: FormEvent) => {
        e.preventDefault()
        const formDataUpdate = new FormData(e.target as HTMLFormElement)
        const data = await ReviewService.postReview(formDataUpdate);
        toggleFormSubmit()
        toast.success("Интерью создано успешно")
    };


    return (

        <PageContainer title="Создание потов и интервью">
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
                        className="w-full z-50 text-gray-100 rounded-md bg-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        selected={formData?.date}
                        onChange={handleEndTimeChange}
                        dateFormat="yyyy/MM/dd"
                        required
                    />

                    <Textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tекст для поста..."
                    />

                    <FileUploader
                        formSubmitted={formPostSubmitted}
                        buttonText="Выберите изображение"
                        icon={<ImageUp />}
                        imageAccept={true}
                        videoAccept={false}
                    />

                    <div className="flex justify-end">
                        <Button text="Создать пост" formSubmit={true} icon={<CloudUpload />} />
                    </div>
                </form>
            </div>


            <form onSubmit={handleSubmitReview} className="flex flex-col bg-gray-700 p-6 rounded-lg min-w-max w-full lg:w-2/5 gap-3 mx-auto h-min">
                <h1 className="text-2xl text-center font-bold mb-6 text-white">Создать интервью</h1>
                <Textarea
                    name="text"
                    value={text}
                    onChange={handleTextChange}
                    rows={4}
                    placeholder="Tекст для видео..."
                />

                <FileUploader
                    formSubmitted={formSubmitted}
                    buttonText="Выберите Видео"
                    icon={<ImageUp />}
                    imageAccept={false}
                    videoAccept={true}
                />

                <div className="flex justify-end">
                    <Button text="Создать интервью" formSubmit={true} icon={<CloudUpload />} />
                </div>
            </form>
        </PageContainer>
    );
};

export default CreatePostsPage
