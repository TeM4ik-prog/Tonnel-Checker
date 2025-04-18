import { Logo } from "./Logo";
import { Sidebar } from "../ui/Sidebar";
import { useUserData } from "@/store/hooks";

export const Header: React.FC = () => {
    const { user } = useUserData();

    return (
        <header className="flex w-full p-2 pb-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 shadow-lg z-40">
            <div className="flex justify-center items-center w-full h-full">
                <Logo className="p-4" />
                

                {/* <h1>{user?.username}</h1> */}

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
