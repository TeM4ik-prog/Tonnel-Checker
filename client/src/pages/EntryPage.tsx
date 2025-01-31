import { RegistrationGoogleButton } from "@/components/shared/authButtons/googleButton/googleButton";
import TelegramLoginButton from "@/components/shared/authButtons/tgButton/tgButton";
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input";
import { Section } from "@/components/ui/Section";
import { AuthService } from "@/services/auth.service";
import { login, updateData } from "@/store/user/user.slice";
import { TelegramBot } from "@/types";
import { IGoogleAuth, ITelegramAuth } from "@/types/auth";
import { handleError } from "@/utils/handleError";
import { setTokenToLocalStorage } from "@/utils/localstorage";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const EntryPage = () => {
    const [isRegisterMode, setIsRegisterMode] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const toggleState = () => {
        setIsRegisterMode(!isRegisterMode);
    };


    const handleEntryData = (responseData: any) => {
        console.log(responseData)

        try {
            if (responseData) {
                dispatch(login(responseData))
                setTokenToLocalStorage(responseData.token)

                dispatch(updateData())
                toast.success('You are logged in')
                navigate('/')
            }
        } catch (err) {
            toast.error(handleError(err));
        }
    }




    const EntryByTelegram = async (user: ITelegramAuth) => {
        console.log(user)


        try {
            const data = await AuthService.Telegram.login(user)
            console.log(data)
            handleEntryData(data)
        } catch (err) {
            toast.error(handleError(err))
        }

    }

    const EntryByGoogle = async (user: IGoogleAuth) => {

        console.log(user)

        try {
            const data = await AuthService.Google.login(user)
            console.log(data)
            handleEntryData(data)
        } catch (err) {
            toast.error(handleError(err))
        }


    }


    return (

        <Section>


            <div className="bg-gray-700 p-5 rounded-lg min-w-max w-10/12 lg:w-2/5">

                <div className="w-full flex flex-row justify-start gap-3">
                    <img src="icons/telegram.svg" />
                    <img src="icons/google.svg" />

                    <h2 className="text-2xl text-center font-bold text-cyan-200">Авторизация</h2>


                </div>

                {/* {!isRegisterMode ? 'Вход' : 'Регистрация'} */}

                {/* <form className="space-y-4">
        //             <Input
        //                 name="username"
        //                 placeholder="Имя пользователя"
        //                 value={formData.username}
        //                 onChange={handleChange}
        //                 error={errors.username}
        //             />
        //             <Input
        //                 name="email"
        //                 type="email"
        //                 placeholder="Ваш email"
        //                 value={formData.email}
        //                 onChange={handleChange}
        //                 error={errors.email}
        //             />
        //             <Input
        //                 name="password"
        //                 type="password"
        //                 placeholder="Пароль"
        //                 value={formData.password}
        //                 onChange={handleChange}
        //                 error={errors.password}
        //             />

        //             <div className="flex justify-center" >
        //                 <Button text="Зарегистрироваться" />
        //             </div>
                 </form> */}

                <div className="flex flex-col gap-5 mt-5">
                    {/* <div className="flex items-center justify-center">
        //                 <div className="flex-grow h-px bg-white opacity-50"></div>
        //                 <span className=" relative px-2 text-white font-semibold tracking-wide uppercase text-xs cursor-pointer group">
        //                     Другие способы входа
        //                 </span>
        //                 <div className="flex-grow h-px bg-white opacity-50"></div>



                     </div> */}

                    <div className="flex flex-col gap-4">
                        <TelegramLoginButton
                            botName={TelegramBot}
                            buttonSize="large"
                            cornerRadius={3}
                            usePic={false}
                            dataOnauth={EntryByTelegram}
                            className="telegram-login-container"
                        />

                        <RegistrationGoogleButton authHandler={EntryByGoogle} />
                    </div>


                </div>

                {/* <div className="flex mt-6 items-center gap-2 justify-center flex-row text-center text-gray-300">
                     <span>Уже есть аккаунт? </span>
                     <p className="underline cursor-pointer" onClick={toggleState}>
                         {isRegisterMode ? 'Войти' : 'Зарегистрироваться'}
                     </p>
                 </div> */}
            </div>

        </Section >
    )

}