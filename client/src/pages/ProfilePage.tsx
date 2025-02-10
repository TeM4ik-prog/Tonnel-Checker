import { Block } from "@/components/layout/Block";
import { PageContainer } from "@/components/layout/PageContainer";
import { IReview } from "@/components/shared/review/review";
import { ReviewList } from "@/components/shared/review/reviewList";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Dialog";
import { FileUploader } from "@/components/ui/FileUploader";
import { Input } from "@/components/ui/Input";
import { Loader } from "@/components/ui/Loader";
import { Section } from "@/components/ui/Section";
import Textarea from "@/components/ui/Textarea";
import { CommentService } from "@/services/comment.service";
import { UserService } from "@/services/user.service";
import { useGetUserRole, useUserData } from "@/store/hooks";
import { updateData } from "@/store/user/user.slice";
import { IUser, onRequest, UserRole } from "@/types";
import { RoutesConfig } from "@/types/pagesConfig";
import { returnObjectFromForm } from "@/utils";
import { removeTokenFromLocalStorage } from "@/utils/localstorage";
import { FolderUpIcon, ImageUp, LogOutIcon, PencilIcon, Upload, XIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaTelegram, FaGoogle, FaEnvelope } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const ProfilePage = () => {
    const dispatch = useDispatch();
    const { user } = useUserData();
    const [review, setReview] = useState("");
    const [myReviews, setMyReviews] = useState<IReview[]>([]);

    const [formSubmitted, setFormSubmitted] = useState(false);
    const toggleFormSubmit = () => setFormSubmitted((prev) => !prev)

    const [updateDataOpen, setUpdateDataOpen] = useState<boolean>(false)
    const handleUpdateDataOpen = () => setUpdateDataOpen((prev) => !prev);

    const [isSourceLoading, setIsSourceLoading] = useState<boolean>(false)

    const userRole = useGetUserRole()

    const [formData, setFormData] = useState({
        newName: '',
    });

    const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogout = () => {
        removeTokenFromLocalStorage();
        dispatch(updateData())
        window.location.reload()
    }

    const handleMyReviews = (async () => {
        const data = await onRequest(CommentService.getMyComments());
        console.log(data);
        if (data) {
            setMyReviews(data);
        }
    });

    const handleUserCommentUpdate = useCallback(async (id: string, e: React.FormEvent) => {
        e.preventDefault();
        const formObject = returnObjectFromForm(e);
        const data = await onRequest(CommentService.updateComment(id, formObject));
        console.log("Ответ от сервера:", data);
        toast.success(`Пост обновлен!`);
        console.log(data);
        handleMyReviews()
    }, []);

    const handleCommentDelete = useCallback(async (id: string) => {
        console.log(id);
        await onRequest(CommentService.deleteMyComment(id));
        toast.success(`Комментарий удален`);
        handleMyReviews()
    }, []);

    useEffect(() => {
        handleMyReviews()
    }, [handleCommentDelete, handleUserCommentUpdate])

    if (!user) {
        return (
            <Section>
                <div className="flex flex-col justify-center items-center gap-5">
                    <p className="text-xl text-gray-400">Данные пользователя не найдены!</p>
                    <Button text="Войти или зарегистрироваться" openNewPage={false} href={RoutesConfig.ENTRY.path} />
                </div>
            </Section>
        )
    }

    const { TelegramUser, GoogleUser, EmailUser, role, name } = user

    const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReview(e.target.value)
    }

    const handleUserReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setIsSourceLoading(true)

        const formData = new FormData(e.target as HTMLFormElement);

        const data = await onRequest(CommentService.postComment(formData))

        if (data) {
            toast.success("Отзыв отправлен")
            setReview('')

            toggleFormSubmit()

            handleMyReviews()
        }

        setIsSourceLoading(false)
    }


    const handleChangeInfo = async (e: React.FormEvent) => {
        e.preventDefault();

        const formDataUpdate = returnObjectFromForm(e)

        const data = await onRequest(UserService.updateInfo(formDataUpdate));

        toast.success(`Информация сохранена`)
        dispatch(updateData())

        console.log(data);
    };




    return (
        <PageContainer title="Профиль">
            <div className="flex w-full flex-col gap-3 mx-auto lg:w-1/2 bg-gray-900 text-white rounded-3xl shadow-xl p-5">

                <div className="flex flex-row justify-between">
                    <h3 className="text-xl font-semibold text-gray-200">Информация об аккаунте</h3>


                    <div className="flex flex-col items-end gap-3">
                        <Modal title="Выход из аккаунта!"
                            content="Вы действительно хотите выйти?"
                            buttonColor="red"
                            buttonCloseText="Выйти"
                            buttonOpenText="Выйти"
                            buttonFC={handleLogout}

                            icon={<LogOutIcon />}
                        />

                        <Button text="" FC={handleUpdateDataOpen} icon={<PencilIcon />} />
                    </div>
                </div>


                {userRole == UserRole.Admin && (
                    <Block className="flex flex-row flex-wrap justify-start p-4">
                        <Button text="Создать пост или интервью" icon={<FolderUpIcon />} href={RoutesConfig.CREATE_POSTS.path} />

                    </Block>
                )}


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
                        <li>
                            <strong>Имя: </strong>{name}
                        </li>

                        {updateDataOpen && (
                            <div>
                                <Block className="p-2">
                                    <form className="flex flex-col gap-3" onSubmit={handleChangeInfo}>
                                        <Input name="newName" placeholder="новое имя" onChange={handleChangeForm} value={formData.newName} />

                                        <Button formSubmit={true} text="Отправить" />
                                    </form>
                                </Block>


                            </div>
                        )}



                    </ul>
                </div>




                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-200">Оставьте отзыв</h3>
                    <form onSubmit={handleUserReviewSubmit} className="flex flex-col gap-3 bg-gray-800 p-3 rounded-lg shadow-md">
                        <Textarea
                            name="text"
                            placeholder="Введите ваш отзыв..."
                            value={review}
                            onChange={handleReviewChange}
                            rows={4}
                            required={true}
                        />

                        <FileUploader
                            formSubmitted={formSubmitted}
                            buttonText="Загрузить фото или видео"
                            icon={<ImageUp />}
                            imageAccept={true}
                            videoAccept={true}
                        />

                        {isSourceLoading && <Loader />}


                        <div className="flex justify-end">
                            <Button disabled={isSourceLoading} formSubmit={true} icon={<Upload />} text="Отправить" />
                        </div>
                    </form>
                </div>
            </div>



            {myReviews.length > 0 && (
                <>
                    <h2 className="text-3xl font-semibold text-gray-200">Мои отзывы</h2>
                    <ReviewList canEditReviews={true} profileElem={true} reviews={myReviews} handleUpdate={handleUserCommentUpdate} handleDelete={handleCommentDelete} />

                </>
            )}

        </PageContainer>

    );
};
