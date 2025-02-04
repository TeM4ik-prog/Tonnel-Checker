import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { CommentService } from "@/services/comment.service";
import { useUserData } from "@/store/hooks";
import { updateData } from "@/store/user/user.slice";
import { IUser, onRequest } from "@/types";
import { RoutesConfig } from "@/types/pagesConfig";
import { removeTokenFromLocalStorage } from "@/utils/localstorage";
import { useState } from "react";
import { FaTelegram, FaGoogle, FaEnvelope } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export const ProfilePage = () => {
    const { user } = useUserData()
    const [review, setReview] = useState("")

    const dispatch = useDispatch()

    const handleLogout = () => {
        removeTokenFromLocalStorage()
        dispatch(updateData())
    };

    if (!user?.id) {
        return (
            <Section>
                <div className="flex flex-col justify-center items-center gap-5">
                    <p className="text-xl text-gray-400">Данные пользователя не найдены!</p>

                    <Button text="Войти или зарегистрироваться" openNewPage={false} href={RoutesConfig.ENTRY.path} />
                </div>
            </Section>

        );
    }

    const { TelegramUser, GoogleUser, EmailUser, role } = user;

    const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReview(e.target.value);
    };


    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement);

        const data = await onRequest(CommentService.postComment(formData))
        if (data) {
            toast.success("Отзыв отправлен")
            setReview("")
        }

    };

    return (
        <div className="flex flex-col gap-3 max-w-4xl mx-auto bg-gray-900 text-white rounded-3xl shadow-xl p-5">

            <div className="flex flex-row justify-between">
                <h3 className="text-xl font-semibold text-gray-200">Информация об аккаунте</h3>
                <Button text="Выйти" FC={handleLogout} color='red' routeKey="HOME" />
            </div>

            <div className="flex items-center space-x-6">
                <div className="flex flex-col">
                    {TelegramUser && (
                        <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center space-x-4">
                            <img
                                src={TelegramUser.photoUrl}
                                alt="Google Profile"
                                className="w-10 h-10 rounded-full object-cover border-2 border-gray-700"
                            />
                            <div>
                                <p className="text-gray-300">{TelegramUser.username}</p>
                                <p className="text-gray-400 text-sm flex items-center">
                                    <FaTelegram className="mr-2 text-red-400" />
                                    {TelegramUser.telegramId}
                                </p>
                            </div>
                        </div>
                    )}
                    {GoogleUser && (
                        <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center space-x-4">
                            <img
                                src={GoogleUser.photoUrl}
                                alt="Google Profile"
                                className="w-10 h-10 rounded-full object-cover border-2 border-gray-700"
                            />
                            <div>
                                <p className="text-gray-300">{GoogleUser.name}</p>
                                <p className="text-gray-400 text-sm flex items-center">
                                    <FaGoogle className="mr-2 text-red-400" />
                                    {GoogleUser.email}
                                </p>
                            </div>
                        </div>
                    )}

                    {EmailUser && (
                        <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center space-x-4">
                            <div>
                                <p className="text-gray-400 text-sm flex items-center">
                                    <FaEnvelope className="mr-2 text-red-400" />
                                    {EmailUser.email}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-4">

                <ul className="space-y-2 text-gray-400">
                    <li>
                        <strong>Участник сайта:</strong> {new Date().toLocaleDateString()}
                    </li>
                    <li>
                        <strong>Статус:</strong> {role === "admin" ? "Admin" : "User"}
                    </li>
                </ul>
            </div>

            <div className="mt-6 space-y-4">
                <h3 className="text-xl font-semibold text-gray-200">Оставьте отзыв</h3>
                <form onSubmit={handleReviewSubmit} className="bg-gray-800 p-3 rounded-lg shadow-md">
                    <textarea
                        name="text"
                        value={review}
                        onChange={handleReviewChange}
                        placeholder="Введите ваш отзыв..."
                        className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
                        rows={4}
                        required
                    />

                    <div className="mb-4">
                        <label htmlFor="video-upload" className="text-white block mb-2">
                            Загрузить фото или видео:
                        </label>
                        <input
                            name="sourceFile"
                            id="media-upload"
                            type="file"
                            accept="image/*,video/*"
                            className="text-sm text-gray-500 border border-gray-300 rounded-lg p-2 w-full"
                        />
                    </div>

                    <div className="mt-4 flex justify-end">
                        <Button formSubmit={true} text="Отправить" />
                    </div>
                </form>
            </div>
        </div>
    );
};
