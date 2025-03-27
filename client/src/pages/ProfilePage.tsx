import { Block } from "@/components/layout/Block";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Section } from "@/components/ui/Section";
import { UserService } from "@/services/user.service";
import { useGetUserRole, useUserData } from "@/store/hooks";
import { updateData } from "@/store/user/user.slice";
import { UserRole } from "@/types";
import { RoutesConfig } from "@/types/pagesConfig";
import { returnObjectFromForm } from "@/utils";
import { removeTokenFromLocalStorage } from "@/utils/localstorage";
import { FolderUpIcon, LogOutIcon, PencilIcon } from "lucide-react";
import { useState } from "react";
import { FaEnvelope, FaGoogle, FaTelegram } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { user } = useUserData();
    const [updateDataOpen, setUpdateDataOpen] = useState<boolean>(false);
    const userRole = useGetUserRole();
    const [formData, setFormData] = useState({
        newName: '',
    });

    const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogout = () => {
        removeTokenFromLocalStorage();
        dispatch(updateData());
        window.location.reload();
    };

    const handleChangeInfo = async (e: React.FormEvent) => {
        e.preventDefault();
        const formDataUpdate = returnObjectFromForm(e);
        const data = await UserService.updateInfo(formDataUpdate);
        toast.success(`Информация сохранена`);
        dispatch(updateData());
        setUpdateDataOpen(false);
    };

    if (!user) {
        return (
            <Section>
                <div className="flex flex-col justify-center items-center gap-5">
                    <p className="text-xl text-gray-400">Данные пользователя не найдены!</p>
                    <Button text="Войти или зарегистрироваться" openNewPage={false} href={RoutesConfig.ENTRY.path} />
                </div>
            </Section>
        );
    }

    const { TelegramUser, GoogleUser, EmailUser, role, name } = user;

    return (
        <PageContainer title="">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-2xl backdrop-blur-sm border border-gray-700 mx-auto">
                <div className="w-full flex flex-col items-center mb-6 sm:mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                        Профиль пользователя
                    </h2>
                </div>

                <div className="space-y-4 sm:space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-200">Информация об аккаунте</h3>
                        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                            <Modal 
                                title="Выход из аккаунта!"
                                content="Вы действительно хотите выйти?"
                                buttonColor="red"
                                buttonCloseText="Выйти"
                                buttonOpenText="Выйти"
                                buttonFC={handleLogout}
                                icon={<LogOutIcon />}
                            />
                            <Button 
                                text="" 
                                FC={() => setUpdateDataOpen(!updateDataOpen)} 
                                icon={<PencilIcon />}
                                className="hover:bg-gray-700/50 transition-colors duration-200"
                            />
                        </div>
                    </div>

                    {userRole === UserRole.Admin && (
                        <Block className="flex flex-row flex-wrap justify-start p-3 sm:p-4 bg-gray-800/50 rounded-xl">
                            <Button 
                                text="Создать пост или интервью" 
                                icon={<FolderUpIcon />} 
                                href={RoutesConfig.CREATE_POSTS.path}
                                className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                            />
                        </Block>
                    )}

                    <div className="space-y-3 sm:space-y-4">
                        {TelegramUser && (
                            <div className="bg-gray-800/50 p-3 sm:p-4 rounded-xl shadow-md flex items-center space-x-3 sm:space-x-4 hover:bg-gray-800/70 transition-colors duration-200">
                                <img
                                    src={TelegramUser.photoUrl}
                                    alt="Telegram Profile"
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-700"
                                />
                                <div>
                                    <p className="text-gray-200 font-medium text-sm sm:text-base">{TelegramUser.username}</p>
                                    <p className="text-gray-400 text-xs sm:text-sm flex items-center">
                                        <FaTelegram className="mr-2 text-blue-400" />
                                        {TelegramUser.telegramId}
                                    </p>
                                </div>
                            </div>
                        )}

                        {GoogleUser && (
                            <div className="bg-gray-800/50 p-3 sm:p-4 rounded-xl shadow-md flex items-center space-x-3 sm:space-x-4 hover:bg-gray-800/70 transition-colors duration-200">
                                <img
                                    src={GoogleUser.photoUrl}
                                    alt="Google Profile"
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-700"
                                />
                                <div>
                                    <p className="text-gray-200 font-medium text-sm sm:text-base">{GoogleUser.name}</p>
                                    <p className="text-gray-400 text-xs sm:text-sm flex items-center">
                                        <FaGoogle className="mr-2 text-red-400" />
                                        {GoogleUser.email}
                                    </p>
                                </div>
                            </div>
                        )}

                        {EmailUser && (
                            <div className="bg-gray-800/50 p-3 sm:p-4 rounded-xl shadow-md flex items-center space-x-3 sm:space-x-4 hover:bg-gray-800/70 transition-colors duration-200">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-700 flex items-center justify-center">
                                    <FaEnvelope className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-gray-200 font-medium text-sm sm:text-base">Email аккаунт</p>
                                    <p className="text-gray-400 text-xs sm:text-sm flex items-center">
                                        <FaEnvelope className="mr-2 text-blue-400" />
                                        {EmailUser.email}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-gray-800/50 p-3 sm:p-4 rounded-xl space-y-2 sm:space-y-3">
                        <p className="text-gray-300 text-sm sm:text-base">
                            <span className="text-gray-400">Участник сайта:</span> {new Date().toLocaleDateString()}
                        </p>
                        <p className="text-gray-300 text-sm sm:text-base">
                            <span className="text-gray-400">Статус:</span> {role === "admin" ? "Admin" : "User"}
                        </p>
                        <p className="text-gray-300 text-sm sm:text-base">
                            <span className="text-gray-400">Имя:</span> {name}
                        </p>
                    </div>

                    {updateDataOpen && (
                        <div className="bg-gray-800/50 p-3 sm:p-4 rounded-xl">
                            <form className="flex flex-col gap-2 sm:gap-3" onSubmit={handleChangeInfo}>
                                <Input 
                                    name="newName" 
                                    placeholder="Новое имя" 
                                    onChange={handleChangeForm} 
                                    value={formData.newName}
                                    className="bg-gray-700 border-gray-600 focus:border-cyan-500 focus:ring-cyan-500 text-white placeholder-gray-400 text-sm sm:text-base"
                                />
                                <Button 
                                    formSubmit={true} 
                                    text="Сохранить"
                                    className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                                />
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </PageContainer>
    );
};

export default ProfilePage;
