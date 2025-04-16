import { TelegramBot } from "@/types";
import TelegramLoginButton from "../shared/tgButton";
import { Logo } from "./Logo";
import { ITelegramAuth } from "@/types/auth";
import { toast } from "react-toastify";
import { handleError } from "@/utils/handleError";
import { AuthService } from "@/services/auth.service";
import { Sidebar } from "../ui/Sidebar";

export const Header: React.FC = () => {


    const EntryByTelegram = async (user: any) => {
        console.log(user)
        console.log(JSON.stringify(user))


        const userStr = JSON.stringify({
            id: user.id,
            first_name: user.first_name,
            last_name: "",  // Можно добавить, если нужно
            username: user.username,
            language_code: "ru",  // Здесь нужно указать нужный язык
            is_premium: true,  // В данном примере премиум-аккаунт
            allows_write_to_pm: true,  // Включаем возможность писать в личку
            photo_url: user.photo_url
        });

        // Кодируем строку для URL
        const encodedUserStr = encodeURIComponent(userStr);

        // Создаем конечный authData
        const authData = `user=${encodedUserStr}&chat_instance=4045762488177193934&chat_type=sender&auth_date=${user.auth_date}&signature=XnBBBeuLGESyyxyvp8TxykWBy6PUEWnv-yhEiQiQHIwkQqiOql2B6bm_LvRKKSs2fRL7qSiCYkcxrat0XF8mBg&hash=${user.hash}`;

        console.log(authData);



        try {
            // const data = await AuthService.Telegram.login(user)
            // console.log(data)

            // console.log(JSON.stringify(data))
            // // handleEntryData(data)
        } catch (err) {
            toast.error(handleError(err))
        }

    }

    return (
        <header className="flex w-full p-2 pb-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 shadow-lg z-40">
            <div className="flex justify-center items-center w-full h-full">

                <Logo className="p-6" />




                <Sidebar />

                {/* <TelegramLoginButton
                    botName={TelegramBot}
                    buttonSize="large"
                    cornerRadius={3}
                    usePic={false}
                    dataOnauth={EntryByTelegram}
                    className="telegram-login-container"
                /> */}

                {/* <div className="flex flex-row items-center h-auto gap-2 justify-end relative w-screen">
                    <div className="sm:flex flex-row flex-wrap relative justify-center gap-x-6 mx-3 box-border scrollbar-hide hidden">
                        {navLinks}
                    </div>
                    <div className="flex flex-col gap-2 ml-auto justify-between self-center items-end h-full">
                        {!user ? (
                            <Button text="Войти" icon={<LogInIcon />} routeKey="ENTRY" />
                        ) : (
                            <Button text="Профиль" icon={<UserCog2 />} routeKey="PROFILE" />
                        )}
                        <Sidebar />
                    </div>
                </div> */}
            </div>
        </header>
    );
};
